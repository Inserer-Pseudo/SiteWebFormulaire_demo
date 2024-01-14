# Projet TP

Ce projet vise à créer un site permettant de recenser les habitants d'une commune. Le site permettra de collecter les informations suivantes pour chaque habitant :

- Nom
- Prénom
- Date de naissance
- Genre
- Adresse

## Dépendances

Ce projet utilise les dépendances suivantes :

- Framework web : [Express.js](https://expressjs.com/)
- Base de données : [MongoDB](https://www.mongodb.com/)

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Assurez-vous d'avoir Node.js et MongoDB installés.
3. Installez les dépendances en exécutant la commande suivante :

    ```bash
    npm install
    ```

## Configuration

1. Créez un fichier `.env` à la racine du projet.
2. Ajoutez les variables d'environnement suivantes :

    ```plaintext
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/projet_tp
    ```

## Démarrage

Pour démarrer le serveur, exécutez la commande suivante :
