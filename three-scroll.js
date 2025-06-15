// Enhanced Three.js Scroll Animation with varied shapes and colors
document.addEventListener("DOMContentLoaded", function () {
  // Check if Three.js is loaded
  if (typeof THREE === "undefined") {
    console.error("Three.js is not loaded");
    return;
  }

  // Initialize variables
  let renderer, scene, camera;
  let particles,
    floatingShapes = [];
  let particleCount = 1200; // Increased particle count
  let width = window.innerWidth;
  let height = window.innerHeight;
  let mouseX = 0,
    mouseY = 0;
  let targetMouseX = 0,
    targetMouseY = 0;

  // Check if particle canvas exists
  const particleCanvas = document.getElementById("particle-canvas");
  if (!particleCanvas) {
    console.error("Particle canvas element not found");
    return;
  }

  // Initialize scroll tracking
  let scrollY = window.scrollY;
  let scrollPercent = 0;

  // Track mouse position for interactive effects
  document.addEventListener("mousemove", function (e) {
    targetMouseX = (e.clientX - width / 2) * 0.1;
    targetMouseY = (e.clientY - height / 2) * 0.1;
  });

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

    // Create various floating shapes
    createFloatingShapes();

    // Add event listeners
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("scroll", onScroll);

    // Start animation
    animate();
  }

  // Create particles with enhanced colors and sizes
  function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color = new THREE.Color();
    const colorPalette = [
      0x16a34a, // Green
      0x0ea5e9, // Blue
      0x8b5cf6, // Purple
      0xf59e0b, // Amber
      0xef4444, // Red
      0xec4899, // Pink
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Position in a 3D space with more depth
      positions[i3] = (Math.random() - 0.5) * 2000;
      positions[i3 + 1] = (Math.random() - 0.5) * 1000;
      positions[i3 + 2] = (Math.random() - 0.5) * 1000;

      // Varied sizes for more depth perception
      sizes[i] = Math.random() * 5 + 1;

      // Random color from enhanced palette
      const colorIndex = Math.floor(Math.random() * colorPalette.length);
      color.setHex(colorPalette[colorIndex]);

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false,
    });

    // Add a vertex shader to control point size
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace(
        "void main() {",
        `
        attribute float size;
        void main() {
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        "gl_PointSize = size;",
        "gl_PointSize = size * ( 300.0 / -mvPosition.z );"
      );
    };

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  }

  // Create various floating geometric shapes
  function createFloatingShapes() {
    const shapes = [
      new THREE.TorusGeometry(30, 10, 16, 100),
      new THREE.OctahedronGeometry(20),
      new THREE.TetrahedronGeometry(25),
      new THREE.DodecahedronGeometry(15),
      new THREE.TorusKnotGeometry(10, 3, 100, 16),
      new THREE.BoxGeometry(25, 25, 25),
      new THREE.SphereGeometry(15, 32, 32),
    ];

    const materials = [
      new THREE.MeshPhongMaterial({
        color: 0x16a34a,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
        emissive: 0x16a34a,
        emissiveIntensity: 0.2,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x0ea5e9,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
        emissive: 0x0ea5e9,
        emissiveIntensity: 0.2,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.2,
      }),
      new THREE.MeshPhongMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.2,
      }),
    ];

    // Create 7 random shapes at random positions
    for (let i = 0; i < 7; i++) {
      const shapeIndex = Math.floor(Math.random() * shapes.length);
      const materialIndex = Math.floor(Math.random() * materials.length);

      const mesh = new THREE.Mesh(shapes[shapeIndex], materials[materialIndex]);

      // Position randomly in 3D space, but keep away from center
      const distance = 300 + Math.random() * 300;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 400;

      mesh.position.x = Math.cos(angle) * distance;
      mesh.position.y = height;
      mesh.position.z = Math.sin(angle) * distance;

      // Set random rotation
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;

      // Store rotation speed
      mesh.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.002,
      };

      // Store oscillation parameters
      mesh.userData.oscillation = {
        x: {
          amplitude: Math.random() * 20,
          speed: 0.002 + Math.random() * 0.005,
          phase: Math.random() * Math.PI * 2,
        },
        y: {
          amplitude: Math.random() * 20,
          speed: 0.002 + Math.random() * 0.005,
          phase: Math.random() * Math.PI * 2,
        },
        z: {
          amplitude: Math.random() * 20,
          speed: 0.002 + Math.random() * 0.005,
          phase: Math.random() * Math.PI * 2,
        },
      };

      floatingShapes.push(mesh);
      scene.add(mesh);
    }

    // Add ambient and directional lights for the shapes
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
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

    // Smooth mouse movement
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Rotate and animate floating shapes
    floatingShapes.forEach((shape) => {
      // Apply rotation
      shape.rotation.x += shape.userData.rotationSpeed.x;
      shape.rotation.y += shape.userData.rotationSpeed.y;
      shape.rotation.z += shape.userData.rotationSpeed.z;

      // Apply oscillation
      const time = Date.now();
      const osc = shape.userData.oscillation;

      shape.position.x += Math.sin(time * osc.x.speed + osc.x.phase) * 0.1;
      shape.position.y += Math.sin(time * osc.y.speed + osc.y.phase) * 0.1;
      shape.position.z += Math.sin(time * osc.z.speed + osc.z.phase) * 0.1;
    });

    render();
  }

  // Render scene
  function render() {
    // Rotate camera based on mouse position for interactive feel
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Rotate particles based on scroll position
    if (particles) {
      particles.rotation.y = scrollPercent * Math.PI * 2;
      particles.rotation.x = scrollPercent * Math.PI * 0.5;

      // Scale based on scroll position
      const scale = 1 + scrollPercent * 0.3;
      particles.scale.set(scale, scale, scale);

      // Create dynamic movement in particles
      const positions = particles.geometry.attributes.position.array;
      const time = Date.now() * 0.0001;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];

        // Create fluid wave-like movement
        positions[i3] += Math.sin(time * 2 + x * 0.01) * 0.2;
        positions[i3 + 1] += Math.cos(time * 2 + y * 0.01) * 0.2;
        positions[i3 + 2] += Math.sin(time * 2 + z * 0.01) * 0.2;
      }

      particles.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  // Start the scene
  try {
    init();
  } catch (error) {
    console.error("Error initializing Three.js:", error);
  }
});
