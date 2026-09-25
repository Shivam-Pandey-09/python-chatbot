
import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

response = client.chat.completions.create(
    model="gemini-3.6-flash",
    messages=[
        {
            "role": "system",
            "content": "You are a concise programming assistant."
        },
        {
            "role": "user",
            "content": "Explain what an API is in exactly two sentences."
        }
    ]
)

print("\n--- AI Response ---")
print(response.choices[0].message.content)
print("-------------------\n")