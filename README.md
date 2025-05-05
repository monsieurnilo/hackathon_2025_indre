# Hackathon Project

Ce projet est composé d'une application web avec un backend en Express.js et un frontend en React.

## Structure du projet

- `backend/` : API REST avec Express.js
- `frontend/` : Interface utilisateur avec React, TypeScript et Vite

## Prérequis

- Node.js (version recommandée : 18.x ou supérieure)
- npm ou yarn

## Installation

### Backend (Express.js)

1. Accédez au répertoire backend :
    ```bash
    cd backend
    ```

2. Installez les dépendances :
    ```bash
    npm install
    # ou
    yarn install
    ```

3. Lancez le serveur en mode développement :
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

Le serveur backend sera accessible à l'adresse : http://localhost:3000

### Frontend (React + TypeScript + Vite)

1. Accédez au répertoire frontend :
    ```bash
    cd frontend
    ```

2. Installez les dépendances :
    ```bash
    npm install
    # ou
    yarn install
    ```

3. Lancez le serveur de développement :
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

L'application frontend sera accessible à l'adresse fournie dans le terminal (généralement http://localhost:5173).

## Scripts disponibles

### Backend

- `npm start` : Lance le serveur en mode production
- `npm run dev` : Lance le serveur avec nodemon pour le rechargement automatique

### Frontend

- `npm run dev` : Lance le serveur de développement Vite
- `npm run build` : Compile l'application pour la production
- `npm run preview` : Prévisualise la version compilée de l'application
- `npm run lint` : Exécute ESLint pour vérifier le code

## Technologies utilisées

### Backend
- Express.js 5.1.0
- Nodemon 3.1.10 (développement)

### Frontend
- React 19.1.0
- TypeScript 5.8.3
- Vite 6.3.5