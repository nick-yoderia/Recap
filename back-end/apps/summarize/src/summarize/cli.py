from openai import OpenAI

class Summarize():
    def __init__(self):
        self.client = OpenAI()
        self.model="gpt-6-luna"
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

    
fake_meeting = """
Alright, lets go ahead and get started. Thanks for jumping on, everyone. On the agenda today: we’re checking in on the V2 launch timeline, reviewing the feedback from the beta user cohort, and addressing the latency spikes we noticed on the dashboard endpoints earlier this week.

Before we jump into the numbers, do you want to give a quick operational update on the backend work?

Yeah, sounds good. So on the backend side, we completed the migration to the new schema last Thursday. Everything passed staging, but when we routed 15% of live production traffic over, we saw a memory leak in the worker pool handling real-time event aggregation. That’s what caused the latency response time to jump from 120 milliseconds up to nearly 1.8 seconds.

Is that blocking the public release scheduled for next Tuesday?

Its a blocker for a 100% rollout, yes. But we isolated the issue to an unindexed query in the event log table. We deployed a fix to the dev environment this morning. If load testing passes this afternoon, we’ll re-stage it tonight and monitor it through tomorrow.

Quick question on that—does that fix impact the auto-refresh behavior on the main analytics view? Because from a UX perspective, users are reporting that the dashboard flickering during updates is really jarring.

I actually pulled together two alternative designs for that state. In Option A, we hold the stale data with a subtle background spinner in the top right. In Option B, we skeleton-load the component cards. I posted the Figma links in the project channel earlier.

Thanks for setting those up. What does the user telemetry look like from the beta group regarding that dashboard flow? Are people bouncing, or is it just minor friction?

Looking at the last seven days, retention for the beta cohort is actually up 12% compared to the legacy version. However, session drop-off spikes right at the second step of the onboarding funnel. Around 22% of users drop off when asked to configure custom webhooks.

Thats significant. Is the setup too complex, or are they missing context on why they need to configure them right away?

Its likely friction around value delivery. They haven't seen what the platform can do yet before we ask them to do technical setup.

We could make the webhook setup optional during initial onboarding and prompt them later via an in-app banner once they hit their first event trigger threshold.

I like that approach. Let's decouple that requirement from the primary sign-up flow. From an implementation standpoint, how much effort is it to make that step skippable in the current sprint?

Its straightforward. The database schema already accepts null values for webhook endpoints. We’d just need to adjust the front-end route guard and default the dashboard state to show sample data until a live feed is connected. Call it half a day of work.

Great. Let's make that change.
"""

def main():
    summary = Summarize()
    print(summary.generate(fake_meeting))