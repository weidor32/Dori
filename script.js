/* ===== JAVASCRIPT - Makes the website interactive! ===== */

/* LOAD PAGE */
document.addEventListener('DOMContentLoaded', function() {
    loadUserSettings();
    loadSavedRatings();
    setupCommentButtons();
});

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
        } else if (post.classList.contains(category)) {
            // Show only posts that match the clicked category
            post.style.display = 'block';
        } else {
            // Hide posts that don't match
            post.style.display = 'none';
        }
    });
}

/* SEARCH FUNCTION - Filter posts by text */
function searchRatings(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    const posts = document.querySelectorAll('.post');
    
    posts.forEach(post => {
        // Get the post title and description
        const title = post.querySelector('h2').textContent.toLowerCase();
        const description = post.querySelector('.post-description').textContent.toLowerCase();
        const author = post.querySelector('.post-author').textContent.toLowerCase();
        
        // Show post if search term matches title, description, or author
        if (searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm) || author.includes(searchTerm)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

/* LIKE BUTTON FUNCTION - Toggles like when clicked */
function toggleLike(button) {
    const post = button.closest('.post');
    const postTitle = post.querySelector('h2').textContent;
    const postImage = post.querySelector('.post-image').src;
    const postRating = post.querySelector('.rating-value').textContent;
    
    // Check if already liked
    if (button.classList.contains('liked')) {
        // Unlike - remove the liked style
        button.classList.remove('liked');
        button.textContent = '❤️ Like';
        
        // Remove from liked posts
        removeLikedPost(postTitle);
    } else {
        // Like - add the liked style
        button.classList.add('liked');
        button.textContent = '❤️ Liked!';
        
        // Save to liked posts
        saveLikedPost({
            title: postTitle,
            image: postImage,
            rating: postRating,
            timestamp: new Date().toLocaleString()
        });
    }
}

/* SAVE LIKED POST */
function saveLikedPost(post) {
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    
    // Check if already in liked posts
    const exists = likedPosts.some(p => p.title === post.title);
    if (!exists) {
        likedPosts.unshift(post);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }
}

/* REMOVE LIKED POST */
function removeLikedPost(postTitle) {
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    likedPosts = likedPosts.filter(p => p.title !== postTitle);
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
}

/* TOGGLE COMMENT SECTION */
function toggleCommentSection(button) {
    const post = button.closest('.post');
    const commentsSection = post.querySelector('.comments-section');
    
    if (commentsSection.style.display === 'none') {
        commentsSection.style.display = 'block';
    } else {
        commentsSection.style.display = 'none';
    }
}

/* POST COMMENT */
function postComment(button) {
    const post = button.closest('.post');
    const commentsSection = post.querySelector('.comments-section');
    const commentInput = commentsSection.querySelector('.comment-input');
    const commentText = commentInput.value.trim();
    
    if (!commentText) {
        alert('❌ Please write a comment!');
        return;
    }
    
    // Get user profile
    const userProfile = {
        picture: localStorage.getItem('userProfilePicture') || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="30" r="20" fill="%23FFB6C1"/%3E%3Cellipse cx="50" cy="70" rx="30" ry="25" fill="%23FFB6C1"/%3E%3C/svg%3E',
        bio: localStorage.getItem('userAboutMe') || 'Doris'
    };
    
    // Create comment element
    const commentsList = commentsSection.querySelector('.comments-list');
    const comment = document.createElement('div');
    comment.className = 'comment-item';
    comment.innerHTML = `
        <div class="comment-header">
            <img src="${userProfile.picture}" alt="Avatar" class="comment-avatar">
            <div class="comment-info">
                <h4 class="comment-author">You</h4>
                <p class="comment-time">${new Date().toLocaleString()}</p>
            </div>
        </div>
        <p class="comment-text">${commentText}</p>
        <button class="delete-comment-btn" onclick="deleteComment(this)">🗑️ Delete</button>
    `;
    
    commentsList.appendChild(comment);
    commentInput.value = '';
}

/* DELETE COMMENT */
function deleteComment(button) {
    if (confirm('Are you sure you want to delete this comment?')) {
        button.closest('.comment-item').remove();
    }
}

/* LOAD SAVED RATINGS */
function loadSavedRatings() {
    const savedRatings = JSON.parse(localStorage.getItem('allRatings')) || [];
    
    if (savedRatings.length === 0) return;
    
    const feed = document.getElementById('feed');
    if (!feed) return;
    
    savedRatings.forEach(rating => {
        // Create category emoji
        let categoryEmoji = '📌';
        if (rating.category === 'movies-post') categoryEmoji = '🎬';
        else if (rating.category === 'books-post') categoryEmoji = '📚';
        else if (rating.category === 'food-post') categoryEmoji = '🍔';
        
        // Create post HTML
        const postHTML = `
            <div class="post ${rating.category}">
                <div class="post-header">
                    <img src="${rating.userProfile.picture}" alt="Avatar" class="avatar">
                    <div class="post-info">
                        <h3 class="post-author">You</h3>
                        <p class="post-category">${categoryEmoji} ${rating.category === 'movies-post' ? 'Movies' : rating.category === 'books-post' ? 'Books' : 'Food'}</p>
                    </div>
                </div>
                <img src="${rating.image}" alt="Post" class="post-image">
                <div class="post-content">
                    <h2>${rating.title}</h2>
                    <div class="rating">Rating: <span class="rating-value">${rating.rating}/10</span></div>
                    <p class="post-description">${rating.comments}</p>
                </div>
                
                <!-- AI COMMENTS SECTION -->
                <div class="ai-comments">
                    <h4>💭 Dori AI's Thoughts:</h4>
        `;
        
        // Add AI comments
        rating.aiComments.forEach(aiComment => {
            const postHTML2 = `
                    <div class="ai-comment">
                        <div class="ai-comment-header">
                            <span class="ai-badge">🤖 Dori AI</span>
                            <p class="ai-comment-time">${aiComment.timestamp}</p>
                        </div>
                        <p class="ai-comment-text">"${aiComment.text}"</p>
                    </div>
            `;
            postHTML += postHTML2;
        });
        
        postHTML += `
                </div>
                
                <div class="post-actions">
                    <button class="like-button" onclick="toggleLike(this)">❤️ Like</button>
                    <button class="comment-button" onclick="toggleCommentSection(this)">💬 Comment</button>
                </div>
                
                <div class="comments-section" style="display:none;">
                    <div class="comments-list"></div>
                    <div class="comment-input-area">
                        <input type="text" placeholder="Write a comment..." class="comment-input">
                        <button onclick="postComment(this)">Post</button>
                    </div>
                </div>
            </div>
        `;
        
        // Insert at the beginning of feed
        feed.insertAdjacentHTML('afterbegin', postHTML);
    });
}

/* SETUP COMMENT BUTTONS */
function setupCommentButtons() {
    const commentButtons = document.querySelectorAll('.comment-button');
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleCommentSection(this);
        });
    });
}

/* NAVIGATION FUNCTIONS */
function goToSettings() {
    window.location.href = 'settings.html';
}

function goToProfile() {
    window.location.href = 'profile.html';
}

function goToMakeRating() {
    window.location.href = 'make-rating.html';
}

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
