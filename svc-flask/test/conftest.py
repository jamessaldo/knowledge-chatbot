from app import create_app
import pytest
import threading
import time


WORKER_READY = list()

@pytest.fixture
def app():
    app = create_app()
    return app