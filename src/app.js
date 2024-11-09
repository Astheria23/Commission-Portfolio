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


let lastScrollY = window.scrollY;
const navbar = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});

// Scroll-dependent horizontal scroll effect for banner
const bannerContent = document.querySelector('.banner-content');

window.addEventListener('scroll', () => {
    // Adjust the speed of the scrolling text here by changing the divisor
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

// Terminal text effect for tagline
const tagline = document.querySelector('.tagline');
const text = tagline.textContent;
tagline.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}
typeWriter();



