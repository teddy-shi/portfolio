const observerOptions = {
    root: document.querySelector('.scroll-container'),
    threshold: 0.5 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.setAttribute('aria-hidden', !entry.isIntersecting);

        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            if (entry.target.classList.contains('light-view')) {
                document.body.classList.add('light-mode');
            } else {
                document.body.classList.remove('light-mode');
            }

            document.querySelectorAll('.footer-nav a').forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.panel').forEach(panel => observer.observe(panel));