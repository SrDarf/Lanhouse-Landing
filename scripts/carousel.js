document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.card-carousel');
    const cards = Array.from(carousel.querySelectorAll('.card'));
    const progressBar = document.querySelector('.progress-bar');
    const autoRotateDuration = 6000;
    let autoRotateInterval;
    let progressInterval;
    let progress = 0;

    function setActiveCard(clickedCard) {
        if (clickedCard.classList.contains('active')) return;

        cards.forEach((card, index) => {
            card.classList.remove('active');
            card.style.zIndex = cards.length - Math.abs(cards.indexOf(clickedCard) - index);

            if (card === clickedCard) {
                card.style.transform = 'translateX(0) scale(1) rotateY(0)';
            } else if (cards.indexOf(card) < cards.indexOf(clickedCard)) {
                card.style.transform = 'translateX(-110%) scale(0.8) rotateY(-10deg)';
            } else {
                card.style.transform = 'translateX(110%) scale(0.8) rotateY(10deg)';
            }
        });

        clickedCard.classList.add('active');
        setTimeout(() => {
            clickedCard.style.zIndex = cards.length;
        }, 300);
    }

    function updateProgressBar() {
        progress += 0.04 + (100 / (autoRotateDuration / 100));
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            progress = 0;
            progressBar.style.width = '0%';
        }
    }

    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            const activeCard = carousel.querySelector('.card.active');
            const nextCard = activeCard.nextElementSibling || cards[0];
            setActiveCard(nextCard);
            progress = 0;
        }, autoRotateDuration);

        progressInterval = setInterval(updateProgressBar, 100);
    }

    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        clearInterval(progressInterval);
        progress = 0;
        progressBar.style.width = '0%';
        startAutoRotate();
    }

    carousel.addEventListener('click', (event) => {
        const clickedCard = event.target.closest('.card');
        if (clickedCard) {
            setActiveCard(clickedCard);
            resetAutoRotate();
        }
    });

    setActiveCard(cards[1]);
    startAutoRotate();
});