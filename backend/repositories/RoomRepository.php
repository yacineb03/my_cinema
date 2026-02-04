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
        $sql = "SELECT * FROM rooms";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_CLASS, "Room");
    }
}
