document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("main");
    const numberOfBalls = 15;

    function createBlurBall() {
        const ball = document.createElement("span");
        ball.classList.add("blur-ball");

        ball.style.top = `${Math.random() * 100}%`;
        ball.style.left = `${Math.random() * 100}%`;

        container.appendChild(ball);

        animateBall(ball);
    }

    function animateBall(ball) {
        const randomDuration = Math.random() + 5;
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

    document.querySelector('main').style.transform = `translateY(${scrollPosition * 0.3}px)`;
    document.querySelector('.features').style.transform = `translateY(${scrollPosition * -0.5}px)`;
    document.querySelector('footer').style.transform = `translateY(${scrollPosition * -0.5}px)`;
  } else {
    document.querySelector('main').style.transform = 'translateY(0)';
    document.querySelector('.features').style.transform = 'translateY(0)';
    document.querySelector('footer').style.transform = 'translateY(0)';
  }

  requestAnimationFrame(smoothScroll);
}

smoothScroll();

  
