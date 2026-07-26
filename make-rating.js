/* ===== MAKE RATING JAVASCRIPT ===== */

// AI COMMENT TEMPLATES FOR DIFFERENT RATINGS
const aiCommentTemplates = {
    veryNegative: [
        "I completely agree with you on this one. That was really disappointing.",
        "Yeah, I felt the same way. There were so many better options out there.",
        "Wow, you captured exactly how I felt about this. Not worth the hype at all."
    ],
    negative: [
        "I see what you mean. It had some good moments, but overall it was just okay.",
        "Fair point! It wasn't terrible, but it definitely could have been better.",
        "I get your criticism. There were some redeeming qualities, but the negatives stood out."
    ],
    neutral: [
        "That's a fair take! It's hard to rate things in the middle sometimes.",
        "I think your rating is spot on. It had both pros and cons.",
        "You make a good point. It was an interesting experience overall."
    ],
    positive: [
        "I totally agree! This was definitely a highlight. Really enjoyed it.",
        "Yes! I felt the same way. It exceeded my expectations in so many ways.",
        "Great point! This one deserves all the praise. Definitely recommend it."
    ],
    veryPositive: [
        "Amazing! I couldn't agree more. This is one of the best I've experienced.",
        "Absolutely! This is a masterpiece. Everyone needs to see/read/try this.",
        "Perfect rating! This was absolutely incredible. Already can't wait for more."
    ]
};

// LOAD PAGE ON LOAD
document.addEventListener('DOMContentLoaded', function() {
    updateCommentsCharCount();
    const commentsInput = document.getElementById('rating-comments');
    if (commentsInput) {
        commentsInput.addEventListener('input', updateCommentsCharCount);
    }
});

// UPDATE COMMENTS CHARACTER COUNT
function updateCommentsCharCount() {
    const textArea = document.getElementById('rating-comments');
    const charCount = document.getElementById('comments-char-count');
    if (charCount && textArea) {
        charCount.textContent = textArea.value.length;
    }
}

// PREVIEW IMAGE
function previewRatingImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('rating-image-preview');
    
    if (file) {
        if (file.size > 5 * 1024 * 1024) {
            alert('❌ File too large! Please upload an image smaller than 5MB.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Rating Image">`;
        };
        reader.readAsDataURL(file);
    }
}

// UPDATE RATING DISPLAY
function updateRatingDisplay(value) {
    document.getElementById('rating-display').textContent = value + '/10';
}

// AUTO-DETECT CATEGORY FROM TITLE
function detectCategory(title) {
    title = title.toLowerCase();
    
    // Movies keywords
    const movieKeywords = ['movie', 'film', 'watch', 'cinema', 'director', 'actor', 'actress', 'marvel', 'disney', 'netflix', 'amazon', 'hbo', 'show', 'series', 'episode', 'season', 'ghibli', 'anime', 'horror', 'comedy', 'drama', 'action'];
    
    // Books keywords
    const bookKeywords = ['book', 'read', 'novel', 'author', 'chapter', 'story', 'series', 'fiction', 'mystery', 'romance', 'fantasy', 'sci-fi', 'science fiction', 'harry potter', 'hunger games', 'twilight', 'poem', 'poetry'];
    
    // Food keywords
    const foodKeywords = ['food', 'restaurant', 'pizza', 'burger', 'sushi', 'curry', 'pasta', 'noodles', 'dessert', 'cake', 'ice cream', 'coffee', 'tea', 'drink', 'meal', 'lunch', 'dinner', 'breakfast', 'snack', 'candy', 'chocolate', 'fruit', 'vegetable', 'salad'];
    
    let movieScore = 0, bookScore = 0, foodScore = 0;
    
    // Count keyword matches
    movieKeywords.forEach(keyword => {
        if (title.includes(keyword)) movieScore++;
    });
    
    bookKeywords.forEach(keyword => {
        if (title.includes(keyword)) bookScore++;
    });
    
    foodKeywords.forEach(keyword => {
        if (title.includes(keyword)) foodScore++;
    });
    
    // Return highest score category
    if (movieScore > bookScore && movieScore > foodScore && movieScore > 0) {
        return 'movies-post';
    } else if (bookScore > movieScore && bookScore > foodScore && bookScore > 0) {
        return 'books-post';
    } else if (foodScore > movieScore && foodScore > bookScore && foodScore > 0) {
        return 'food-post';
    }
    
    // Random default if no match
    const defaults = ['movies-post', 'books-post', 'food-post'];
    return defaults[Math.floor(Math.random() * defaults.length)];
}

