// Three.js Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
  // Check if Three.js is loaded
  if (typeof THREE === "undefined") {
    console.error("Three.js is not loaded");
    return;
  }

  // Initialize variables
  let renderer, scene, camera;
  let particles, positions, colors;
  let particleCount = 800;
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Check if particle canvas exists
  const particleCanvas = document.getElementById("particle-canvas");
  if (!particleCanvas) {
    console.error("Particle canvas element not found");
    return;
  }

  // Initialize scroll tracking
  let scrollY = window.scrollY;
  let scrollPercent = 0;

  // Create scene
  function init() {
    // Create renderer
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    particleCanvas.appendChild(renderer.domElement);

    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
    camera.position.z = 200;

    // Create particles
    createParticles();

    // Add event listeners
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("scroll", onScroll);

    // Start animation
    animate();
  }

  // Create particles with our new light colors
  function createParticles() {
    const geometry = new THREE.BufferGeometry();
    positions = new Float32Array(particleCount * 3);
    colors = new Float32Array(particleCount * 3);

    const color = new THREE.Color();

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Positions: random position in a sphere
      positions[i] = (Math.random() * 2 - 1) * 200;
      positions[i + 1] = (Math.random() * 2 - 1) * 200;
      positions[i + 2] = (Math.random() * 2 - 1) * 200;

      // Colors: use our light theme colors (green, blue, purple)
      const colorChoice = Math.floor(Math.random() * 3);
      if (colorChoice === 0) {
        color.setHex(0x16a34a); // Primary green
      } else if (colorChoice === 1) {
        color.setHex(0x0ea5e9); // Secondary blue
      } else {
        color.setHex(0x8b5cf6); // Accent purple
      }

      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.4, // More transparent for light theme
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  }

  // Handle window resize
  function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  // Handle scroll
  function onScroll() {
    scrollY = window.scrollY;

    // Calculate scroll percentage
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    scrollPercent = scrollY / (documentHeight - windowHeight);
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  // Render scene
  function render() {
    // Rotate based on scroll position
    particles.rotation.y = scrollPercent * Math.PI * 2;
    particles.rotation.x = scrollPercent * Math.PI * 0.5;

    // Scale based on scroll position
    const scale = 1 + scrollPercent * 0.5;
    particles.scale.set(scale, scale, scale);

    // Update positions for animation
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Create subtle movement
      positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.02;
      positions[i + 1] += Math.cos(Date.now() * 0.001 + i) * 0.02;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  // Start the scene
  try {
    init();
  } catch (error) {
    console.error("Error initializing Three.js:", error);
  }
});
