import redis

r = redis.Redis(host='localhost', port=6379, db=0)

def get_answer_from_cache(question):
    answer = r.get(question)
    if answer is not None:
        answer = answer.decode('utf-8')
    return answer

def save_answer_to_cache(question, answer):
    r.setex(question, 259200, answer)