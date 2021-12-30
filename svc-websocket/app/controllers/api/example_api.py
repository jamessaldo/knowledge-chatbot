from flask_restful import Resource
from flask_restful import reqparse
from app.helpers import rest


class ExampleAPIById(Resource):
    def get(self, id):
        data = {
            "get": "ok"
        }
        return rest.response(200, data=data, message="GET ok"+id)


class ExampleApi(Resource):
    def get(self):
        data = {
            "get": "ok"
        }
        return rest.response(200, data=data, message="OK")


class ExampleApiDelete(Resource):
    def delete(self, id):
        data = {
            "delete": "ok"
        }
        return rest.response(200, data=data, message="OK"+id)


class ExampleApiInsert(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('key', type=str, required=True)
        parser.add_argument('key1', type=str, required=False)
        args = parser.parse_args()

        try:
            data = {
                "user": args['key'],
                "password": args['key1'],
            }
        except Exception as e:
            return rest.response(401, message=str(e))
        else:
            return rest.response(200, data= data, message="POST Ok")


class ExampleApiUpdate(Resource):
    def put(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('key', type=str, required=True)
        parser.add_argument('key1', type=str, required=False)
        args = parser.parse_args()

        try:
            data = {
                "user": args['key'],
                "password": args['key1'],
            }
        except Exception as e:
            return rest.response(401, message=str(e))
        else:
            return rest.response(200, data= data, message="PUT Ok By"+id)