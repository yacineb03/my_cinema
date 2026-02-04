/**
 * My Cinema - Frontend Logic (Robust Version)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const sidebarButtons = document.querySelectorAll('.sidebar-link');
    const viewTitle = document.getElementById('view-title');
    const actionBtn = document.getElementById('main-action-btn');
    const actionText = document.getElementById('action-text');
    const filterSection = document.getElementById('filter-section');
    const paginationSection = document.getElementById('pagination-section');
    const modal = document.getElementById('app-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    console.log('JS loaded successfully');

    // Navigation Logic
    sidebarButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // UI Classes Toggle
            sidebarButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const page = btn.getAttribute('data-page');
            handleNavigation(page);
        });
    });

    /**
     * Switch view state
     */
    function handleNavigation(page) {
        // Reset defaults
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
        } else if (page === 'rooms') {
            viewTitle.innerText = 'Gestion des Salles';
            actionText.innerText = '+ Nouvelle Salle';
        } else if (page === 'screenings') {
            viewTitle.innerText = 'Planning des Séances';
            actionText.innerText = '+ Nouvelle Séance';
        }
    }

    // Modal Events
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

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
});
