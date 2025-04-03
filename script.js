// Get the canvas and context
const canvas = document.getElementById("doodleCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Arrays for bouncing balls, doodle curls, and mouse trail
let balls = [];
let curls = [];
let trail = [];
let mouse = { x: null, y: null, moving: false };

// List of "Hello!" in different languages
const greetings = [
    "Hello!", "Hola!", "Bonjour!", "Hallo!", "Ciao!", "Olá!", "Привет!",
    "नमस्ते!", "こんにちは!", "안녕하세요!", "你好!", "Merhaba!", "Salam!", 
    "Jambo!", "Shalom!", "Hej!", "Hei!", "Ahoy!", "Aloha!", "Selam!", 
    "Zdravo!", "Γειά σου!"
];

let greetingIndex = 0;
let charIndex = 0;
let isTyping = true;
const greetingElement = document.getElementById("greetingText");

greetingElement.textContent = "|"; // Start with just the cursor

function typeEffect() {
    const currentWord = greetings[greetingIndex];

    if (isTyping) {
        greetingElement.textContent = currentWord.slice(0, charIndex) + "|";
        charIndex++;

        if (charIndex > currentWord.length) {
            isTyping = false;
            setTimeout(() => {
                charIndex--;
                typeEffect();
            }, 1000); // Hold full text for 1 second before deletion
        } else {
            setTimeout(typeEffect, 100); // Typing speed (0.1s per letter)
        }
    } else {
        if (charIndex > 0) {
            charIndex--;
            greetingElement.textContent = currentWord.slice(0, charIndex) + "|";
            setTimeout(typeEffect, 100); // Deleting speed (0.1s per letter)
        } else {
            isTyping = true;
            greetingIndex = (greetingIndex + 1) % greetings.length;
            setTimeout(typeEffect, 100); // Restart typing next word
        }
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Ball Class
class Ball {
    constructor(x, y, size, color, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = (Math.random() - 0.5) * speed * 2.16; // Increased speed by 20%
        this.speedY = (Math.random() - 0.5) * speed * 2.16;
    }

    update() {
        if (mouse.x !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                let force = mouse.moving ? -0.05 : 0.02;
                this.speedX += dx * force;
                this.speedY += dy * force;
            }
        }

        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x - this.size < 0 || this.x + this.size > canvas.width) this.speedX *= -1;
        if (this.y - this.size < 0 || this.y + this.size > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Initialize bouncing elements
function init() {
    balls = [];

    for (let i = 0; i < 36; i++) { // Increased number of balls by 20%
        let size = Math.random() * 6 + 3;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speed = Math.random() * 1.5 + 0.5;
        let color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        balls.push(new Ball(x, y, size, color, speed));
    }
}


// Animate everything
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.update();
        ball.draw();
    });

    requestAnimationFrame(animate);
}



// Handle mouse movement
canvas.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.moving = true;
});

let mouseTimer;
canvas.addEventListener("mousemove", () => {
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
        mouse.moving = false;
    }, 100);
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

document.addEventListener("DOMContentLoaded", () => {
    init();
    animate();
    typeEffect();
});
// Initialize the canvas and start the animation
