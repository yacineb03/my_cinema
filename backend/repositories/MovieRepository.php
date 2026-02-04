<?php
class MovieRepository
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAll()
    {
        $sql = "SELECT * FROM movies";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_CLASS, "Movie");
    }
}
