document.addEventListener("DOMContentLoaded", () => {
    const panels = document.querySelectorAll(".panel");
    const navLinks = document.querySelectorAll(".footer-nav a");
    const navIndicator = document.querySelector(".nav-indicator");

    const sectionRatios = {};

    const observerOptions = {
        root: null,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute('id');
            sectionRatios[id] = entry.intersectionRatio;

            if (entry.intersectionRatio > 0.2) {
                entry.target.classList.add("is-visible");
            }
        });

        let winner = null;
        let maxRatio = -1;

        for (const id in sectionRatios) {
            if (sectionRatios[id] > maxRatio) {
                maxRatio = sectionRatios[id];
                winner = id;
            }
        }

        if (winner) {
            const winningElement = document.getElementById(winner);
            updateTheme(winningElement);
        }
    }, observerOptions);

    function updateTheme(target) {
        const id = target.getAttribute("id");
        const isDark = target.classList.contains("dark-view");

        document.body.style.backgroundColor = isDark ? "#121212" : "#f4f4f4";
        document.body.style.color = isDark ? "#f4f4f4" : "#121212";

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });

        if (navIndicator) {
            navIndicator.textContent = id.toUpperCase();
        }
    }

    panels.forEach((panel) => observer.observe(panel));
});