📊 Overview
This project aims to build an AI-powered question-answering agent that interfaces with structured e-commerce datasets. The agent uses a locally hosted or free-access LLM to understand user queries, translate them into SQL, fetch data from a relational database, and respond in a clear, human-readable format. Optionally, it also supports chart generation and streamed (real-time-like) responses for enhanced interactivity.

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

🔁 Workflow
Convert all datasets into SQL tables.

Select and set up an LLM (downloaded or accessed via API).

Create an API that:

Accepts questions

Processes them using the LLM

Generates SQL queries

Fetches data and responds in natural language

(Bonus) Stream responses and plot visualizations when applicable.

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
