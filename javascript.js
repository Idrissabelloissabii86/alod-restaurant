// Header

const header = document.getElementById('main-header');
const menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('change', () => {
    if (menuBtn.checked) {
        header.classList.add('header-expanded');
    } else {
        header.classList.remove('header-expanded');
    }
});

// animation title de la section hero

const text = "Découvrez l'authenticité de l'Afrique à chaque bouchée";
const container = document.getElementById('hero-title');

text.split(" ").forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.className = 'inline-block opacity-0 translate-y-4 transition-all duration-700 ease-out';
    span.style.transitionDelay = `${index * 120}ms`;
    container.appendChild(span);
});

// Déclenchement de l'animation après le chargement du DOM
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('#hero-title span').forEach(el => {
            el.classList.remove('opacity-0', 'translate-y-4');
            el.classList.add('opacity-100', 'translate-y-0');
        });
    }, 100);
});

// Comment carousel

{
    const track = document.getElementById('testiTrack');
    const nextBtn = document.getElementById('testiNextBtn');
    const prevBtn = document.getElementById('testiPrevBtn');

    // On récupère les cartes originales AVANT le clonage
    const originalCards = Array.from(track.children);
    let currentIndex = originalCards.length;
    let isTransitioning = false;
    let autoPlayInterval;

    function setupClones() {
        // Cloner les cartes pour l'effet infini
        const firstClones = originalCards.map(card => card.cloneNode(true));
        const lastClones = originalCards.map(card => card.cloneNode(true));

        lastClones.forEach(clone => track.insertBefore(clone, track.firstChild));
        firstClones.forEach(clone => track.appendChild(clone));

        // Positionner au début de la série originale sans animation
        requestAnimationFrame(() => {
            updatePosition(false);
        });
    }

    function updatePosition(animate = true) {
        // Calcul dynamique de la largeur d'une carte + le gap
        const gap = 16; // correspond à gap-4 (1rem)
        const cardWidth = originalCards[0].offsetWidth + gap;

        track.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function moveNext() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updatePosition();

        track.addEventListener('transitionend', function handleEnd() {
            if (currentIndex >= originalCards.length * 2) {
                track.style.transition = "none";
                currentIndex = originalCards.length;
                updatePosition(false);
            }
            isTransitioning = false;
            track.removeEventListener('transitionend', handleEnd);
        });
    }

    function movePrev() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updatePosition();

        track.addEventListener('transitionend', function handleEnd() {
            if (currentIndex <= originalCards.length - 1) {
                track.style.transition = "none";
                currentIndex = originalCards.length * 2 - 1;
                updatePosition(false);
            }
            isTransitioning = false;
            track.removeEventListener('transitionend', handleEnd);
        });
    }

    function startAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(moveNext, 5000);
    }

    // Lancement
    setupClones();
    startAutoPlay();

    nextBtn.addEventListener('click', () => { moveNext(); startAutoPlay(); });
    prevBtn.addEventListener('click', () => { movePrev(); startAutoPlay(); });

    // Important : Recalculer la position si on tourne le téléphone ou redimensionne
    window.addEventListener('resize', () => {
        updatePosition(false);
    });
}


