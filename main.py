import pyttsx3

# Inicializar el motor de texto a voz
engine = pyttsx3.init()

# El texto que quieres convertir a voz
text = "Simón Bolívar murió en Santa Marta, Colombia, el 17 de diciembre de 1830. Falleció a causa de una tuberculosis que lo había debilitado considerablemente. Aunque su salud se había deteriorado, su legado como uno de los principales líderes de la independencia de América Latina perdura hasta hoy en día."

# Usar el motor para decir el texto
engine.save_to_file(text, 'output.mp3')


# Esperar hasta que se haya dicho todo el texto
engine.runAndWait()