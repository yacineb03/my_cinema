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

    public function search($title) {
        $sql = "SELECT * FROM movies WHERE title LIKE :title";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['title' => '%' . $title . '%']);
        return $stmt->fetchAll(PDO::FETCH_CLASS, "Movie");
    }
}
