## Instalación

Primero, necesitas instalar las dependencias del proyecto. Puedes hacerlo con el siguiente comando:

## backend

Tener docker instalado

```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

```bash
pip install flask flask_cors pyttsx3 redis openai PyPDF2
```

```bash
cd backend python run.py
```

## frontend

```bash
npm install
```

```bash
npm run dev
```#   c h a t _ b o t  
 