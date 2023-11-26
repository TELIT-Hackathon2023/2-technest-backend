from embedchain import Pipeline as App


class ChatbotService:
    def __init__(self):
        self.app = App()
        self.app.add("./data/combined.md", data_type='mdx')

    def getAnswer(self, prompt: str):
        return self.app.query(prompt)
