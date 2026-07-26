/* ===== JAVASCRIPT - Makes the website interactive! ===== */

/* FILTER FUNCTION - Shows/hides posts by category */
function filterCategory(category) {
    // Get all posts from the page
    const posts = document.querySelectorAll('.post');
    
    // Get all tab buttons
    const buttons = document.querySelectorAll('.tab-button');
    
    // Update active button styling
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Show/hide posts based on category
    posts.forEach(post => {
        if (category === 'all') {
            // Show all posts
            post.style.display = 'block';
        } else if (post.classList.contains(category + '-post')) {
            // Show only posts that match the clicked category
            post.style.display = 'block';
        } else {
            // Hide posts that don't match
            post.style.display = 'none';
        }
    });
}

/* LIKE BUTTON FUNCTION - Toggles like when clicked */
function toggleLike(button) {
    // Check if already liked
    if (button.classList.contains('liked')) {
        // Unlike - remove the liked style
        button.classList.remove('liked');
        button.textContent = '❤️ Like';
    } else {
        // Like - add the liked style
        button.classList.add('liked');
        button.textContent = '❤️ Liked!';
    }
}

/* SEARCH FUNCTION - Filter posts by text */
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar');
    
    if (searchBar) {
        searchBar.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const posts = document.querySelectorAll('.post');
            
            posts.forEach(post => {
                // Get the post title and description
                const title = post.querySelector('h2').textContent.toLowerCase();
                const description = post.querySelector('.post-description').textContent.toLowerCase();
                const author = post.querySelector('.post-author').textContent.toLowerCase();
                
                // Show post if search term matches title, description, or author
                if (title.includes(searchTerm) || description.includes(searchTerm) || author.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }
    
    // LOAD SAVED SETTINGS
    loadUserSettings();
});

/* SETTINGS & ACCOUNT BUTTONS - Opens settings and account pages */
document.addEventListener('DOMContentLoaded', function() {
    const settingsIcon = document.querySelector('.settings-icon');
    const accountIcon = document.querySelector('.account-icon');
    
    if (settingsIcon) {
        settingsIcon.addEventListener('click', function() {
            window.location.href = 'settings.html';
        });
    }
    
    if (accountIcon) {
        accountIcon.addEventListener('click', function() {
            alert('Your profile page coming soon! 👤');
        });
    }
});

/* LOAD USER SETTINGS - Apply saved brightness and backdrop */
function loadUserSettings() {
    // Load brightness
    const savedBrightness = localStorage.getItem('brightness');
    if (savedBrightness) {
        document.body.style.filter = `brightness(${savedBrightness}%)`;
    }
    
    // Load backdrop
    const savedBackdrop = localStorage.getItem('backdrop');
    if (savedBackdrop) {
        document.body.style.backgroundImage = `url('${savedBackdrop}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
    }
}
