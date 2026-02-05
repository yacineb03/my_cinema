# Documentation du Projet MyCinema

Ce document retrace les étapes de développement, l'architecture technique mise en place et l'état d'avancement du projet.

## État actuel du projet (v1.0 MVC)

Le projet respecte désormais une architecture **MVC (Modèle - Vue - Contrôleur)** stricte, conformément aux exigences du sujet.
- **Backend** : API PHP structurée avec Routeur, Contrôleurs et Repositories.
- **Frontend** : Interface HTML/CSS/JS dynamique.
- **Base de données** : MySQL via PDO.

## Architecture Technique

L'application est découpée en couches distinctes pour respecter la séparation des responsabilités :

### 1. Point d'entrée Unique (Routeur)
- **Fichier** : `backend/index.php`
- **Rôle** : Il intercepte toutes les requêtes, initialise la connexion BDD, et instancie le bon Contrôleur en fonction du paramètre `?action=...`.
- **Note** : Il ne contient plus aucune logique métier.

### 2. Les Contrôleurs (Controllers)
- **Dossier** : `backend/controllers/`
- **Liste** : `MovieController`, `RoomController`.
- **Rôle** : Ils recoivent la demande du routeur, appellent le Repository pour obtenir les données, et renvoient la réponse formatée en JSON.

### 3. Les Repositories (Accès Données)
- **Dossier** : `backend/repositories/`
- **Liste** : `MovieRepository`, `RoomRepository`.
- **Rôle** : Ils contiennent toutes les requêtes SQL (PDO). Ils transforment les résultats SQL en objets PHP (Models).

### 4. Les Modèles (Entités)
- **Dossier** : `backend/models/`
- **Liste** : `Movie`, `Room`.
- **Rôle** : Classes simples représentant la structure des données (Dureté, Titre, Capacité...).

## Fonctionnalités Implémentées

### Backend API
| Action | Contrôleur | Description |
|--------|------------|-------------|
| `list_movie` | `MovieController` | Renvoie la liste complète des films. |
| `search_movie` | `MovieController` | Renvoie les films correspondant à une recherche (`?title=...`). |
| `list_rooms` | `RoomController` | Renvoie la liste des salles disponibles. |

### Frontend
- Chargement dynamique des films via `fetch()`.
- Affichage sous forme de grille responsive (TailwindCSS).
- Gestion des erreurs de connexion API.

## Installation et Lancement

1. **Serveur** : Le projet doit être placé dans le dossier `htdocs` de MAMP (ou équivalent).
2. **Base de données** :
   - Créer une base `my_cinema`.
   - Importer le fichier `script.sql`.
   - Configurer `backend/config/database.php` (User: root, Pass: vide ou root).
3. **Accès** :
   - URL : `http://localhost:8888/MyCinema/frontend/index.html`
