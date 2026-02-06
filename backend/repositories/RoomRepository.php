<?php




class RoomRepository
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM rooms");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $stmt = $this->pdo->prepare("INSERT INTO rooms (name, capacity, type) VALUES (?, ?, ?)");
        return $stmt->execute([$data['name'], $data['capacity'], $data['type']]);
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM rooms WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
