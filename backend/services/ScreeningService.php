<?php




class ScreeningService
{
    private $screeningRepository;
    private $movieRepository;

    public function __construct($pdo)
    {
        $this->screeningRepository = new ScreeningRepository($pdo);
        $this->movieRepository = new MovieRepository($pdo);
    }

    public function addScreening($movieId, $roomId, $dateTime)
    {
        // 1. Get movie duration
        $movie = $this->movieRepository->getById($movieId);
        if (!$movie) {
            throw new Exception("Film introuvable");
        }

        $duration = (int)$movie['duration'];

        // 2. Calculate end time
        $startDateTime = new DateTime($dateTime);
        $endDateTime = clone $startDateTime;
        $endDateTime->modify("+$duration minutes");

        $startTimeStr = $startDateTime->format('Y-m-d H:i:s');
        $endTimeStr = $endDateTime->format('Y-m-d H:i:s');

        // 3. Check conflicts
        if ($this->screeningRepository->existsOverlap($roomId, $startTimeStr, $endTimeStr)) {
            throw new Exception("Conflit de planning : une séance existe déjà dans cette salle sur ce créneau.");
        }

        // 4. Create screening
        return $this->screeningRepository->create([
            'movie_id' => $movieId,
            'room_id' => $roomId,
            'date_time' => $startTimeStr
        ]);
    }
}
