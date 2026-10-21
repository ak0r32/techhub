// Search Functionality Module
const SearchModule = (function() {
    'use strict';

    // Initialize search functionality
    function init() {
        setupSearchBar();
        setupAutocomplete();
    }

    // Setup main search bar
    function setupSearchBar() {
        const searchInputs = document.querySelectorAll('.w3-input-search');
        const searchButtons = document.querySelectorAll('.w3-button-search');

        searchInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(this.value);
                }
            });

            // Add autocomplete functionality
            input.addEventListener('input', function() {
                const query = this.value;
                if (query.length >= 2) {
                    showAutocompleteSuggestions(query, this);
                } else {
                    hideAutocompleteSuggestions();
                }
            });

            // Focus event to show recent searches
            input.addEventListener('focus', function() {
                if (!this.value) {
                    showRecentSearches(this);
                }
            });
        });

        searchButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.parentElement.querySelector('.w3-input-search');
                if (input && input.value) {
                    performSearch(input.value);
                }
            });
        });
    }

    // Perform search
    function performSearch(query) {
        if (!query || !query.trim()) {
            alert('Please enter a search query');
            return;
        }

        // Save to search history
        saveSearchHistory(query);

        // Redirect to search page
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }

    // Setup autocomplete
    function setupAutocomplete() {
        document.addEventListener('click', function(e) {
            // Close autocomplete if clicking outside
            if (!e.target.classList.contains('w3-input-search') && 
                !e.target.closest('.w3-autocomplete-container')) {
                hideAutocompleteSuggestions();
            }
        });
    }

    // Show autocomplete suggestions
    function showAutocompleteSuggestions(query, inputElement) {
        const suggestions = generateSuggestions(query);
        
        if (suggestions.length === 0) {
            hideAutocompleteSuggestions();
            return;
        }

        let container = inputElement.parentElement.querySelector('.w3-autocomplete-container');
        
        if (!container) {
            container = document.createElement('div');
            container.className = 'w3-autocomplete-container';
            inputElement.parentElement.appendChild(container);
        }

        const suggestionsHTML = suggestions.map(suggestion => `
            <div class="w3-autocomplete-item" onclick="SearchModule.selectSuggestion('${suggestion.title}')">
                <i class="fas fa-search"></i>
                <span>${highlightMatch(suggestion.title, query)}</span>
                <span class="w3-autocomplete-category">${suggestion.category}</span>
            </div>
        `).join('');

        container.innerHTML = suggestionsHTML;
        container.style.display = 'block';
    }

    // Hide autocomplete suggestions
    function hideAutocompleteSuggestions() {
        const containers = document.querySelectorAll('.w3-autocomplete-container');
        containers.forEach(container => {
            container.style.display = 'none';
        });
    }

    // Generate autocomplete suggestions
    function generateSuggestions(query) {
        const allContent = [
            // Data Science
            { title: 'Python Programming', category: 'Data Science', id: 'python' },
            { title: 'Machine Learning', category: 'Data Science', id: 'ml' },
            { title: 'Deep Learning', category: 'Data Science', id: 'dl' },
            { title: 'Natural Language Processing', category: 'Data Science', id: 'nlp' },
            { title: 'SQL & Databases', category: 'Data Science', id: 'sql' },
            { title: 'FastAPI', category: 'Data Science', id: 'fastapi' },
            { title: 'PyTorch', category: 'Data Science', id: 'pytorch' },
            { title: 'TensorFlow', category: 'Data Science', id: 'tensorflow' },
            { title: 'Transformers', category: 'Data Science', id: 'transformers' },
            { title: 'Reinforcement Learning', category: 'Data Science', id: 'rl' },
            { title: 'Computer Vision', category: 'Data Science', id: 'cnn' },
            { title: 'LangChain', category: 'Data Science', id: 'langchain' },
            { title: 'Mathematics for DS', category: 'Data Science', id: 'math' },
            // Cybersecurity
            { title: 'Cybersecurity Fundamentals', category: 'Cybersecurity', id: 'fundamentals' },
            { title: 'Network Security', category: 'Cybersecurity', id: 'network' },
            { title: 'Cryptography', category: 'Cybersecurity', id: 'cryptography' },
            { title: 'Ethical Hacking', category: 'Cybersecurity', id: 'ethics' },
            { title: 'Digital Forensics', category: 'Cybersecurity', id: 'forensics' },
            { title: 'Incident Response', category: 'Cybersecurity', id: 'incident' },
            { title: 'Malware Analysis', category: 'Cybersecurity', id: 'malware' },
            { title: 'SOC Operations', category: 'Cybersecurity', id: 'soc' },
            { title: 'SIEM Tools', category: 'Cybersecurity', id: 'siem' },
            { title: 'Penetration Testing', category: 'Cybersecurity', id: 'pentest' },
            { title: 'Web Application Security', category: 'Cybersecurity', id: 'webapp' },
            { title: 'Mobile Security', category: 'Cybersecurity', id: 'mobile' },
            { title: 'Cloud Security', category: 'Cybersecurity', id: 'cloud' },
            { title: 'Threat Intelligence', category: 'Cybersecurity', id: 'threat' },
            { title: 'IoT Security', category: 'Cybersecurity', id: 'iot' },
            { title: 'Compliance', category: 'Cybersecurity', id: 'compliance' }
        ];

        const queryLower = query.toLowerCase();
        return allContent
            .filter(item => item.title.toLowerCase().includes(queryLower))
            .slice(0, 8); // Limit to 8 suggestions
    }

    // Highlight matching text in suggestions
    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }

    // Select a suggestion
    function selectSuggestion(suggestion) {
        const input = document.querySelector('.w3-input-search');
        if (input) {
            input.value = suggestion;
            performSearch(suggestion);
        }
    }

    // Show recent searches
    function showRecentSearches(inputElement) {
        const recentSearches = getSearchHistory();
        
        if (recentSearches.length === 0) {
            return;
        }

        let container = inputElement.parentElement.querySelector('.w3-autocomplete-container');
        
        if (!container) {
            container = document.createElement('div');
            container.className = 'w3-autocomplete-container';
            inputElement.parentElement.appendChild(container);
        }

        const suggestionsHTML = `
            <div style="padding: 10px; font-size: 0.8rem; color: #999; font-weight: 600; text-transform: uppercase;">Recent Searches</div>
            ${recentSearches.slice(0, 5).map(search => `
                <div class="w3-autocomplete-item" onclick="SearchModule.selectSuggestion('${search}')">
                    <i class="fas fa-history"></i>
                    <span>${search}</span>
                </div>
            `).join('')}
        `;

        container.innerHTML = suggestionsHTML;
        container.style.display = 'block';
    }

    // Search history management
    function getSearchHistory() {
        const stored = localStorage.getItem('searchHistory');
        return stored ? JSON.parse(stored) : [];
    }

    function saveSearchHistory(query) {
        if (!query || query.length < 2) return;

        let history = getSearchHistory();
        
        // Remove duplicates
        history = history.filter(item => item.toLowerCase() !== query.toLowerCase());
        
        // Add to beginning
        history.unshift(query);
        
        // Keep only last 20 searches
        history = history.slice(0, 20);
        
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }

    // Public API
    return {
        init: init,
        selectSuggestion: selectSuggestion,
        performSearch: performSearch
    };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    SearchModule.init();
});
