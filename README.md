# Welcome

This repo is the raw quantitive data and analysis code for project Simulife.

---

### File Structure

- [x] 🍀 `data_scale`: Participant Self-Report Scale Data
  - [x] `with.xlsx`: Data collected when participants interacted with the sage agent.
  - [x] `without.xlsx`: Data collected when participants did not interact with the sage agent.
- [x] 🏁 `data_system_log`: System Interaction Data 
  - [x] `data1_cleaned.xlsx`: This file contains the data of user conversations, and decision-making processes during the interaction with system.
- [x] 💃🏻 `LIWC_analysis` -- This directory contains results from the Linguistic Inquiry and Word Count (LIWC) analysis:
  - [x] `LIWC-22 Results - 38 File(s) - Narrative Arc Table`: This dataset presents LIWC analysis results from 38 files, with specific data derived from 18 participants across 36 files.
- [x] 🚑 `analysis_code`: Data Analysis and Visualization Scripts -- This section hosts the Jupyter notebooks used for data analysis and visualization:
  - [x] `simu_main_analysis.ipynb`: The primary notebook for conducting main data analyses.
  - [x] `simu_side_analysis.ipynb`: Supplementary notebook for conducting additional data analyses.
- [x] `system_code`: ### Implementation Code for System -- This directory is divided into two parts, containing the source codes for the system's frontend and backend:
  - [x] `backend`: Contains all backend-related codes, managing data processing and system logic.
  - [x] `frontend`: Includes all frontend-related codes, responsible for user interface design and interaction handling.

The images in the project are generated by DALLE or searched from google. Images are used for research only.

---

## Instruction to run the project

We are using python 3.9.18 for the backend Django project  and node 18 for frontend React project.

### Backend

Create virtual environment using conda or python

1.using conda

```
conda create --name simu python=3.9
conda activate simu
```

2.using python

make sure you have p

```
cd ~
python -m venv simu
source simu/bin/activate
```


**Download dependencies**

```
cd ./backend
pip install -r requirements.txt
```

(pymongo does not support djongo 1.3.6, make sure pymongo==3.12.3)



**Download MongoDB and update**

For the first time run this app, you need to make migrations to mongodb

```
cd ./backend
python manage.py makemigrations
pyhton manage.py migrate

```



**Add environment varibales for API keys**

```
cd ./backend
sudo vim .env
```

```
OPENAI_API_KEY="sk-..."
```

### Frontend

```
cd ./frontend
sudo vim .env
```

```
REACT_APP_BACKEND_HOST = "http://localhost:8000"
```



### Potential Problems

(1) The project is built in 2023 and is based on a old version of pip "openai" library. It might be outdated and cause problem when running it.

(2) We use "pymongo" and it does not support "djongo" 1.3.6, make sure  you install "pymongo==3.12.3"

(3) We are using "Azure Openai API" for our API calls. Remember to change corresponding code in  `Simulife/system_code/backend/api/ai_models/openai_api.py `if you are using API from other providers.
