/* ===== PROFILE JAVASCRIPT ===== */

// LOAD PROFILE ON PAGE LOAD
document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    loadLikedPosts();
    updateCharacterCount();
});

// UPDATE CHARACTER COUNT
function updateCharacterCount() {
    const textArea = document.getElementById('about-me-input');
    const charCount = document.getElementById('char-count');
    charCount.textContent = textArea.value.length;
}

// LISTEN FOR CHANGES IN TEXTAREA
document.addEventListener('DOMContentLoaded', function() {
    const textArea = document.getElementById('about-me-input');
    if (textArea) {
        textArea.addEventListener('input', updateCharacterCount);
    }
});

// UPDATE PROFILE PICTURE
function updateProfilePicture(event) {
    const file = event.target.files[0];
    
    if (file) {
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('❌ File too large! Please upload an image smaller than 5MB.');
            return;
        }
        
        // Read file and display
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-picture').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// SAVE PROFILE TO LOCAL STORAGE
function saveProfile() {
    const profilePicture = document.getElementById('profile-picture').src;
    const aboutMe = document.getElementById('about-me-input').value;
    
    // Save to local storage
    localStorage.setItem('userProfilePicture', profilePicture);
    localStorage.setItem('userAboutMe', aboutMe);
    
    alert('✅ Profile saved! Your profile info is now visible on your ratings.');
}

// LOAD PROFILE FROM LOCAL STORAGE
function loadProfile() {
    const savedPicture = localStorage.getItem('userProfilePicture');
    const savedAboutMe = localStorage.getItem('userAboutMe');
    
    if (savedPicture) {
        document.getElementById('profile-picture').src = savedPicture;
    }
    
    if (savedAboutMe) {
        document.getElementById('about-me-input').value = savedAboutMe;
        updateCharacterCount();
    }
}

// LOAD LIKED POSTS
function loadLikedPosts() {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    const container = document.getElementById('liked-posts-container');
    
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    if (likedPosts.length === 0) {
        container.innerHTML = '<p class="no-liked-posts">You haven\'t liked any posts yet! 💔</p>';
        return;
    }
    
    // Add each liked post
    likedPosts.forEach((post, index) => {
        const likedPostHTML = `
            <div class="liked-post-item">
                <img src="${post.image}" alt="${post.title}" class="liked-post-image">
                <div class="liked-post-info">
                    <h4 class="liked-post-title">${post.title}</h4>
                    <p class="liked-post-rating">⭐ ${post.rating}</p>
                    <p class="liked-post-time">Liked: ${post.timestamp}</p>
                    <button class="unlike-btn" onclick="removeLikedPostFromProfile(${index})">💔 Unlike</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', likedPostHTML);
    });
}

// REMOVE LIKED POST FROM PROFILE
function removeLikedPostFromProfile(index) {
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    
    if (confirm('Remove this from your liked posts?')) {
        likedPosts.splice(index, 1);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        loadLikedPosts();
    }
}

// GO HOME
function goHome() {
    window.location.href = 'index.html';
}

// GO TO MAKE RATING
function goToMakeRating() {
    window.location.href = 'make-rating.html';
}
