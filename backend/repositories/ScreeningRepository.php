<?php

require_once __DIR__ . '/../models/Screening.php';

class ScreeningRepository
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAll()
    {
        $sql = "SELECT s.*, m.title as movie_title, r.name as room_name 
                FROM screenings s
                JOIN movies m ON s.movie_id = m.id
                JOIN rooms r ON s.room_id = r.id
                ORDER BY s.date_time ASC";

        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $sql = "INSERT INTO screenings (movie_id, room_id, date_time) 
                VALUES (:movie_id, :room_id, :date_time)";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute($data);
    }
}
