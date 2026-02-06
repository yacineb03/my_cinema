<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/models/Movie.php';
require_once __DIR__ . '/models/Room.php';
require_once __DIR__ . '/models/Screening.php';
require_once __DIR__ . '/repositories/MovieRepository.php';
require_once __DIR__ . '/repositories/RoomRepository.php';
require_once __DIR__ . '/repositories/ScreeningRepository.php';
require_once __DIR__ . '/controllers/MovieController.php';
require_once __DIR__ . '/controllers/RoomController.php';


require_once __DIR__ . '/controllers/ScreeningController.php';


try {
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

        case 'add_movie':
            $controller = new MovieController($pdo);
            $controller->add();
            break;

        case 'delete_movie':
            $controller = new MovieController($pdo);
            $controller->delete();
            break;

        case 'add_room':
            $controller = new RoomController($pdo);
            $controller->add();
            break;

        case 'delete_room':
            $controller = new RoomController($pdo);
            $controller->delete();
            break;

        case 'list_screenings':
            $controller = new ScreeningController($pdo);
            $controller->list();
            break;

        case 'add_screening':
            $controller = new ScreeningController($pdo);
            $controller->add();
            break;

        default:
            // Optional: handle unknown actions or just do nothing
            break;
    }
} catch (Exception $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
} catch (Error $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
}
