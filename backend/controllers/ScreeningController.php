<?php

class ScreeningController
{
    private $pdo;
    private $screeningRepository;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->screeningRepository = new ScreeningRepository($pdo);
    }

    public function list()
    {

        $screenings = $this->screeningRepository->getAll();
        header('Content-Type: application/json');
        echo json_encode($screenings);
    }

    public function add()
    {
        header('Content-Type: application/json');

        try {
            $movieId = $_GET['movie_id'] ?? 0;
            $roomId = $_GET['room_id'] ?? 0;
            $dateTime = $_GET['date_time'] ?? '';

            if (!$movieId || !$roomId || !$dateTime) {
                throw new Exception("Données incomplètes");
            }

            // --- LOGIQUE ANTI-CONFLIT DIRECTEMENT ICI (Plus simple, plus sûr) ---

            // 1. Récupérer la durée du film
            $stmt = $this->pdo->prepare("SELECT duration FROM movies WHERE id = ?");
            $stmt->execute([$movieId]);
            $movie = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$movie) {
                throw new Exception("Film introuvable");
            }
            $duration = (int)$movie['duration'];

            // 2. Calculer fin de séance
            $start = new DateTime($dateTime);
            $end = clone $start;
            $end->modify("+$duration minutes");

            $startStr = $start->format('Y-m-d H:i:s');
            $endStr = $end->format('Y-m-d H:i:s');

            // 3. Vérifier conflit (Appel direct au Repo)
            if ($this->screeningRepository->existsOverlap($roomId, $startStr, $endStr)) {
                throw new Exception("Conflit ! Une séance est déjà prévue sur ce créneau.");
            }

            // 4. Créer
            $this->screeningRepository->create([
                'movie_id' => $movieId,
                'room_id' => $roomId,
                'start_time' => $startStr
            ]);

            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
