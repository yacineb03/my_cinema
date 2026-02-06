# My Cinema - Système de Gestion Cinématographique

Une application web moderne et intuitive pour la gestion complète d'un complexe cinématographique. Ce projet permet d'administrer les films, les salles et la programmation des séances via une interface élégante et performante.

## Fonctionnalités

### Tableau de Bord (Dashboard)
- Visualisation en temps réel des statistiques clés (Total Films, Salles, Séances).
- Interface "Hero" immersive avec design premium.
- Système d'état du complexe en direct.

### Gestion des Films
- Affichage des films sous forme de cartes élégantes avec effets de survol.
- Recherche dynamique par titre.
- Ajout de nouveaux films (Titre, Description, Durée, Date de sortie).
- Suppression de films existants.

### Gestion des Salles
- Visualisation des salles (Nom, Capacité, Type).
- Création de nouvelles salles personnalisées.
- Suppression de salles.

### Planning des Séances
- Vue d'ensemble du planning sous forme de table moderne.
- Programmation de séances en liant dynamiquement Films et Salles.
- Sélection intelligente via des menus déroulants alimentés par la base de données.

## Stack Technique

### Frontend
- **Langages** : HTML5, JavaScript (ES6+).
- **Styling** : Tailwind CSS (via CDN) pour un design responsive et moderne.
- **Animations** : Tailwind utility classes & CSS transitions.

### Backend
- **Langage** : PHP 8.x.
- **Architecture** : MVC (Modèle-Vue-Contrôleur) avec Pattern Repository.
- **Base de données** : MySQL via PDO pour des requêtes sécurisées.
- **API** : RESTful JSON API.

## Installation

1. **Serveur Local** : Utiliser un environnement comme MAMP, WAMP ou XAMPP.
2. **Base de Données** :
   - Importer le fichier `script.sql` fourni à la racine du projet dans phpMyAdmin.
   - Le nom de la base de données doit être `my_cinema`.
3. **Configuration** :
   - Vérifier les accès dans `backend/config/database.php` (hôte, port, utilisateur, mot de passe).
   - Par défaut configuré pour MAMP (Port 8889, User: root, Pass: root).
4. **Lancement** : 
   - Placer le dossier dans `htdocs` ou le répertoire équivalent.
   - Accéder à `frontend/index.html` via votre navigateur.

## Structure du Projet

```text
MyCinema/
├── backend/
│   ├── config/      # Connexion BDD
│   ├── controllers/ # Logique métier
│   ├── models/      # Entités de données
│   ├── repositories/# Accès BDD (Requêtes SQL)
│   └── index.php    # Routeur API
├── frontend/
│   ├── css/         # Styles personnalisés
│   ├── js/          # Logique applicative (app.js)
│   └── index.html   # Interface principale
└── script.sql       # Script de création BDD
```

---
*Projet réalisé par Yacine.*
