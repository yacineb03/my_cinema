<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/controllers/MovieController.php';
require_once __DIR__ . '/controllers/RoomController.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'list_movie':
        $controller = new MovieController($pdo);
        $controller->list();
        break;

    case 'search_movie':
        $controller = new MovieController($pdo);
        $controller->search();
        break;

    case 'list_rooms':
        $controller = new RoomController($pdo);
        $controller->list();
        break;
}
