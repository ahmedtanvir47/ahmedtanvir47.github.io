// Set up the canvas
const canvas = document.createElement('canvas');
document.querySelector('#particles').appendChild(canvas);

// Define the resize function
function resize() {
  // Set the canvas size to match the window size
  canvas.width = window.innerWidth * 0.4;
  canvas.height = window.innerHeight * 0.2;

  // Define the positions of the vertical lines
  const linePositions = [];
  for (let i = 0; i < 11; i++) {
    linePositions.push(50 + i * (canvas.width - 100) / 10);
  }

  // Define the particle objects
  const particles = [];
  for (let i = 0; i < linePositions.length; i++) {
    particles.push({
      x: linePositions[i],
      y: canvas.height / 2,
      velocity: i === 0 || i === linePositions.length - 1 ? 0 : Math.random() * 2 - 1,
    });
  }

  // Return the line positions and particle objects
  return { linePositions, particles };
}

// Initialize the line positions and particles
let { linePositions, particles } = resize();

// Get the canvas context
const ctx = canvas.getContext('2d');

// Define the draw function
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the vertical lines
  ctx.strokeStyle = '#1b3442';
  ctx.lineWidth = 1;
  for (let i = 0; i < linePositions.length; i++) {
    const x = linePositions[i];
    if (i === 0 || i === linePositions.length - 1) {
      ctx.lineWidth = 1.5;
    } else {
      ctx.lineWidth = 0.2;
    }
    ctx.beginPath();
    ctx.moveTo(x, 50);
    ctx.lineTo(x, canvas.height - 50);
    ctx.stroke();
  }
  
  // Update and draw the particles
  ctx.fillStyle = '#1b3442';
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    if (particle.velocity !== 0) {
      particle.y += particle.velocity;
      if (particle.y < 65 || particle.y > canvas.height - 65) {
        particle.velocity = -particle.velocity;
      }
    }
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, 2.5 * canvas.width / 605, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  // Draw the lines connecting the particles
  ctx.strokeStyle = '#1b3442';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(particles[0].x, particles[0].y);
  for (let i = 1; i < particles.length; i++) {
    const particle = particles[i];
    ctx.lineTo(particle.x, particle.y);
  }
  ctx.stroke();
}

// Listen for the resize event
window.addEventListener('resize', () => {
  // Update the line positions and particles
  ({ linePositions, particles } = resize());
});

// Start the animation loop
setInterval(draw, 20);
