from flask_restful import Resource
from flask_restful import reqparse
from app.helpers import rest
import json
from Levenshtein import ratio

def getApproximateAnswer(q):
    max_score = 0
    answer = ""
    prediction = ""
    with open('knowledge.json') as f:
        data = list(json.load(f))
    for row in data:
        score = ratio(row["question"], q)
        if score >= 0.9: # I'm sure, stop here
            return row["answer"], score, row["question"]
        elif score > max_score: # I'm unsure, continue
            max_score = score
            answer = row["answer"]
            prediction = row["question"]

    if max_score > 0.5: # treshold is lowered
        return answer, max_score, prediction
    return "Sorry, I didn't get you.", max_score, prediction


class Knowledge(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('question', type=str, required=True)
        parser.add_argument('auth', type=str, required=True)
        args = parser.parse_args()
        try:
            if args['auth'] != "INIKODERAHASIA":
                return rest.response(401, message="FAILED")

            answer, max_score, prediction = getApproximateAnswer(args['question'])
            data = {
                "question": args['question'],
                "answer":answer,
                "prediction": prediction,
                "score":max_score
            }
        except Exception as e:
            return rest.response(401, message=str(e))
        else:
            return rest.response(200, data= data, message="POST Ok")