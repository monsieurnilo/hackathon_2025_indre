
# 📘 Manuel d’installation, de test et de déploiement

## 📝 Présentation du projet

Ce projet est une application web dévelopée pour aider les élus locaux à prendre des décision pertinentes afin de lutter contre les desert médicaux. Il est composé de :

- Un backend en Express.js

- Un frontend en React et Vite

- Un serveur Nginx configuré via Docker Compose pour le déploiement

---

## 📁 Structure du projet

```
hackathon-project/
├── backend/           # API REST Express.js
├── frontend/          # Interface utilisateur React + Vite
├── nginx/             # Configuration Nginx
└── docker-compose.yml # Déploiement via Docker
```

---

## ⚙️ Prérequis

- [Node.js](https://nodejs.org/) (version 18.x) — pour développement local
- [Docker](https://www.docker.com/)

---

## 🛠️ Installation

### 🔙 Backend (Express.js)

```bash
cd backend
npm install
npm run dev
```

📍 Le backend sera accessible sur : [http://localhost:3000](http://localhost:3000)

---

### 🎨 Frontend (React + TypeScript + Vite)

```bash
cd frontend
npm install
npm run dev
```

📍 Le frontend sera accessible sur : affiché dans le terminal (souvent [http://localhost:5173](http://localhost:5173))

---

## ✅ Tests

### 🔙 Backend (Jest)

```bash
cd backend
npm test
```
si vous n'avez pas encore installé les dépendances faites :
```bash
npm install
```

> Utilise **Jest** pour les tests unitaires et d’intégration.

### 🎨 Frontend (Vitest)

```bash
cd frontend
npm test
```
si vous n'avez pas encore installé les dépendances faites :
```bash
npm install
```

> Utilise **Vitest** pour les tests unitaires.

---

## 🚀 Déploiement avec Docker

Le projet contient un fichier `docker-compose.yml` qui orchestre le frontend, le backend et un serveur **Nginx**.

### 1. Construire et lancer les services

```bash
docker-compose up --build
```

### 2. Accéder à l'application

- Frontend : [http://localhost](http://localhost)
- API Backend : [http://localhost/api](http://localhost/api)

### 3. Arrêter les services

```bash
docker-compose down
```

> ⚠️ Assurez-vous que les fichiers `Dockerfile` pour `frontend/` et `backend/`, ainsi que `nginx/nginx.conf`, sont correctement configurés.

---

## 🧪 Scripts disponibles

### Backend

| Script        | Description                             |
|---------------|-----------------------------------------|
| `npm run dev` | Mode développement avec Nodemon         |
| `npm start`   | Mode production                         |
| `npm test`    | Lancement des tests avec Jest           |

### Frontend

| Script         | Description                                 |
|----------------|---------------------------------------------|
| `npm run dev`  | Serveur Vite en mode développement          |
| `npm run build`| Compilation de l'app pour la production     |
| `npm run preview`| Prévisualisation de la version buildée    |
| `npm run lint` | Vérification de la qualité du code          |
| `npm test`     | Lancement des tests avec Vitest             |

---
