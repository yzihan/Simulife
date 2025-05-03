dependencies
python 3.9.18

## Deployment

**Create venv**

create virtual environment using conda or python

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
cd Simulife/backend
pip install -r requirements.txt
```
(pymongo does not support djongo 1.3.6, make sure pymongo==3.12.3)



**Download MongoDB and update**

For the first time run this app, you need to make migrations to mongodb
```
cd Simulife/backend
python manage.py makemigrations
pyhton manage.py migrate

```




**Add .env**

backend

```
cd simulife/backend
sudo vim .env
```

```
OPENAI_API_KEY="sk-..."
```



simulife(frontend)

```
cd ../simulife
sudo vim .env
```

```
REACT_APP_BACKEND_HOST = "http://localhost:8000"
```



