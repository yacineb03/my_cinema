<?php
require_once 'config/database.php';
require_once 'models/Movie.php';
require_once 'repositories/MovieRepository.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'list_movie':
        $repo = new MovieRepository($pdo);
        $movies = $repo->getAll();
        header('Content-Type: application/json');
        echo json_encode($movies);
        break;
}
