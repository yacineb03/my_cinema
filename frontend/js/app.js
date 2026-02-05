document.addEventListener('DOMContentLoaded', () => {
    const sidebarButtons = document.querySelectorAll('.sidebar-link');
    const viewTitle = document.getElementById('view-title');
    const actionBtn = document.getElementById('main-action-btn');
    const actionText = document.getElementById('action-text');
    const filterSection = document.getElementById('filter-section');
    const paginationSection = document.getElementById('pagination-section');
    const modal = document.getElementById('app-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    sidebarButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            sidebarButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const page = btn.getAttribute('data-page');
            handleNavigation(page);
        });
    });

    function handleNavigation(page) {
        filterSection.classList.add('hidden');
        paginationSection.classList.add('hidden');
        actionBtn.classList.remove('hidden');

        if (page === 'dashboard') {
            viewTitle.innerText = 'Dashboard';
            actionBtn.classList.add('hidden');
        } else if (page === 'movies') {
            viewTitle.innerText = 'Gestion des Films';
            actionText.innerText = '+ Nouveau Film';
            filterSection.classList.remove('hidden');
            paginationSection.classList.remove('hidden');
            loadMovies();
        } else if (page === 'rooms') {
            viewTitle.innerText = 'Gestion des Salles';
            actionText.innerText = '+ Nouvelle Salle';
        } else if (page === 'screenings') {
            viewTitle.innerText = 'Planning des Séances';
            actionText.innerText = '+ Nouvelle Séance';
        }
    }

    if (actionBtn && modal) {
        actionBtn.addEventListener('click', () => {
            const label = document.getElementById('modal-label');
            if (label && viewTitle) label.innerText = viewTitle.innerText;
            modal.classList.remove('hidden');
        });
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
});

async function loadMovies() {
    try {
        const container = document.getElementById('main-content');
        if (!container) return;

        container.innerHTML = '<p class="text-white text-center animate-pulse">Chargement des films...</p>';

        const response = await fetch('../backend/index.php?action=list_movie');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const movies = await response.json();

        container.innerHTML = '';

        if (movies.length === 0) {
            container.innerHTML = '<p class="text-yellow-500 text-center">Aucun film trouvé dans la base de données.</p>';
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

        movies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-lg hover:border-violet-500 transition-colors duration-300';

            card.innerHTML = `
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold text-violet-400 truncate w-full" title="${movie.title}">${movie.title}</h3>
                </div>
                <p class="text-slate-400 text-sm mb-4 line-clamp-3 h-14 overflow-hidden">${movie.description || 'Pas de description.'}</p>
                <div class="flex justify-between items-center text-xs text-slate-500 border-t border-slate-700 pt-3">
                    <span class="flex items-center gap-1">⏱️ ${movie.duration} min</span>
                    <span class="flex items-center gap-1">📅 ${movie.release_date}</span>
                </div>
            `;
            grid.appendChild(card);
        });

        container.appendChild(grid);

    } catch (error) {
        console.error('Erreur lors du chargement des films:', error);
        document.getElementById('main-content').innerHTML = '<p class="text-red-500 text-center">Erreur de chargement. Vérifiez que le serveur tourne !</p>';
    }
}
