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
        this.collections = [];

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
            if (data.collections) {
                this.collections = data.collections;
                this.setupCollections();
            }
            this.displayPoems();
        } catch (error) {
            console.error('Error loading poems:', error);
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

        document.querySelectorAll('.shelf-item a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const collectionId = link.getAttribute('data-collection');
                this.filterByCollection(collectionId);
            });
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

    }

    displayPoems(poemsToShow = this.poems, limit = this.displayCount) {
        const grid = document.querySelector('.favorites-grid');
        if (!grid) return;
        grid.innerHTML = '';

        const slicedPoems = poemsToShow.slice(0, limit);
        slicedPoems.forEach(poem => {
            const poemElement = this.createPoemElement(poem);
            grid.appendChild(poemElement);
        });

        const loadMoreBtn = document.getElementById('loadMorePoems');
const showLessBtn = document.getElementById('showLessPoems');

if (loadMoreBtn && showLessBtn) {
    const moreToShow = limit < poemsToShow.length;
    const canShowLess = limit > 12;

    loadMoreBtn.style.display = moreToShow ? 'inline-block' : 'none';
    showLessBtn.style.display = canShowLess ? 'inline-block' : 'none';
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

    setupCollections() {
        const shelves = document.querySelector('.bookshelves');
        if (!shelves) return;
        shelves.innerHTML = '';

        this.collections.forEach(collection => {
            const div = document.createElement('div');
            div.className = 'shelf-item';
            div.innerHTML = `
                <a href="#" data-collection="${collection.id}">${collection.name}</a>
                <span class="shelf-count">(${this.getCollectionCount(collection.id)})</span>
            `;
            shelves.appendChild(div);
        });
    }

    getCollectionCount(collectionId) {
        return this.poems.filter(poem => poem.collection === collectionId).length;
    }

    filterByCollection(collectionId) {
        const filteredPoems = this.poems.filter(poem => poem.collection === collectionId);
        this.displayPoems(filteredPoems);
    }
}

function openPoemModal(poemId) {
    window.poemManager.openModal(poemId);
}

document.addEventListener('DOMContentLoaded', () => {
    window.poemManager = new PoemManager();
});
