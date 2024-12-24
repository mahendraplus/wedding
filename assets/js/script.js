
// Shuffle and load images into the photo grid
const photoGrid = document.getElementById('photoGrid');
const totalImages = 40; // Total number of images
const imageArray = Array.from({ length: totalImages }, (_, i) => `./assets/img/bg/${i + 1}.jpg`);

function shuffleImages() {
    photoGrid.innerHTML = ''; // Clear the grid
    const shuffled = [...imageArray].sort(() => Math.random() - 0.5); // Shuffle array
    shuffled.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Photo ${src}`;
        photoGrid.appendChild(img);
    });
}

// Initial rendering
shuffleImages();

// Shuffle every 500ms
setInterval(() => {
    shuffleImages();
}, 500);

// Decrypt and display the name and message from the URL
function displayMessageFromURL() {
    const params = new URLSearchParams(window.location.search);
    const encryptedName = params.get('name');
    const encryptedMessage = params.get('message');
    const decodedName = encryptedName ? atob(encryptedName) : '';
    const decodedMessage = encryptedMessage ? atob(encryptedMessage) : '';

    if (decodedName) {
        const headerMessage = document.getElementById('headerMessage');
        const message = document.getElementById('message');
        headerMessage.textContent = `A special gift has been shared by ${decodedName}!`;
        if (decodedMessage) {
            message.textContent = decodedMessage;
        }
    }
}

// Call displayMessageFromURL function on load
displayMessageFromURL();

// Send Gift Button Logic
const sendBtn = document.getElementById('sendBtn');
const shareModal = document.getElementById('shareModal');
const closeModal = document.getElementById('closeModal');
const submitShareName = document.getElementById('submitShareName');
const shareUserName = document.getElementById('shareUserName');
const shareMessage = document.getElementById('shareMessage');

// Open the modal when the Send Gift button is clicked
sendBtn.addEventListener('click', () => {
    shareModal.style.display = 'flex';
});

// Close the modal when the close button is clicked
closeModal.addEventListener('click', () => {
    shareModal.style.display = 'none';
});

// Handle name and message submission and create share link
submitShareName.addEventListener('click', () => {
    const userName = shareUserName.value.trim();
    const messageContent = shareMessage.value.trim();

    if (userName && messageContent) {
        // Encrypt name and message (Base64 encoding)
        const encryptedName = btoa(userName);
        const encryptedMessage = btoa(messageContent);
        const shareLink = `${window.location.origin}${window.location.pathname}?share=1&name=${encryptedName}&message=${encryptedMessage}`;

        // Try the Web Share API for supported mobile browsers
        if (navigator.share) {
            navigator.share({
                title: 'Gift Share',
                text: `A special gift has been shared by ${userName}!`,
                url: shareLink
            }).then(() => {
                console.log('Share was successful');
            }).catch((error) => {
                console.log('Error sharing:', error);
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            copyToClipboard(shareLink);
            alert('Link copied to clipboard! You can now paste it anywhere to share.');
        }

        // Close the modal after sharing
        shareModal.style.display = 'none';
    } else {
        alert('Please enter both your name and message.');
    }
});

// Function to copy the link to clipboard
function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

const playButton = document.getElementById('playButton');
const audioPlayer = document.getElementById('audioPlayer');

// Attempt to autoplay when the page loads
window.onload = () => {
    audioPlayer.play().catch(() => {
        console.log("Autoplay blocked by browser. User interaction required.");
    });
};

// Play or pause the audio and toggle button appearance
playButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.textContent = 'Pause';
        playButton.classList.add('playing');
    } else {
        audioPlayer.pause();
        playButton.textContent = 'Play';
        playButton.classList.remove('playing');
    }
});
