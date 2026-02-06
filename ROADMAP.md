# Feuille de Route et Methodologie du Projet MyCinema

Ce document retrace mon parcours de developpement pour le projet MyCinema, de la conception initiale a la livraison finale. Il explique mes choix techniques, les obstacles que j'ai surmontes et la methodologie que j'ai appliquee pour construire cette application web complete.

---

## 1. Philosophie et Methodologie

Mon objectif etait de comprendre le fonctionnement d'une application web "from scratch". J'ai voulu batir les choses "a la main" pour maitriser chaque brique, en utilisant des outils modernes pour m'accompagner.

### Mon Approche
*   **Backend (PHP)** : J'ai code la logique metier avec l'aide de l'IA qui m'a guide sur les bonnes pratiques (MVC, POO). Mon role a ete de comprendre, tester et valider chaque choix d'architecture pour m'approprier totalement le code final, plutot que de copier aveuglement.
*   **Frontend & Design** : Une fois le backend solide, j'ai utilise l'assistance de l'IA pour generer rapidement l'interface visuelle (CSS/Tailwind), ce qui m'a permis de me concentrer sur la logique d'interaction JavaScript.

---

## 2. Chronologie du Developpement

### Etape 1 : Les Fondations (PHP Procedural et Algorithmique)
Avant de creer le "Cinema", j'ai consacre du temps a maitriser les bases du PHP natif.
*   J'ai travaille sur la syntaxe et les algorithmes de base sans autocompletion pour forcer ma memorisation.
*   J'ai realise de nombreux exercices de logique (gestion de tableaux, boucles, conditions) pour affuter mon esprit de developpeur.

### Etape 2 : Apprentissage du SQL
Avant meme de lier PHP a la base de donnees, j'ai pris le temps d'apprendre le langage SQL brut.
*   J'ai appris a ecrire des requetes `SELECT`, `INSERT`, `JOIN` a la main pour comprendre comment interroger une base relationnelle.
*   Cela m'a permis de concevoir ensuite un schema de base de donnees coherent pour le projet.

### Etape 3 : Environnement de Developpement et Obstacles
J'ai rencontre des difficultes techniques majeures au demarrage.
*   **Probleme** : J'ai debute avec Laragon, mais j'ai fait face a des conflits de ports et de configuration persistants sur ma machine.
*   **Resolution** : J'ai migre vers MAMP. J'ai du reconfigurer manuellement les ports Apache/MySQL et comprendre la structure des dossiers serveurs ("htdocs").

### Etape 4 : Architecture Backend (Mon Coeur de Metier)
C'est la partie ou j'ai le plus investi. Nous avons mis en place une architecture MVC (Modele - Vue - Controleur).
*   **Repository Pattern** : Separation des requetes SQL et de la logique.
*   **Gestion des Seances** : Implementation d'une logique anti-conflit (empecher deux films dans la meme salle a la meme heure).

### Etape 5 : Base de Donnees
Modelisation du schema relationnel en SQL :
*   Tables `movies`, `rooms` et `screenings`.
*   Definition des cles etrangeres et contraintes d'integrite.

### Etape 6 : Frontend et API
Pour l'interface, j'ai transforme mon backend en pure API renvoyant du JSON.
*   J'ai utilise JavaScript et l'API `fetch` pour consommer les donnees.
*   Le design a ete realise avec TailwindCSS pour un rendu moderne et responsive ("Midnight Blue theme").

---

## 3. Bilan

Ce projet est aujourd'hui une application saine et maintenable.
Je suis passe d'exercices scolaires isoles a la creation d'un systeme complet, en comprenant toute la chaine : de la requete SQL brute jusqu'a l'affichage utilisateur.
