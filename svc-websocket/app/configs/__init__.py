import os
from dotenv import load_dotenv
from app.libs import MetaFlaskEnv

APP_ROOT = os.path.join(os.path.dirname(__file__), '../..')
dotenv_path = os.path.join(APP_ROOT, '.env')
load_dotenv(dotenv_path)


class Config(MetaFlaskEnv):
    ENV_PREFIX = "FLASK_"
    SECRET_KEY = "tugasnlpghozy"
