document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".main");
    const numberOfBalls = 50; //KKKKK

    function createBlurBall() {
        const ball = document.createElement("div");
        ball.classList.add("blur-ball");

        ball.style.top = `${Math.random() * 100}%`;
        ball.style.left = `${Math.random() * 100}%`;

        container.appendChild(ball);

        animateBall(ball);
    }

    function animateBall(ball) {
        const randomDuration = Math.random() * 1 + 5; 
        const randomDelay = Math.random() * 5; 

        ball.style.animation = `moveBlur ${randomDuration}s infinite alternate ease-in-out ${randomDelay}s`;

        const styleSheet = document.styleSheets[0];
        const keyframes = `
            @keyframes moveBlur {
                0% { transform: translate(0, 0); }
                50% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); }
                100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); }
            }
        `;
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }

    function handleMouseMove(event) {
        const balls = document.querySelectorAll(".blur-ball");
        balls.forEach((ball) => {
            const ballRect = ball.getBoundingClientRect();
            const ballCenterX = ballRect.left + ballRect.width / 2;
            const ballCenterY = ballRect.top + ballRect.height / 2;

            const distance = Math.sqrt(
                Math.pow(event.clientX - ballCenterX, 2) + Math.pow(event.clientY - ballCenterY, 2)
            );

            
            if (distance <= 200) {
                ball.classList.add('brilhante');
            } else {
                ball.classList.remove('brilhante');
            }
        });
    }

    for (let i = 0; i < numberOfBalls; i++) {
        createBlurBall();
    }

    document.addEventListener("mousemove", handleMouseMove);
});

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


let scrollPosition = 0;
let targetScrollPosition = 0;
let ease = 0.2;

const mobileBreakpoint = 768;

window.addEventListener('scroll', function() {
  if (window.innerWidth >= mobileBreakpoint) {
    targetScrollPosition = window.scrollY;
  }
});

function smoothScroll() {
  if (window.innerWidth >= mobileBreakpoint) {
    scrollPosition += (targetScrollPosition - scrollPosition) * ease;

    document.querySelector('.main').style.transform = `translateY(${scrollPosition * 0.3}px)`;
    document.querySelector('.features').style.transform = `translateY(${scrollPosition * -0.5}px)`;
    document.querySelector('footer').style.transform = `translateY(${scrollPosition * -0.5}px)`;
  } else {
    document.querySelector('.main').style.transform = 'translateY(0)';
    document.querySelector('.features').style.transform = 'translateY(0)';
    document.querySelector('footer').style.transform = 'translateY(0)';
  }

  requestAnimationFrame(smoothScroll);
}

smoothScroll();

  
