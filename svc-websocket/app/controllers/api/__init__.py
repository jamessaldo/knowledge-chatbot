from flask import Blueprint
from flask_restful import Api
from .health import *
from .example_api import *

api_blueprint = Blueprint("api", __name__, url_prefix='/api')
api = Api(api_blueprint)

api.add_resource(HealthCheck, "/health")
api.add_resource(ExampleApi, "/example/list")
api.add_resource(ExampleAPIById, "/example/list/<id>")
api.add_resource(ExampleApiDelete, "/example/delete/<id>")
api.add_resource(ExampleApiInsert, "/example/add")
api.add_resource(ExampleApiUpdate, "/example/edit")



