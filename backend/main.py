import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise RuntimeError("OPENAI_API_KEY not set")

client = OpenAI(api_key=api_key)

app = FastAPI ()

# Temporary CORS (we will restrict after deployment)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AffirmationRequest(BaseModel):
    name: str
    feeling: str


@app.post("/api/affirmation")
async def generate_affirmation(data: AffirmationRequest):
    if not data.name.strip() or not data.feeling.strip():
        raise HTTPException(status_code=400, detail="Name and feeling cannot be empty.")

    system_prompt = """
You are a supportive affirmation assistant.
Rules:
- No medical or legal advice.
- No diagnosis of conditions.
- No self-harm guidance.
- If user expresses self-harm intent, respond with a supportive message encouraging professional help.
- Keep responses short (2-4 sentences), warm, and specific.
"""

    user_prompt = f"""
User name: {data.name}
User feeling: {data.feeling}

Generate a short, empathetic affirmation.
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            max_tokens=120,
        )

        affirmation = response.choices[0].message.content.strip()

        return {"affirmation": affirmation}

    except Exception as e:
        print("OPENAI ERROR:", str(e))
        raise HTTPException(
            status_code=502,
            detail=str(e)
        )
