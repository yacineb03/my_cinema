document.addEventListener('DOMContentLoaded', () => {
    const sidebarButtons = document.querySelectorAll('.sidebar-link');
    const viewTitle = document.getElementById('view-title');
    const actionBtn = document.getElementById('main-action-btn');
    const actionText = document.getElementById('action-text');
    const filterSection = document.getElementById('filter-section');
    const paginationSection = document.getElementById('pagination-section');
    const modal = document.getElementById('app-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const searchInput = document.getElementById('search-input');
    const statsSection = document.getElementById('stats-section');

    sidebarButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarButtons.forEach(b => b.classList.remove('active', 'bg-white/5', 'text-white'));
            sidebarButtons.forEach(b => b.classList.add('text-gray-400'));

            btn.classList.add('active', 'bg-white/5', 'text-white');
            btn.classList.remove('text-gray-400');

            const page = btn.getAttribute('data-page');
            handleNavigation(page);
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            loadMovies(query);
        });
    }

    function handleNavigation(page) {
        // Reset view
        filterSection.classList.add('hidden');
        paginationSection.classList.add('hidden');
        actionBtn.classList.remove('hidden');
        statsSection.classList.add('hidden');

        document.getElementById('main-content').innerHTML = '';

        if (page === 'dashboard') {
            viewTitle.innerText = 'Tableau de Bord';
            actionBtn.classList.add('hidden');
            statsSection.classList.remove('hidden');
            loadDashboardStats();
        } else if (page === 'movies') {
            viewTitle.innerText = 'Gestion des Films';
            actionText.innerText = '+ Nouveau Film';
            filterSection.classList.remove('hidden');
            loadMovies();
        } else if (page === 'rooms') {
            viewTitle.innerText = 'Gestion des Salles';
            actionText.innerText = '+ Nouvelle Salle';
            loadRooms();
        } else if (page === 'screenings') {
            viewTitle.innerText = 'Planning des Séances';
            actionText.innerText = '+ Nouvelle Séance';
            loadScreenings();
        }
    }

    // Init
    handleNavigation('dashboard');

    // Modal Logic
    if (actionBtn && modal) {
        actionBtn.addEventListener('click', () => {
            const activeLink = document.querySelector('.sidebar-link.active');
            const page = activeLink ? activeLink.getAttribute('data-page') : 'dashboard';

            document.getElementById('movie-form').classList.add('hidden');
            document.getElementById('room-form').classList.add('hidden');
            document.getElementById('screening-form').classList.add('hidden');

            if (page === 'movies') {
                document.getElementById('movie-form').classList.remove('hidden');
                document.getElementById('modal-label').innerText = 'Ajouter un Film';
            } else if (page === 'rooms') {
                document.getElementById('room-form').classList.remove('hidden');
                document.getElementById('modal-label').innerText = 'Ajouter une Salle';
            } else if (page === 'screenings') {
                document.getElementById('screening-form').classList.remove('hidden');
                document.getElementById('modal-label').innerText = 'Programmer une Séance';
                populateScreeningForm();
            }
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

// --- LOADERS ---

async function loadMovies(query = '') {
    const container = document.getElementById('main-content');
    container.innerHTML = '<div class="flex justify-center p-12"><div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>';

    try {
        const url = query
            ? `../backend/index.php?action=search_movie&title=${encodeURIComponent(query)}`
            : '../backend/index.php?action=list_movie';

        const response = await fetch(url);
        const movies = await response.json();

        container.innerHTML = '';
        if (movies.length === 0) {
            container.innerHTML = '<div class="text-center text-secondary py-12">Aucun film trouvé. Commencer par en ajouter un !</div>';
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in';

        movies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'bg-surface border border-white/5 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 shadow-lg group relative overflow-hidden';

            // Generate simple gradient bg based on ID for visual variety
            const gradientId = movie.id % 3;
            const gradientClass = gradientId === 0 ? 'from-blue-500/10' : (gradientId === 1 ? 'from-purple-500/10' : 'from-indigo-500/10');

            card.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-br ${gradientClass} to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative z-10 flex flex-col h-full">
                    <div class="flex justify-between items-start mb-4">
                        <span class="px-2 py-1 bg-white/5 rounded text-[10px] font-bold uppercase tracking-wider text-secondary border border-white/5">${new Date(movie.release_date).getFullYear()}</span>
                        <button onclick="deleteMovie(${movie.id})" class="text-secondary hover:text-red-500 transition-colors p-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                    
                    <h3 class="text-lg font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">${movie.title}</h3>
                    <p class="text-sm text-secondary line-clamp-3 mb-6 flex-1">${movie.description || 'Aucune description.'}</p>
                    
                    <div class="flex items-center gap-2 text-xs font-semibold text-white/50 pt-4 border-t border-white/5">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ${movie.duration} min
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        container.appendChild(grid);

    } catch (e) {
        console.error(e);
        container.innerHTML = '<div class="text-center text-red-400">Erreur lors du chargement des films.</div>';
    }
}

async function loadRooms() {
    const container = document.getElementById('main-content');
    container.innerHTML = '<div class="flex justify-center p-12"><div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>';

    try {
        const response = await fetch('../backend/index.php?action=list_rooms');
        const rooms = await response.json();

        container.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in';

        rooms.forEach(room => {
            const card = document.createElement('div');
            card.className = 'bg-surface border border-white/5 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 shadow-lg group relative';
            card.innerHTML = `
                <div class="flex justify-between items-start mb-6">
                    <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    </div>
                    <button onclick="deleteRoom(${room.id})" class="text-secondary hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">${room.name}</h3>
                <div class="flex gap-2 mb-4">
                     <span class="px-2 py-1 bg-white/5 rounded text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20">${room.type}</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-secondary pt-4 border-t border-white/5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    ${room.capacity} places
                </div>
            `;
            grid.appendChild(card);
        });
        container.appendChild(grid);
    } catch (e) { console.error(e); }
}

async function loadScreenings() {
    const container = document.getElementById('main-content');
    container.innerHTML = '<div class="flex justify-center p-12"><div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>';

    try {
        const response = await fetch('../backend/index.php?action=list_screenings');
        const screenings = await response.json();

        container.innerHTML = '';
        if (screenings.length === 0) {
            container.innerHTML = '<div class="text-center text-secondary py-12">Aucune séance programmée.</div>';
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'w-full bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-2xl animate-in';

        let html = `
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-black/20 text-xs font-bold text-secondary uppercase tracking-widest border-b border-white/5">
                        <th class="px-8 py-6">Film</th>
                        <th class="px-6 py-6">Salle</th>
                        <th class="px-6 py-6">Horaire</th>
                        <th class="px-6 py-6 text-right">Statut</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
        `;

        screenings.forEach(s => {
            const d = new Date(s.start_time);
            html += `
                <tr class="hover:bg-white/5 transition-colors group">
                    <td class="px-8 py-5">
                        <div class="font-bold text-white text-base group-hover:text-primary transition-colors">${s.movie_title}</div>
                    </td>
                    <td class="px-6 py-5">
                        <span class="inline-block px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300 font-medium">${s.room_name}</span>
                    </td>
                    <td class="px-6 py-5 text-gray-300 font-medium text-sm">
                        ${d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} à <span class="text-white font-bold">${d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </td>
                    <td class="px-6 py-5 text-right">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20">
                            Actif
                        </span>
                    </td>
                </tr>
            `;
        });
        html += '</tbody></table>';
        wrapper.innerHTML = html;
        container.appendChild(wrapper);

    } catch (e) { console.error(e); }
}

async function loadDashboardStats() {
    try {
        const [mRes, rRes, sRes] = await Promise.all([
            fetch('../backend/index.php?action=list_movie'),
            fetch('../backend/index.php?action=list_rooms'),
            fetch('../backend/index.php?action=list_screenings')
        ]);

        const m = await mRes.json();
        const r = await rRes.json();
        const s = await sRes.json();

        // Update counters
        document.getElementById('stat-movies').innerText = m.length;
        document.getElementById('stat-rooms').innerText = r.length;
        document.getElementById('stat-screenings').innerText = s.length;

        // Hero Section
        const container = document.getElementById('main-content');
        container.innerHTML = `
            <div class="relative rounded-3xl overflow-hidden h-[300px] group mb-8 animate-in">
                <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2000" class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-50 mix-blend-overlay">
                <div class="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
                
                <div class="relative z-10 h-full flex flex-col justify-center px-12">
                     <span class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/20 text-green-500 border border-green-500/20 text-xs font-bold uppercase tracking-widest mb-4 w-fit">
                        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Système Opérationnel
                    </span>
                    <h2 class="text-4xl font-bold text-white mb-2">Tableau de bord</h2>
                    <p class="text-lg text-secondary max-w-xl">
                        Il y a actuellement <span class="text-white font-bold border-b border-white/20">${s.length} séances</span> programmées cette semaine.
                    </p>
                </div>
            </div>
        `;
    } catch (e) { console.error(e); }
}

// --- ACTIONS (DELETE, ADD) ---

async function deleteMovie(id) {
    if (!confirm('Confirmer la suppression ?')) return;
    await fetch(`../backend/index.php?action=delete_movie&id=${id}`);
    loadMovies();
}

async function deleteRoom(id) {
    if (!confirm('Confirmer la suppression ?')) return;
    await fetch(`../backend/index.php?action=delete_room&id=${id}`);
    loadRooms();
}

async function populateScreeningForm() {
    const [mRes, rRes] = await Promise.all([
        fetch('../backend/index.php?action=list_movie'),
        fetch('../backend/index.php?action=list_rooms')
    ]);
    const m = await mRes.json();
    const r = await rRes.json();
    document.getElementById('screening-movie').innerHTML = m.map(x => `<option class="text-black" value="${x.id}">${x.title}</option>`).join('');
    document.getElementById('screening-room').innerHTML = r.map(x => `<option class="text-black" value="${x.id}">${x.name}</option>`).join('');
}

// FORM SUBMISSIONS
document.getElementById('movie-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await fetch(`../backend/index.php?action=add_movie&${new URLSearchParams(fd)}`);
    document.getElementById('app-modal').classList.add('hidden');
    e.target.reset();
    loadMovies();
});

document.getElementById('room-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await fetch(`../backend/index.php?action=add_room&${new URLSearchParams(fd)}`);
    document.getElementById('app-modal').classList.add('hidden');
    e.target.reset();
    loadRooms();
});

document.getElementById('screening-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch(`../backend/index.php?action=add_screening&${new URLSearchParams(fd)}`);
    const data = await res.json();
    if (data.success) {
        document.getElementById('app-modal').classList.add('hidden');
        e.target.reset();
        loadScreenings();
    } else {
        alert(data.error);
    }
});
