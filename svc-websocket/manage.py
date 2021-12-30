# #!/usr/bin/env python3

from flask import session, copy_current_request_context, render_template
from flask_socketio import SocketIO, send, emit, disconnect
from app import create_app
from threading import Lock
import os
import requests
import json

thread = None
thread_lock = Lock()
app = create_app()

async_mode = None

socketio = SocketIO(app, async_mode=async_mode, cors_allowed_origins='*')

@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

@socketio.on('connect_request', namespace='/test')
def connect_request(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count']})

@socketio.on('question', namespace='/test')
def question(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    payload = dict(question=message['data'], auth='INIKODERAHASIA')
    r = requests.post('http://knowledge.svc-flask:5000/api/knowledge', data=payload)
    emit('my_response',
         {'data': r.json()['data']['answer'], 'count': session['receive_count']})


@socketio.on('my_broadcast_event', namespace='/test')
def test_broadcast_message(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count']},
         broadcast=True)


@socketio.on('disconnect_request', namespace='/test')
def disconnect_request():
    @copy_current_request_context
    def can_disconnect():
        disconnect()

    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': 'Disconnected!', 'count': session['receive_count']},
         callback=can_disconnect)

if __name__ == '__main__':
	socketio.run(app, os.environ.get('APP_HOST', os.getenv("APP_HOST")), port=int(os.environ.get('APP_PORT', 5000)))