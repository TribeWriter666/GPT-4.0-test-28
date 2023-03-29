const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const simplex = new SimplexNoise();

const particleCount = 5000;
const particles = [];

function createParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      life: Math.random(),
    });
  }
}

createParticles();

function draw() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const particle of particles) {
    const angle = simplex.noise3D(particle.x * 0.01, particle.y * 0.01, particle.life * 0.1) * Math.PI * 2;
    const speed = 1;

    particle.x += Math.cos(angle) * speed;
    particle.y += Math.sin(angle) * speed;
    particle.life += 0.001;

    if (particle.x < 0) particle.x = canvas.width;
    if (particle.x > canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = canvas.height;
    if (particle.y > canvas.height) particle.y = 0;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();
