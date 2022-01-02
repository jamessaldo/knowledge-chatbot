# #!/usr/bin/env python3

from flask import session, copy_current_request_context
from flask_socketio import SocketIO, send, disconnect, emit
from app import create_app
from threading import Lock
import os
import requests
import json

thread = None
thread_lock = Lock()
app = create_app()

clients = {}
socketio = SocketIO(app, async_mode='eventlet', logging=True, engineio_logger=True, cors_allowed_origins="*")

@socketio.on('connect_request')
def connect_request(message):
    send({'answer': message['data'],'score': 2,'question': ""})

@socketio.on('question')
def question(message):
    payload = dict(question=message['data'], auth=os.getenv("SECRET_KEY"))
    r = requests.post(os.getenv("SVC_FLASK_ENDPOINT")+'/api/knowledge', data=payload)
    send({
            'question': r.json()['data']['prediction'],
            'answer': r.json()['data']['answer'],
            'score': r.json()['data']['score']
        })

@socketio.on('disconnect_request')
def disconnect_request():
    @copy_current_request_context
    def can_disconnect():
        disconnect()

    emit("disconnect", {'answer': 'Disconnected!'},
         callback=can_disconnect)

if __name__ == '__main__':
    socketio.run(app, os.environ.get('APP_HOST', os.getenv("APP_HOST")), port=int(os.environ.get('APP_PORT', 5001)))
    while True:
        socketio.sleep(0)