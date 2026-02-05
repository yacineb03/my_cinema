<?php


require_once __DIR__ . '/../repositories/MovieRepository.php';

class MovieController
{
    private $movieRepository;

    public function __construct($pdo)
    {
        $this->movieRepository = new MovieRepository($pdo);
    }

    public function list()
    {
        $movies = $this->movieRepository->getAll();
        header('Content-Type: application/json');
        echo json_encode($movies);
    }

    public function search()
    {
        $title = $_GET['title'] ?? '';
        $movies = $this->movieRepository->search($title);
        header('Content-Type: application/json');
        echo json_encode($movies);
    }
}
