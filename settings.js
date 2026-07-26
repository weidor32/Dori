/* ===== SETTINGS JAVASCRIPT ===== */
/* Handles brightness control and backdrop upload */

// LOAD SETTINGS WHEN PAGE LOADS
document.addEventListener('DOMContentLoaded', function() {
    loadBrightness();
    loadBackdrop();
});

/* ===== BRIGHTNESS FUNCTIONS ===== */

// UPDATE BRIGHTNESS IN REAL-TIME
function updateBrightness(value) {
    // Apply brightness filter to the entire page
    document.body.style.filter = `brightness(${value}%)`;
    
    // Update the display value
    document.getElementById('brightness-value').textContent = value + '%';
    
    // Update preview box
    const preview = document.getElementById('brightness-preview');
    preview.style.opacity = value / 100;
}

// SAVE BRIGHTNESS TO LOCAL STORAGE
function saveBrightness() {
    const brightnessValue = document.getElementById('brightness-slider').value;
    
    // Save to browser's local storage (remembers even after refresh!)
    localStorage.setItem('brightness', brightnessValue);
    
    // Show success message
    alert('✅ Brightness saved! It will remember your preference.');
}

// LOAD SAVED BRIGHTNESS
function loadBrightness() {
    // Check if brightness was saved before
    const savedBrightness = localStorage.getItem('brightness');
    
    if (savedBrightness) {
        // Apply saved brightness
        document.getElementById('brightness-slider').value = savedBrightness;
        updateBrightness(savedBrightness);
    }
}

/* ===== BACKDROP FUNCTIONS ===== */

// PREVIEW BACKDROP BEFORE UPLOADING
function previewBackdrop(event) {
    const file = event.target.files[0];
    
    // Check if a file was selected
    if (file) {
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('❌ File too large! Please upload an image smaller than 5MB.');
            return;
        }
        
        // Read the file and show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('backdrop-preview');
            preview.style.backgroundImage = `url('${e.target.result}')`;
            preview.innerHTML = ''; // Remove "No image selected" text
        };
        reader.readAsDataURL(file);
    }
}

// SAVE BACKDROP TO LOCAL STORAGE
function saveBackdrop() {
    const fileInput = document.getElementById('backdrop-upload');
    
    // Check if a file was selected
    if (!fileInput.files[0]) {
        alert('❌ Please select an image first!');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        // Save image data to local storage
        localStorage.setItem('backdrop', e.target.result);
        
        // Apply backdrop to the main page
        document.body.style.backgroundImage = `url('${e.target.result}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        
        alert('✅ Backdrop saved! Your new background is now active.');
    };
    
    reader.readAsDataURL(file);
}

// LOAD SAVED BACKDROP
function loadBackdrop() {
    // Check if backdrop was saved before
    const savedBackdrop = localStorage.getItem('backdrop');
    
    if (savedBackdrop) {
        // Apply saved backdrop to body
        document.body.style.backgroundImage = `url('${savedBackdrop}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        
        // Show preview
        const preview = document.getElementById('backdrop-preview');
        preview.style.backgroundImage = `url('${savedBackdrop}')`;
        preview.innerHTML = '';
    }
}

// RESET BACKDROP TO DEFAULT
function resetBackdrop() {
    // Remove saved backdrop from local storage
    localStorage.removeItem('backdrop');
    
    // Reset background to gradient
    document.body.style.background = 'linear-gradient(135deg, #FFE5D9 0%, #FFD4E5 50%, #E5D4FF 100%)';
    document.body.style.backgroundImage = 'none';
    
    // Clear preview
    const preview = document.getElementById('backdrop-preview');
    preview.style.backgroundImage = 'none';
    preview.innerHTML = '<p class="no-image-text">No image selected yet</p>';
    
    // Clear file input
    document.getElementById('backdrop-upload').value = '';
    
    alert('✅ Backdrop reset to default!');
}

/* ===== NAVIGATION ===== */

// GO BACK TO HOME PAGE
function goHome() {
    // Navigate back to index.html
    window.location.href = 'index.html';
}
