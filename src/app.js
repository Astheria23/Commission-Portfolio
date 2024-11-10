// Register GSAP's ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

// Smooth scrolling with GSAP
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        gsap.to(window, { 
            duration: 1, 
            scrollTo: target, 
            ease: "power2.inOut" 
        });
    });
});

// Navbar hide/show on scroll
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});

// Scroll-dependent horizontal scroll effect for banner
const bannerContent = document.querySelector('.banner-content');

window.addEventListener('scroll', () => {
    const scrollSpeed = window.scrollY / 2;
    bannerContent.style.transform = `translateX(-${scrollSpeed}px)`;
});

// Intersection Observer for animations
const sections = document.querySelectorAll('[data-section]');
const options = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.project-category, .about-container').forEach(el => {
                el.classList.add('visible');
            });
        }
    });
}, options);

sections.forEach(section => observer.observe(section));

// Particle background
function createParticles() {
    const particleContainer = document.getElementById('particle-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = Math.random() > 0.5 ? 'var(--neon-orange)' : 'var(--neon-blue)';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random();
        particle.style.animation = `float ${5 + Math.random() * 10}s linear infinite`;
        particleContainer.appendChild(particle);
    }
}

createParticles();

// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// Project item hover effects
const projectItems = document.querySelectorAll('.project-item');

function updatePreviewPosition(e, preview) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    preview.style.left = `${x}px`;
    preview.style.top = `${y}px`;
    preview.style.transform = 'translate(-50%, -50%)';
}

projectItems.forEach(item => {
    const preview = item.querySelector('.project-preview');
    const imageUrl = item.getAttribute('data-image');
    
    preview.style.backgroundImage = `url(${imageUrl})`;
    
    item.addEventListener('mouseenter', () => {
        preview.style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', () => {
        preview.style.opacity = '0';
    });
    
    item.addEventListener('mousemove', (e) => {
        updatePreviewPosition(e, preview);
    });
});

// Modal functionality
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalStatus = document.getElementById("modal-status");
const modalPreview = document.getElementById("modal-preview");
const closeModal = document.querySelector(".close");
const modalNoise = document.getElementById("modal-noise");

// Open modal with noise effect
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h4').innerText;
        const status = item.querySelector('.project-header span:last-child').innerText;
        const previewImage = item.getAttribute('data-image');

        // Create a temporary image to get the natural dimensions
        const tempImg = new Image();
        tempImg.src = previewImage;

        tempImg.onload = () => {
            // Set modal content
            modalTitle.innerText = title;
            modalStatus.innerText = status;
            modalPreview.style.backgroundImage = `url(${previewImage})`;

            // Apply original dimensions to modal preview
            modalPreview.style.width = `${tempImg.naturalWidth}px`;
            modalPreview.style.height = `${tempImg.naturalHeight}px`;

            // Show the modal with noise background
            modal.style.display = "flex";
            modalNoise.style.display = "block"; // Show noise background

            // Reset glitch animation
            modal.querySelector('.modal-content').style.animation = 'none';
            setTimeout(() => {
                modal.querySelector('.modal-content').style.animation = '';
            }, 10);
        };
    });
});

// Close modal and hide noise effect
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
    modalNoise.style.display = "none"; // Hide noise background
});

// Close modal and noise on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        modalNoise.style.display = "none"; // Hide noise background
    }
});

// Typing effect for tagline
const tagline = document.querySelector('.tagline');
const text = tagline.textContent;
tagline.textContent = '';

function typeWriter(text, i = 0) {
    if (i < text.length) {
        tagline.textContent += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 100);
    }
}

typeWriter(text);

// GSAP animations
gsap.from('.title', {
    duration: 1.5,
    opacity: 0,
    y: 50,
    ease: 'power3.out',
    delay: 0.5
});

gsap.from('.portrait', {
    duration: 1.5,
    opacity: 0,
    scale: 0.8,
    ease: 'power3.out',
    delay: 1
});

// Timer functionality
const timerElement = document.getElementById('timer');
let seconds = 0;
let minutes = 0;
let hours = 0;

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    timerElement.textContent = 
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
        (seconds > 9 ? seconds : "0" + seconds);
}

setInterval(updateTimer, 1000);

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalPreview = document.getElementById('modal-preview');
    const closeModal = document.querySelector('.close');
    const modalNoise = document.getElementById('modal-noise');
    const prevButton = document.querySelector('.modal-prev');
    const nextButton = document.querySelector('.modal-next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;

    function openModal(index) {
        const item = galleryItems[index];
        const imageUrl = item.getAttribute('data-image');
        const modalPreview = document.getElementById('modal-preview');
        modalPreview.src = imageUrl;
        modalPreview.alt = `Illustration ${index + 1}`;
        modal.style.display = 'flex';
        modalNoise.style.display = 'block';
        currentIndex = index;
    }

    function closeModalHandler() {
        modal.style.display = 'none';
        modalNoise.style.display = 'none';
    }

    function navigateModal(direction) {
        currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
        openModal(currentIndex);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
    });

    closeModal.addEventListener('click', closeModalHandler);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModalHandler();
    });

    prevButton.addEventListener('click', () => navigateModal(-1));
    nextButton.addEventListener('click', () => navigateModal(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') navigateModal(-1);
            if (e.key === 'ArrowRight') navigateModal(1);
            if (e.key === 'Escape') closeModalHandler();
        }
    });
});


// Skeleton loader functionality
document.addEventListener('DOMContentLoaded', () => {
    const skeletonElements = document.querySelectorAll('.skeleton, .skeleton-text');
    const portraitImg = new Image();
    portraitImg.src = './asset/main-profile/IMG_0485.png';

    portraitImg.onload = () => {
        setTimeout(() => {
            skeletonElements.forEach(element => {
                element.classList.remove('skeleton', 'skeleton-text');
            });

            const portraitContainer = document.querySelector('.portrait-container');
            portraitContainer.innerHTML = `<img src="${portraitImg.src}" alt="Digital portrait" class="portrait">`;

            // Trigger animations after content is loaded
            gsap.from('.title', {
                duration: 1.5,
                opacity: 0,
                y: 50,
                ease: 'power3.out',
                delay: 0.5
            });

            gsap.from('.portrait', {
                duration: 1.5,
                opacity: 0,
                scale: 0.8,
                ease: 'power3.out',
                delay: 1
            });

            // Initialize other animations and functionalities
            initializeWebsite();
        }, 1500); // Simulate a minimum loading time of 1.5 seconds
    };
});

function initializeWebsite() {
    createParticles();
}
