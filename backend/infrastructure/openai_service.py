import openai
from infrastructure.pdf_service import get_text_from_pdf
import os

relative_path = 'file/1.pdf'
absolute_path = os.path.abspath(relative_path)

openai.api_key = "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"

def get_answer_from_openai(question):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that knows a lot about Simón Bolívar."},
            {"role": "assistant", "content": get_text_from_pdf(absolute_path)},
            {"role": "user", "content": question},
        ],
    )
    return response['choices'][0]['message']['content']