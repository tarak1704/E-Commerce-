📊 Overview
This project aims to build an AI-powered question-answering agent that interfaces with structured e-commerce datasets. The agent uses a locally hosted or free-access LLM to understand user queries, translate them into SQL, fetch data from a relational database, and respond in a clear, human-readable format. Optionally, it also supports chart generation and streamed (real-time-like) responses for enhanced interactivity.
📁 Project Structure
pgsql
Copy
Edit
ecommerce-ai-agent/
├── app/                         # Backend application logic (Flask-based)
│   ├── __init__.py              # Flask app initialization
│   ├── routes.py                # API route handlers (chat, SQL query)
│   ├── llm.py                   # LLM integration (e.g., OpenRouter, local LLMs)
│   ├── db.py                    # Database connection and CSV-to-SQL conversion
│   ├── utils.py                 # Helper functions: SQL prompt generation, summaries, charts
│   └── templates/
│       └── index.html           # Optional frontend (HTML + JS + Plotly)
│
├── data/                        # Raw data inputs
│   ├── eligibility.csv          # Product eligibility info
│   ├── ad_sales.csv             # Advertisement performance data
│   └── total_sales.csv          # Product sales data
│
├── ecommerce.db                 # Compiled SQLite database from CSVs
├── .env                         # Environment variables (e.g., API keys)
├── requirements.txt             # Python dependencies
└── README.md                    # Project documentation (you're here!)
1️⃣ Data Preparation
Convert the three provided datasets into SQL tables:

eligibility_table

ad_sales_metrics

total_sales_metrics

Store them in a lightweight database (e.g., SQLite or PostgreSQL).

2️⃣ LLM Integration
Choose a local or open-source LLM (e.g., OpenHermes, Mistral, or Gemini 2.5 via API).

Use the LLM to convert natural language questions into valid SQL queries.

3️⃣ Backend API Setup
Use Python + FastAPI or Flask to:

Accept user questions via a POST endpoint

Send the question to the LLM for SQL generation

Execute the SQL on the dataset

Return a human-readable response

Integrate this backend with your frontend (React + TypeScript).

4️⃣ Frontend Integration
Use the provided React app (App.tsx, main.tsx, index.css) to:

Route users to a chatbot or data analyzer UI

Accept input and display responses from the backend

Add loading states and success/error handling

5️⃣ Bonus Features
📊 Visualizations: Use Matplotlib or Plotly to return graphs.

🔴 Streamed Responses: Simulate live response typing using StreamingResponse or similar technique.

📦 Modular Design: Keep LLM, DB, and frontend loosely coupled for easy debugging and expansion.


📂 Datasets Used
Product-Level Ad Sales and Metrics

Product-Level Total Sales and Metrics

Product-Level Eligibility Table

🎯 Objectives
Accept questions via API endpoints.

Use an LLM to interpret and translate natural language questions into SQL queries.

Query the structured data and return accurate, clean responses.

Bonus: Add data visualizations (charts) and simulate live response streaming.

🛠️ Tech Stack
SQL for structured data storage.

Local/Open-source LLM (e.g., OpenHermes, Gemma, Mistral, or Gemini 2.5 via API).

Python for backend logic and API development.

FastAPI / Flask to expose question-answering endpoints.

Matplotlib / Plotly for optional visual outputs.

✅ Example Questions Answered
What is my total sales?

Calculate the RoAS (Return on Ad Spend).

Which product had the highest CPC (Cost Per Click)?

📦 Final Deliverables
💻 Full working codebase (uploaded on this GitHub repository).

📹 Demo video (showing both API calls and responses).

📝 Notes
Ensure a modular architecture for reusability and maintenance.

Make SQL schema design a priority for query accuracy.

Choose efficient LLMs to run locally or leverage free APIs.
