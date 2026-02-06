<?php




class RoomController
{
    private $roomRepository;

    public function __construct($pdo)
    {
        $this->roomRepository = new RoomRepository($pdo);
    }

    public function list()
    {
        $rooms = $this->roomRepository->getAll();
        header('Content-Type: application/json');
        echo json_encode($rooms);
    }

    public function add()
    {
        $data = [
            'name' => $_GET['name'] ?? '',
            'capacity' => $_GET['capacity'] ?? 0,
            'type' => $_GET['type'] ?? ''
        ];

        $this->roomRepository->create($data);
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    }

    public function delete()
    {
        $id = $_GET['id'] ?? 0;
        $this->roomRepository->delete($id);
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    }
}
