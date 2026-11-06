from openai import OpenAI

class Summarize():
    def __init__(self):
        self.client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
        self.model="llama3.2:3b"
        self.system_prompt = """
            You are a meeting summary assistant for Recap (software application). 
            Your job is to take the transcript provided to you and create a concise meeting summary of the contents.
            
            The meeting may have multiple speakers.

            Meetings can be about many things but generally ones that we may encounter are:
                - Team meetings (medium-sized with potential for focused or broad)
                - All-hands meetings (large and broad)
                - One-on-one meetings (small and focused)

            It may or may not be important for you to infer the type of meeting from the content
            and the number of speakers to provide the most accurate summary.

            An example of a good summary should include (but is not limited to):
                - An executive summary
                - Status updates
                - Goals or deadlines

            All of these are not required, all meetings will be different and you should adapt to the content.

            Avoid:
                Injecting your own opinions
                Adding content to meeting topics
                Using em-dashes in your summary
            """

    def generate(self, transcript):
        response = self.client.responses.create(
            model=self.model,
            instructions=self.system_prompt,
            input=transcript
        )
        return response.output_text

def run(meeting: str):
    summary = Summarize()
    return summary.generate(meeting)