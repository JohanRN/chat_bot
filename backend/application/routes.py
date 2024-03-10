from flask import request, jsonify,send_file
from __init__ import app
from flask_cors import cross_origin
from domain.question_processor import process_question
from infrastructure.redis_service import get_answer_from_cache, save_answer_to_cache
from infrastructure.openai_service import get_answer_from_openai
import pyttsx3
engine = pyttsx3.init()

@app.route('/question', methods=['POST'])
@cross_origin()
def fn_question():
    try:
        data = request.get_json()
        question = process_question(data.get('question'))
        answer = get_answer_from_cache(question)
        if answer is None:
            answer = get_answer_from_openai(question)
            save_answer_to_cache(question, answer)
        return jsonify({"answer": answer}), 200
        
    except Exception as e:
        return jsonify({"Error": str(e)}), 500

@app.route('/generated/question', methods=['POST'])
@cross_origin()
def fn_generated_question():
    try:
        question = '¿Generarame 3 preguntas genericas,importantes y cortas sobre Simón Bolívar?'
        answer = get_answer_from_cache(question)
        if answer is None:
            answer = get_answer_from_openai(question)
            save_answer_to_cache(question, answer)
        return jsonify({"answer": answer}), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 500
    
@app.route('/audio', methods=['POST'])
@cross_origin()
def get_audio():
    try:
        data = request.get_json()
        text = data.get('text')
        engine.save_to_file(text, 'output.mp3')
        engine.runAndWait()
        return send_file('output.mp3', mimetype='audio/mpeg')
    except Exception as e:
        return jsonify({"Error": str(e)}), 500

@app.errorhandler(404)
def page_not_found(e):
    return {"message": "API not found"}, 404
