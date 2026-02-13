Live Mood Architect is a full-stack AI-powered web application that generates short, empathetic affirmations based on a user's name and emotional state.
The application uses a React frontend and a FastAPI backend integrated with OpenAI to produce supportive, safe, and non-diagnostic responses.

	Live URLs
Frontend (Vercel):
https://live-mood-architect-zeta.vercel.app

Backend (Render):
https://mood-architect-backend-ear7.onrender.com

Swagger Docs:
https://mood-architect-backend-ear7.onrender.com/docs

	Architecture
Frontend: React (Vite)

Backend: FastAPI (Python)

AI Integration: OpenAI API

Deployment:
Frontend hosted on Vercel
Backend hosted on Render
Separate deployments (decoupled architecture)

	Safety & Prompt Design
The system prompt enforces:
No medical or legal advice,
No diagnosis of mental health conditions,
No self-harm guidance,
Encourages seeking professional help when high-risk intent is detected,
Responses limited to 2–4 sentences, warm and specific,
This ensures safe, supportive AI responses aligned with ethical guidelines.

	 How to Run Locally
 Backend Setup
 
	cd backend
	python -m venv venv
	source venv/bin/activate  # Mac/Linux

	pip install -r requirements.txt
	
Create a .env file in the backend folder:

	OPENAI_API_KEY=your_openai_api_key_here
	
Start server:

	uvicorn main:app --reload

Backend will run at:

	http://127.0.0.1:8000
	
Frontend Setup

	cd frontend
	npm install
	npm run dev
	
Frontend will run at:

	http://localhost:5173

Deployment

Backend (Render)

Create Web Service

Set Root Directory to backend

Add Environment Variable:

	OPENAI_API_KEY=your_key_here
	
Start command:

	uvicorn main:app --host 0.0.0.0 --port 10000
	
Frontend (Vercel)

Import GitHub repo

Deploy frontend folder

Connect frontend to deployed backend URL

Redeploy

 	Required Environment Variables
	
Backend:

	OPENAI_API_KEY
	(No secrets are stored in the frontend or repository.)
