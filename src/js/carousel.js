document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('.carousel-3d-scene');
    const track = document.querySelector('.carousel-3d-track');
    const items = document.querySelectorAll('.carousel-3d-item');
    const nextBtn = document.querySelector('.next-3d');
    const prevBtn = document.querySelector('.prev-3d');

    const itemCount = items.length;
    let currRotation = 0;
    let radius = 0;
    let theta = 360 / itemCount;
    
    let autoPlayTimer = null;
    const TIMER_DURATION = 4000;

    function updateLayout() {
        if (items.length === 0) return;

        const itemWidth = items[0].offsetWidth; 

        const radiusMultiplier = 1.3; 
        
        radius = Math.round((itemWidth / 2) / Math.tan(Math.PI / itemCount)) * radiusMultiplier;

        items.forEach((item, i) => {
            item.style.transform = `rotateY(${theta * i}deg) translateZ(${radius}px)`;
        });

        rotateCarousel();
    }

    function rotateCarousel() {
        track.style.transform = `translateZ(${-radius}px) rotateY(${currRotation}deg)`;
    }

    function startTimer() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(() => {
            currRotation -= theta;
            rotateCarousel();
        }, TIMER_DURATION);
    }

    function resetTimer() {
        clearInterval(autoPlayTimer);
        startTimer();
    }

    updateLayout();
    startTimer();

    window.addEventListener('resize', updateLayout);

    if(nextBtn && prevBtn){
        nextBtn.addEventListener('click', () => {
            currRotation -= theta;
            rotateCarousel();
            resetTimer();
        });
        prevBtn.addEventListener('click', () => {
            currRotation += theta;
            rotateCarousel();
            resetTimer();
        });
    }

    let isDown = false;
    let startX;
    let currScrollX;

    scene.addEventListener('mousedown', (e) => {
        isDown = true;
        scene.classList.add('grabbing');
        startX = e.pageX - scene.offsetLeft;
        currScrollX = currRotation;
        clearInterval(autoPlayTimer);
    });

    window.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        scene.classList.remove('grabbing');
        startTimer();
    });

    scene.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scene.offsetLeft;
        const walk = (x - startX) * 0.4; 
        currRotation = currScrollX + walk;
        rotateCarousel();
    });
});