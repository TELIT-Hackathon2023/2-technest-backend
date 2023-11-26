from langchain.embeddings import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.text_splitter import MarkdownHeaderTextSplitter
from langchain.vectorstores import Chroma
from langchain.chains import ConversationalRetrievalChain

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


class ChatbotService:
    def init(self):
        texts = split_markdown(read_file("./data/combined.md"))
        embeddings = OpenAIEmbeddings()
        db = Chroma.from_documents(texts, embeddings)
        retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 4})
        self.qa = ConversationalRetrievalChain.from_llm(OpenAI(), retriever)
        self.history = []

    def get_answer(self, prompt: str):
        result = self.qa({"question": prompt, "chat_history": self.history})
        if result is None:
            return None
        self.history.append((prompt, result['answer']))
        return result['answer']