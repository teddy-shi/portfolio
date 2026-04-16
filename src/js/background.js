const observerOptions = {
    root: document.querySelector('.scroll-container'),
    threshold: 0.5 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            if (entry.target.classList.contains('light-view')) {
                document.body.classList.add('light-mode');
            } else {
                document.body.classList.remove('light-mode');
            }

            const navLinks = document.querySelectorAll('.footer-nav a');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.panel').forEach(panel => observer.observe(panel));