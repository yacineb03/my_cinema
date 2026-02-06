# MyCinema

Application de gestion de complexe cinematographique. Permet aux administrateurs de gerer les films, les salles et de planifier les seances intelligemment.

## Fonctionnalites

### Gestion des Films
- **Ajouter un film** : Titre, duree, description, date de sortie.
- **Lister les films** : Vue grille moderne avec infos cles.
- **Rechercher** : Recherche dynamique par titre.
- **Supprimer** : Retrait d'un film de la base.

### Gestion des Salles
- **Ajouter une salle** : Nom, capacite, type (VIP, Standard, 4DX, etc.).
- **Lister les salles** : Vue des capacites et equipements.
- **Supprimer** : Gestion du parc de salles.

### Planification des Seances
- **Programmer une seance** : Selection du film et de la salle.
- **Anti-Conflit** : Le systeme empeche automatiquement de creer une seance si la salle est deja occupee par un autre film sur le meme creneau horaire (en prenant en compte la duree du film).
- **Dashboard** : Vue d'ensemble avec statistiques en temps reel (nombre de films, salles, seances).

## Stack Technique

- **Backend** : PHP 8 (Architecture MVC sans framework), PDO MySQL.
- **Frontend** : JavaScript (Vanilla + Fetch API), HTML5, CSS3.
- **Base de donnees** : MySQL.

## Installation

1.  Importer le script SQL `script.sql` dans votre base de donnees locale.
2.  Configurer le fichier `backend/config/database.php` avec vos acces (Host, User, Password).
3.  Lancer un serveur local (MAMP/WAMP/XAMPP) pointant vers le dossier du projet.

---
**Auteur** : Yacine
**Projet** : Epitech - MyCinema