// GET AI COMMENT BASED ON RATING
function generateAIComment(rating) {
    rating = parseInt(rating);
    let templates;
    
    if (rating >= 8) {
        templates = aiCommentTemplates.veryPositive;
    } else if (rating >= 5) {
        templates = aiCommentTemplates.positive;
    } else if (rating === 0) {
        templates = aiCommentTemplates.neutral;
    } else if (rating >= -5) {
        templates = aiCommentTemplates.negative;
    } else {
        templates = aiCommentTemplates.veryNegative;
    }
    
    // Return random comment from appropriate template
    return templates[Math.floor(Math.random() * templates.length)];
}

// SUBMIT RATING
function submitRating() {
    const title = document.getElementById('rating-title').value.trim();
    const category = document.getElementById('rating-category').value;
    const imageInput = document.getElementById('rating-image');
    const rating = document.getElementById('rating-score').value;
    const comments = document.getElementById('rating-comments').value.trim();
    
    // VALIDATION
    if (!title) {
        alert('❌ Please enter a title for your rating!');
        return;
    }
    
    if (!imageInput.files[0]) {
        alert('❌ Please upload an image!');
        return;
    }
    
    if (!comments) {
        alert('❌ Please write some comments about your rating!');
        return;
    }
    
    // READ IMAGE
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        
        // DETERMINE CATEGORY
        let finalCategory = category;
        if (!finalCategory) {
            finalCategory = detectCategory(title);
        }
        
        // GET USER PROFILE
        const userProfile = {
            picture: localStorage.getItem('userProfilePicture') || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="30" r="20" fill="%23FFB6C1"/%3E%3Cellipse cx="50" cy="70" rx="30" ry="25" fill="%23FFB6C1"/%3E%3C/svg%3E',
            bio: localStorage.getItem('userAboutMe') || 'Doris loves rating things!'
        };
        
        // GENERATE AI COMMENTS
        const aiComment1 = generateAIComment(rating);
        const aiComment2 = generateAIComment(rating);
        
        // CREATE NEW RATING OBJECT
        const newRating = {
            id: Date.now(),
            title: title,
            category: finalCategory,
            image: imageData,
            rating: rating,
            comments: comments,
            userProfile: userProfile,
            timestamp: new Date().toLocaleString(),
            likes: 0,
            liked: false,
            aiComments: [
                {
                    text: aiComment1,
                    author: 'Dori AI',
                    timestamp: new Date().toLocaleString()
                },
                {
                    text: aiComment2,
                    author: 'Dori AI',
                    timestamp: new Date().toLocaleString()
                }
            ],
            userComments: []
        };
        
        // GET EXISTING RATINGS
        let allRatings = JSON.parse(localStorage.getItem('allRatings')) || [];
        
        // ADD NEW RATING TO BEGINNING (so it appears at top)
        allRatings.unshift(newRating);
        
        // SAVE TO LOCAL STORAGE
        localStorage.setItem('allRatings', JSON.stringify(allRatings));
        
        // SUCCESS MESSAGE
        alert('✅ Rating posted successfully! Your post has been added to the feed.');
        
        // REDIRECT HOME
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    };
    
    reader.readAsDataURL(imageInput.files[0]);
}

// GO HOME
function goHome() {
    window.location.href = 'index.html';
}
