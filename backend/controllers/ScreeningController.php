<?php

require_once __DIR__ . '/../repositories/ScreeningRepository.php';

class ScreeningController
{
    private $screeningRepository;

    public function __construct($pdo)
    {
        $this->screeningRepository = new ScreeningRepository($pdo);
    }

    public function list()
    {
        $screenings = $this->screeningRepository->getAll();
        header('Content-Type: application/json');
        echo json_encode($screenings);
    }

    public function add()
    {
        $data = [
            'movie_id' => $_GET['movie_id'] ?? 0,
            'room_id'  => $_GET['room_id'] ?? 0,
            'date_time' => $_GET['date_time'] ?? ''
        ];

        $this->screeningRepository->create($data);

        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    }
}
