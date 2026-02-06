<?php

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
        $movies = $this->movieRepository->searchByTitle($title);
        header('Content-Type: application/json');
        echo json_encode($movies);
    }

    public function add()
    {
        $data = [
            'title' => $_GET['title'] ?? '',
            'description' => $_GET['description'] ?? '',
            'duration' => $_GET['duration'] ?? 0,
            'release_date' => $_GET['release_date'] ?? ''
        ];

        $this->movieRepository->create($data);
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    }

    public function delete()
    {
        $id = $_GET['id'] ?? 0;
        $this->movieRepository->delete($id);
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    }
}
