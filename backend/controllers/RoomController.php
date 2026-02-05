<?php

require_once __DIR__ . '/../repositories/RoomRepository.php';

class RoomController
{

    private $roomRepository;

    public function __construct($pdo)
    {
        $this->roomRepository = new RoomRepository($pdo);
    }

    public function list()
    {

        $room = $this->roomRepository->getAll();

        header('Content-Type: application/json');

        echo json_encode($room);
    }
}
