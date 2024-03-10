def process_question(question):
    pregunta = question.lower()
    pregunta = pregunta.replace('simon', '').replace('bolivar', '').replace('simón bolívar', '').replace('simón', '').replace('bolívar', '').rstrip()
    pregunta += ' Simón Bolívar'
    return pregunta