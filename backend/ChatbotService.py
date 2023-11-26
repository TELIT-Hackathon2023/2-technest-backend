import os

from langchain.embeddings import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.text_splitter import MarkdownHeaderTextSplitter
from langchain.vectorstores import Chroma
from langchain.chains import ConversationalRetrievalChain
import git
import file_combiner
from project_constants import *
from io import BytesIO
import requests
from zipfile import ZipFile
import shutil
from dotenv import load_dotenv


headers_to_split_on = [
    ("#", "Header 1"),
    ("##", "Header 2"),
    ("###", "Header 3"),
]


def read_file(filepath: str):
    file = open(filepath)
    content = file.read()
    file.close()
    return content


def split_markdown(data: str):
    text_splitter = MarkdownHeaderTextSplitter(headers_to_split_on)
    return text_splitter.split_text(data)

def download_and_extract_repo(username, repository, branch):
    url = f'https://github.com/{username}/{repository}/archive/{branch}.zip'
    response = requests.get(url)

    if response.status_code == 200:
        output_folder = f'./cloned/'
        zip_path = f"{output_folder}{repository}-{branch}.zip"

        with open(zip_path, 'wb') as f:
            f.write(response.content)

        if os.path.exists(f"{output_folder}{repository}-{branch}"):
            # TODO
            os.chmod(f"{output_folder}{repository}-{branch}", 0o777)
            print("I removed :" + f"{output_folder}{repository}-{branch}")

            shutil.rmtree(f"{output_folder}{repository}-{branch}")

        with ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall("./cloned/")

        os.remove(zip_path)
        print(f'Repo downloaded into {f"{output_folder }{repository}-{branch}"}')

    else:
        print(f"Error {response.status_code}: {response.text}")


class ChatbotService:
    def __init__(self):
        self.history = None
        self.qa = None
        self.refresh_model()

    def get_answer(self, prompt: str):
        result = self.qa({"question": prompt, "chat_history": self.history})
        if result is None:
            return None
        self.history.append((prompt, result['answer']))
        return result['answer']
    def refresh_model(self):
        download_and_extract_repo(username, repository, branch)
        file_combiner.process_md(f'{repository}_{branch}')
        texts = split_markdown(read_file("./data/combined.md"))
        embeddings = OpenAIEmbeddings()
        db = Chroma.from_documents(texts, embeddings)
        retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 4})
        self.qa = ConversationalRetrievalChain.from_llm(OpenAI(), retriever)
        self.history = []
