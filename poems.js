class PoemManager {
    constructor() {
        console.log('Initializing PoemManager');
        this.modal = document.getElementById('poemModal');
        this.modalTitle = document.getElementById('poemTitle');
        this.modalAuthor = document.getElementById('poemAuthor');
        this.modalContent = document.getElementById('poemText');
        this.modalCover = document.getElementById('poemCover');
        this.closeButton = document.getElementById('closeModal');

        this.poems = [];
        this.currentFilter = 'all'; // To store current category filter
        this.currentSort = 'sort-latest'; // Default sort

        this.displayCount = 12; // poems initially
        this.batchSize = 6;     // poems per click

        this.setupEventListeners();
        this.loadPoems();
    }

    async loadPoems() {
        try {
            const response = await fetch('poems.json');
            if (!response.ok) throw new Error('Failed to fetch poems');
            const data = await response.json();
            this.poems = data.poems;
            this.sortPoems(this.currentSort); // Perform initial sort
            this.setupCategories();
            this.displayPoems();
        } catch (error) {
            console.error('Error loading poems:', error);
            const grid = document.querySelector('.favorites-grid');
            if (grid) grid.innerHTML = '<p>Sorry, we couldn\'t load the poems at this time.</p>';
        }
    }

    setupEventListeners() {
        this.closeButton.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredPoems = this.poems.filter(poem =>
                    poem.title.toLowerCase().includes(searchTerm) ||
                    poem.content.toLowerCase().includes(searchTerm)
                );
                this.displayPoems(filteredPoems);
            });
        }

        document.getElementById('categoryFilter')?.addEventListener('change', (e) => {
            const value = e.target.value;
            if (value.startsWith('sort-')) {
                this.sortPoems(value);
            } else {
                this.filterByCategory(value);
            }
        });

        const loadMoreBtn = document.getElementById('loadMorePoems');
        const showLessBtn = document.getElementById('showLessPoems');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.displayCount += this.batchSize;
                this.displayPoems();
            });
        }
        if (showLessBtn) {
    showLessBtn.addEventListener('click', () => {
        this.displayCount = Math.max(12, this.displayCount - this.batchSize);
        this.displayPoems();
    });
        }

        const listopiaBtn = document.getElementById('listopiaToggleBtn');
        if (listopiaBtn) {
            listopiaBtn.addEventListener('click', () => {
                const moreItems = document.querySelector('.more-items');
                if (moreItems) {
                    const isHidden = moreItems.style.display === 'none';
                    moreItems.style.display = isHidden ? 'block' : 'none';
                    listopiaBtn.textContent = isHidden ? 'Show Less' : 'Show More';
                }
            });
        }

        const toggleQuotesBtn = document.getElementById('toggleQuotesBtn');
        if (toggleQuotesBtn) {
            toggleQuotesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const moreQuotes = document.getElementById('more-quotes');
                if (moreQuotes) {
                    const isHidden = moreQuotes.style.display === 'none';
                    moreQuotes.style.display = isHidden ? 'block' : 'none';
                    e.target.textContent = isHidden ? 'Show Less' : 'More...';
                }
            });
        }

    }

    displayPoems(poemsToShow = null) {
        const grid = document.querySelector('.favorites-grid');
        if (!grid) return;
        grid.innerHTML = '';

        let poemsToDisplay = poemsToShow;

        if (poemsToDisplay === null) {
            // If not a search result, apply category filter
            if (this.currentFilter !== 'all') {
                poemsToDisplay = this.poems.filter(poem => poem.category === this.currentFilter);
            } else {
                poemsToDisplay = this.poems;
            }
        }

        const slicedPoems = poemsToDisplay.slice(0, this.displayCount);
        if (slicedPoems.length === 0) {
            grid.innerHTML = '<p>No poems found for this filter.</p>';
        }

        slicedPoems.forEach(poem => {
            const poemElement = this.createPoemElement(poem);
            grid.appendChild(poemElement);
        });

        const loadMoreBtn = document.getElementById('loadMorePoems');
        const showLessBtn = document.getElementById('showLessPoems');
        if (loadMoreBtn && showLessBtn) {
            loadMoreBtn.style.display = this.displayCount < poemsToDisplay.length ? 'inline-block' : 'none';
            showLessBtn.style.display = this.displayCount > 12 ? 'inline-block' : 'none';
        }
    }

    createPoemElement(poem) {
        const div = document.createElement('div');
        div.className = 'poem-cover';
        div.onclick = () => this.openModal(poem.id);
        div.innerHTML = `
            <img class="poem-cover__thumbnail" src="${poem.thumbnail}" alt="${poem.title}">
            <div class="poem-cover__title">${poem.title}</div>
        `;
        return div;
    }

    openModal(poemId) {
    const poem = this.poems.find(p => p.id === poemId);
    if (poem) {
        this.modalTitle.textContent = poem.title;
        this.modalContent.textContent = poem.content;
        this.modalCover.src = poem.coverImage;

        // Set one-line metadata: author | category | date
        this.modalAuthor.innerHTML = `
          by <strong>${poem.author}</strong> &nbsp;|&nbsp;
          <span class="modal__category">${poem.category}</span> &nbsp;|&nbsp;
          <span class="modal__date">${poem.date}</span>
        `;

        this.modal.classList.add('active');
    }
}


    closeModal() {
        this.modal.classList.remove('active');
    }

    setupCategories() {
        const categoryFilter = document.getElementById('categoryFilter');
        if (!categoryFilter) return;
        const categoryGroup = categoryFilter.querySelector('optgroup[label="Filter By"]');

        const categories = [...new Set(this.poems.map(p => p.category))].sort();

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryGroup.appendChild(option);
        });
    }

    filterByCategory(category) {
        this.currentFilter = category;
        document.getElementById('categoryFilter').value = category; // Sync dropdown
        this.displayCount = 12; // Reset display count on new filter
        this.displayPoems();
    }

    sortPoems(sortType) {
        this.currentSort = sortType;
        document.getElementById('categoryFilter').value = sortType; // Sync dropdown

        this.poems.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (sortType === 'sort-latest') {
                return dateB - dateA; // Descending
            }
            return dateA - dateB; // Ascending
        });
        this.displayPoems();
    }
}

function openPoemModal(poemId) {
    window.poemManager.openModal(poemId);
}

document.addEventListener('DOMContentLoaded', () => {
    window.poemManager = new PoemManager();

    // Register the service worker for PWA functionality
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then((reg) => console.log('Service worker registered.', reg))
            .catch((err) => console.error('Service worker not registered.', err));
    }
});
