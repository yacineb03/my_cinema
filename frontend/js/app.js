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
            sidebarButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
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
        filterSection.classList.add('hidden');
        paginationSection.classList.add('hidden');
        actionBtn.classList.remove('hidden');
        statsSection.classList.add('hidden');

        if (page === 'dashboard') {
            viewTitle.innerText = 'Tableau de Bord';
            actionBtn.classList.add('hidden');
            statsSection.classList.remove('hidden');
            loadDashboardStats();
        } else if (page === 'movies') {
            viewTitle.innerText = 'Gestion des Films';
            actionText.innerText = '+ Nouveau Film';
            filterSection.classList.remove('hidden');
            paginationSection.classList.remove('hidden');
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

    handleNavigation('dashboard');

    if (actionBtn && modal) {
        actionBtn.addEventListener('click', () => {
            const page = document.querySelector('.sidebar-link.active').getAttribute('data-page');
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

async function loadMovies(query = '') {
    try {
        const container = document.getElementById('main-content');
        if (!container) return;
        container.innerHTML = '<p class="text-white text-center animate-pulse">Chargement des films...</p>';
        const url = query
            ? `../backend/index.php?action=search_movie&title=${encodeURIComponent(query)}`
            : '../backend/index.php?action=list_movie';
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const movies = await response.json();
        container.innerHTML = '';
        if (movies.length === 0) {
            container.innerHTML = '<p class="text-yellow-500 text-center">Aucun film trouvé dans la base de données.</p>';
            return;
        }
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8';
        movies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'group relative bg-[#161922] border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-500';
            card.innerHTML = `
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-2 bg-primary/10 rounded-lg">
                            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
                            </svg>
                        </div>
                        <button onclick="deleteMovie(${movie.id})" class="p-2 bg-red-500/10 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white transform translate-y-2 group-hover:translate-y-0">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                    <h3 class="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1" title="${movie.title}">${movie.title}</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 h-[60px] italic">"${movie.description || 'Une œuvre cinématographique en attente de mots...'}"</p>
                    <div class="flex items-center gap-4 py-4 border-t border-white/5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        <div class="flex items-center gap-1.5">
                            <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            ${movie.duration} MIN
                        </div>
                        <div class="flex items-center gap-1.5">
                            <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            ${new Date(movie.release_date).getFullYear()}
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        container.appendChild(grid);
    } catch (error) {
        console.error('Erreur lors du chargement des films:', error);
        document.getElementById('main-content').innerHTML = '<p class="text-red-500 text-center">Erreur de chargement.</p>';
    }
}

async function deleteMovie(id) {
    if (!confirm('Supprimer ce film ?')) return;
    try {
        await fetch(`../backend/index.php?action=delete_movie&id=${id}`);
        loadMovies();
    } catch (error) {
        alert('Erreur lors de la suppression');
    }
}

document.getElementById('movie-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams(formData).toString();
    try {
        await fetch(`../backend/index.php?action=add_movie&${params}`);
        document.getElementById('app-modal').classList.add('hidden');
        e.target.reset();
        loadMovies();
    } catch (error) {
        alert('Erreur lors de l\'ajout');
    }
});

async function loadRooms() {
    try {
        const container = document.getElementById('main-content');
        if (!container) return;
        container.innerHTML = '<p class="text-white text-center animate-pulse">Chargement des salles...</p>';
        const response = await fetch('../backend/index.php?action=list_rooms');
        const rooms = await response.json();
        container.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8';
        rooms.forEach(room => {
            const card = document.createElement('div');
            card.className = 'group relative bg-[#161922] border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500';
            card.innerHTML = `
                <div class="p-6">
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                        <button onclick="deleteRoom(${room.id})" class="p-2 bg-red-500/10 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-1">${room.name}</h3>
                    <div class="inline-block px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-4">${room.type}</div>
                    <div class="flex items-center gap-3 pt-4 border-t border-white/5 text-sm text-slate-400">
                        <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <span>${room.capacity} places de cinéma</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        container.appendChild(grid);
    } catch (error) {
        console.error('Erreur salles:', error);
    }
}

async function deleteRoom(id) {
    if (!confirm('Supprimer cette salle ?')) return;
    try {
        await fetch(`../backend/index.php?action=delete_room&id=${id}`);
        loadRooms();
    } catch (error) {
        alert('Erreur suppression salle');
    }
}

async function loadDashboardStats() {
    try {
        const [moviesRes, roomsRes, screeningsRes] = await Promise.all([
            fetch('../backend/index.php?action=list_movie'),
            fetch('../backend/index.php?action=list_rooms'),
            fetch('../backend/index.php?action=list_screenings')
        ]);
        const movies = await moviesRes.json();
        const rooms = await roomsRes.json();
        const screenings = await screeningsRes.json();



        document.getElementById('stat-movies').innerText = movies.length;
        document.getElementById('stat-rooms').innerText = rooms.length;
        document.getElementById('stat-screenings').innerText = screenings.length;
        const container = document.getElementById('main-content');
        container.innerHTML = `
            <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div class="relative h-[300px] rounded-3xl overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=2000" 
                         class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Cinema">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#0f1117] via-[#0f1117]/80 to-transparent flex flex-col justify-center px-12">
                        <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border border-primary/30">
                            <span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                            Système en ligne
                        </div>
                        <h1 class="text-4xl font-extrabold text-white mb-2 leading-tight">Bonjour, Yacine <br><span class="text-primary italic font-serif">Bonne gestion de votre cinéma.</span></h1>
                        <p class="text-slate-400 max-w-md text-sm leading-relaxed">Le complexe est actuellement opérationnel. Vous avez ${movies.length} films programmés pour vos spectateurs.</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="bg-secondary/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl flex flex-col space-y-6 hover:border-primary/30 transition-all group">
                        <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                        </div>
                        <div>
                            <h4 class="text-lg font-bold text-white mb-2">Contrôle Rapide</h4>
                            <p class="text-slate-500 text-sm leading-relaxed mb-6">Ajoutez rapidement des séances ou modifiez vos salles directement depuis le menu latéral pour garder votre planning à jour.</p>
                            <div class="flex gap-3">
                                <div class="px-4 py-2 bg-white/5 rounded-xl text-xs font-semibold text-slate-400">Rapports Hebdo</div>
                                <div class="px-4 py-2 bg-white/5 rounded-xl text-xs font-semibold text-slate-400">Logs Système</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group">
                        <div class="absolute -right-8 -bottom-8 w-40 h-40 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-all"></div>
                        <div class="w-20 h-20 bg-white shadow-2xl rounded-2xl flex items-center justify-center mb-2 transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                             <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold text-white mb-2">Expérience Cinéma</h4>
                            <p class="text-slate-500 text-sm max-w-xs mx-auto italic">"Le cinéma, c'est l'écriture moderne dont l'encre est la lumière."</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (e) {
        console.error(e);
    }
}

async function loadScreenings() {
    try {
        const container = document.getElementById('main-content');
        if (!container) return;
        container.innerHTML = '<p class="text-white text-center animate-pulse py-12">Chargement du planning...</p>';
        const response = await fetch('../backend/index.php?action=list_screenings');
        const screenings = await response.json();
        container.innerHTML = '';
        if (screenings.length === 0) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center py-20 text-slate-500 space-y-4">
                    <svg class="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <p>Aucune séance programmée pour le moment.</p>
                </div>
            `;
            return;
        }
        const tableContainer = document.createElement('div');
        tableContainer.className = 'bg-secondary/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden animate-in fade-in duration-500';
        let tableHTML = `
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                        <tr>
                            <th class="px-8 py-5">Film</th>
                            <th class="px-8 py-5">Salle</th>
                            <th class="px-8 py-5 text-center">Date & Heure</th>
                            <th class="px-8 py-5 text-right">État</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
        `;
        screenings.forEach(s => {
            const dateObj = new Date(s.start_time);
            const date = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
            const time = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            tableHTML += `
                <tr class="hover:bg-white/5 transition-colors group">
                    <td class="px-8 py-6">
                        <div class="flex items-center gap-4">
                            <div class="w-2 h-10 bg-primary/20 rounded-full group-hover:bg-primary transition-all duration-500"></div>
                            <span class="font-bold text-white text-lg">${s.movie_title}</span>
                        </div>
                    </td>
                    <td class="px-8 py-6">
                        <span class="px-3 py-1 bg-white/5 rounded-lg text-xs font-semibold text-slate-300 border border-white/5">${s.room_name}</span>
                    </td>
                    <td class="px-8 py-6 text-center">
                        <div class="flex flex-col items-center">
                            <span class="text-white font-bold">${date}</span>
                            <span class="text-primary text-xs font-bold">${time}</span>
                        </div>
                    </td>
                    <td class="px-8 py-6 text-right">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            Confirmé
                        </span>
                    </td>
                </tr>
            `;
        });
        tableHTML += '</tbody></table></div>';
        tableContainer.innerHTML = tableHTML;
        container.appendChild(tableContainer);
    } catch (error) {
        console.error('Erreur séances:', error);
    }
}

async function populateScreeningForm() {
    try {
        const [moviesRes, roomsRes] = await Promise.all([
            fetch('../backend/index.php?action=list_movie'),
            fetch('../backend/index.php?action=list_rooms')
        ]);
        const movies = await moviesRes.json();
        const rooms = await roomsRes.json();
        const movieSelect = document.getElementById('screening-movie');
        const roomSelect = document.getElementById('screening-room');
        movieSelect.innerHTML = movies.map(m => `<option value="${m.id}">${m.title}</option>`).join('');
        roomSelect.innerHTML = rooms.map(r => `<option value="${r.id}">${r.name}</option>`).join('');
    } catch (e) {
        console.error(e);
    }
}

document.getElementById('room-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams(formData).toString();
    try {
        await fetch(`../backend/index.php?action=add_room&${params}`);
        document.getElementById('app-modal').classList.add('hidden');
        e.target.reset();
        loadRooms();
    } catch (e) {
        alert('Erreur ajout salle');
    }
});

document.getElementById('screening-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams(formData).toString();
    try {
        const response = await fetch(`../backend/index.php?action=add_screening&${params}`);
        const data = await response.json();

        if (!data.success) {
            alert(data.error || 'Erreur lors de l\'ajout');
            return;
        }

        document.getElementById('app-modal').classList.add('hidden');
        e.target.reset();
        loadScreenings();
    } catch (e) {
        alert('Erreur technique');
        console.error(e);
    }
});
