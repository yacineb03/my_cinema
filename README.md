# Documentation du Projet MyCinema

Ce document retrace les étapes de développement, les choix techniques et les solutions apportées aux problèmes rencontrés lors de la mise en place de l'environnement local et du développement initial.

## État actuel du projet

Le projet dispose actuellement d'une architecture fonctionnelle reliant le Frontend au Backend, avec une base de données opérationnelle.
- **Backend** : API PHP structurée (MVC léger) capable de fournir la liste des films.
- **Frontend** : Interface HTML/CSS/JS capable de récupérer et afficher les données dynamiquement.
- **Base de données** : MySQL, peuplée avec des données de test.

## Historique des étapes techniques

### 1. Installation de l'environnement serveur
Nous avons rencontré des difficultés avec l'outil initialement prévu (Laragon) en raison de problèmes de version et de démarrage du service MySQL.
**Solution retenue** : Installation de MAMP (Windows).
- Serveur Web : Apache (Port 8888)
- Base de données : MySQL (Port 8889)
- Dossier racine du serveur : C:\MAMP\htdocs

### 2. Configuration de la Base de Données
Le serveur MAMP étant une nouvelle installation, la base de données était initialement vide.
**Actions effectuées** :
1. Création de la base de données `my_cinema` via phpMyAdmin.
2. Importation du fichier `script.sql` contenant la structure des tables (movies, rooms, screenings) et les jeux de données initiaux (Batman, Inception, etc.).

### 3. Développement Backend (PHP)
Mise en place d'un point d'entrée unique (`index.php`) qui agit comme routeur.
- Création du fichier de configuration `database.php` pour centraliser la connexion PDO.
- Ajustement des identifiants de connexion pour MAMP (User: root, Password: vide).
- Implémentation des Repositories (MovieRepository) pour séparer la logique SQL du reste du code.
- Création de l'endpoint API `?action=list_movie` qui retourne les données au format JSON.

### 4. Liaison Frontend - Backend
Le défi principal a été de faire communiquer l'interface utilisateur avec le serveur.

**Problèmes rencontrés et résolus :**
- **Chemin d'accès** : Les fichiers n'étaient pas lus par le serveur car stockés initialement dans OneDrive.
  -> Solution : Déplacement intégral du projet vers le dossier racine du serveur (`C:\MAMP\htdocs\MyCinema`).
- **Cible HTML manquante** : Le script JS tentait d'injecter les films dans un élément inexistant.
  -> Solution : Ajout de l'ID `main-content` dans le fichier `index.html`.
- **Cache navigateur** : Les modifications n'apparaissaient pas immédiatement.
  -> Solution : Utilisation de la navigation privée et rafraîchissement forcé.

### 5. Implémentation JavaScript
Le fichier `app.js` a été configuré pour effectuer des appels asynchrones (`fetch`) vers l'API PHP.
La fonction `loadMovies()` récupère désormais le JSON, génère le HTML correspondant (cartes de films) et l'insère dynamiquement dans la page sans rechargement.

## Prochaines étapes
- Finalisation de la barre de recherche (connexion à l'endpoint `search_movie`).
- Mise en place de la pagination pour limiter le nombre de résultats.
- Développement des fonctionnalités CRUD (Ajout/Suppression de films).
