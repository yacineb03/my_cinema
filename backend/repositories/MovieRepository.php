<?php

require_once __DIR__ . '/../models/Movie.php';

class MovieRepository
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM movies ORDER BY id DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function searchByTitle($title)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM movies WHERE title LIKE ?");
        $stmt->execute(['%' . $title . '%']);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $stmt = $this->pdo->prepare("INSERT INTO movies (title, description, duration, release_date) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$data['title'], $data['description'], $data['duration'], $data['release_date']]);
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM movies WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
