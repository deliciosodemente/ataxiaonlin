<Image
  src="https://picsum.photos/seed/mobiledance/400/300"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Description of the image"
/>
document.addEventListener('DOMContentLoaded', () => {
    // --- Intersection Observer for Fade-in Sections ---
    const sections = document.querySelectorAll('.section-fade-in');

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once the animation is triggered
                // observer.unobserve(entry.target);
            }
            // Optional: Uncomment below to fade out when scrolling out of view
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Smooth scroll for nav links ---
    // Note: `scroll-behavior: smooth;` in CSS handles most cases,
    // but this JS provides more control and potentially wider compatibility if needed.
    // Keeping it simple for now, relying on CSS.

    // --- Potential future enhancements ---
    // - Parallax effects on scroll
    // - More complex SVG animations
    // - Interactive elements (e.g., music player preview)
});

// Add mobile ad scroll behavior
const mobileAd = document.getElementById('mobile-ad');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;
    
    if (currentScrollPosition > lastScrollPosition) {
        // Scrolling down
        mobileAd.style.transform = 'translateY(100%)';
    } else {
        // Scrolling up
        mobileAd.style.transform = 'translateY(0)';
    }
    
    lastScrollPosition = currentScrollPosition;
    
    // Smooth transition
    mobileAd.style.transition = 'transform 0.3s ease-out';
});