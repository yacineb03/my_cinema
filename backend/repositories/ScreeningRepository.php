<?php




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
                ORDER BY s.start_time ASC";

        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $sql = "INSERT INTO screenings (movie_id, room_id, start_time) 
                VALUES (:movie_id, :room_id, :start_time)";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute($data);
    }

    public function existsOverlap($roomId, $startTime, $endTime)
    {
        $sql = "SELECT COUNT(*) FROM screenings s 
                JOIN movies m ON s.movie_id = m.id 
                WHERE s.room_id = :room_id 
                AND s.start_time < :end_time 
                AND DATE_ADD(s.start_time, INTERVAL m.duration MINUTE) > :start_time";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            'room_id' => $roomId,
            'start_time' => $startTime,
            'end_time' => $endTime
        ]);

        return $stmt->fetchColumn() > 0;
    }
}
