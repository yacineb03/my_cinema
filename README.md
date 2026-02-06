# MyCinema - Systeme de Gestion de Cinema

Application web complete de gestion de multiplexe cinematographique. Permet l'administration des films, des salles et la planification des seances.

## Fonctionnalites Principales

### Dashboard (Vue d'Ensemble)
- Statistiques en temps reel (Films actifs, Capacite, Seances hebdo).
- Indicateur d'etat du systeme.
- Interface moderne "Midnight Blue" sans distractions.

### Gestion des Films
- Catalogue complet avec affiches generees dynamiquement.
- Ajout de nouveaux films (Titre, Duree, Date de sortie, Description).
- Recherche instantanee.
- Suppression avec confirmation.

### Gestion des Salles
- Vue des differentes salles (Standard, VIP, IMAX, 4DX).
- Capacite et details techniques.
- Gestion du parc immobilier (Ajout/Suppression).

### Planification (Seances)
- Algorithme anti-conflit : Empeche de programmer deux films dans la meme salle au meme moment.
- Vue tableau claire des horaires.
- Statut actif des seances.

## Stack Technique

- Frontend : Native JS (Vanilla), TailwindCSS (CDN), HTML5.
- Backend : PHP 8.x (Architecture MVC sans framework).
- Base de Donnees : MySQL.

## Installation

1. Cloner le repo dans votre dossier serveur (htdocs/www).
2. Importer script.sql dans votre base de donnees MySQL.
3. Configurer backend/config/database.php (verifier user/password).
4. Acceder via http://localhost/MyCinema/frontend/.

## Auteurs

Developpe par Yacine (Admin Sys).
v1.0.4 - Stable Release.
