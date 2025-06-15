// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  setTimeout(function () {
    document.querySelector(".preloader").style.opacity = "0";
    setTimeout(function () {
      document.querySelector(".preloader").style.display = "none";
      // Start animations after preloader is gone
      animateHero();
    }, 500);
  }, 800); // Reduced preloader time

  // Initialize Three.js scene
  initThreeScene();

  // Custom cursor
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  if (cursor && cursorFollower) {
    document.addEventListener("mousemove", function (e) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      setTimeout(function () {
        cursorFollower.style.left = e.clientX + "px";
        cursorFollower.style.top = e.clientY + "px";
      }, 100);
    });

    document.addEventListener("mousedown", function () {
      cursor.style.transform = "translate(-50%, -50%) scale(0.5)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)";
    });

    document.addEventListener("mouseup", function () {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
    });

    // Add hover effect to links and buttons
    const hoverElements = document.querySelectorAll("a, button, .btn");
    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", function () {
        cursor.style.width = "40px";
        cursor.style.height = "40px";
        cursorFollower.style.width = "60px";
        cursorFollower.style.height = "60px";
      });

      element.addEventListener("mouseleave", function () {
        cursor.style.width = "20px";
        cursor.style.height = "20px";
        cursorFollower.style.width = "40px";
        cursorFollower.style.height = "40px";
      });
    });
  }

  // Sticky header
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // Mobile menu
  const menuBtn = document.querySelector(".menu-btn");
  const closeBtn = document.querySelector(".close-btn");
  const nav = document.querySelector(".nav");

  if (menuBtn && closeBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.add("active");
    });

    closeBtn.addEventListener("click", function () {
      nav.classList.remove("active");
    });

    // Close menu when clicking a nav link on mobile
    const navLinks = document.querySelectorAll(".nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        nav.classList.remove("active");
      });
    });
  }

  // Scroll animations
  const scrollElements = document.querySelectorAll(
    ".fade-up, .fade-right, .fade-left"
  );

  function scrollAnimation() {
    scrollElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  }

  // Initial check on load
  scrollAnimation();

  // Check on scroll
  window.addEventListener("scroll", scrollAnimation);

  // Animate skill bars
  const skillProgressBars = document.querySelectorAll(".skill-progress-bar");

  function animateSkillBars() {
    skillProgressBars.forEach((bar) => {
      const percent = bar.getAttribute("data-percent");
      const barTop = bar.getBoundingClientRect().top;
      const barVisible = 150;

      if (barTop < window.innerHeight - barVisible) {
        bar.style.width = percent;
      }
    });
  }

  // Initial check on load
  animateSkillBars();

  // Check on scroll
  window.addEventListener("scroll", animateSkillBars);

  // Project filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((filterBtn) => {
        filterBtn.classList.remove("active");
      });

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Filter projects
      projects.forEach((project) => {
        const projectCategory = project.getAttribute("data-category");

        if (filterValue === "all" || filterValue === projectCategory) {
          project.style.display = "block";
          setTimeout(() => {
            project.style.opacity = "1";
            project.style.transform = "translateY(0)";
          }, 200);
        } else {
          project.style.opacity = "0";
          project.style.transform = "translateY(20px)";
          setTimeout(() => {
            project.style.display = "none";
          }, 500);
        }
      });
    });
  });

  // Staggered animation for grid items
  const staggerItems = document.querySelectorAll(".stagger-item");

  function staggerAnimation() {
    staggerItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      const itemVisible = 150;

      if (itemTop < window.innerHeight - itemVisible) {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  }

  // Initial check on load
  staggerAnimation();

  // Check on scroll
  window.addEventListener("scroll", staggerAnimation);

  // Enhanced Form Interaction
  const formControls = document.querySelectorAll(".form-control");
  formControls.forEach((control) => {
    control.addEventListener("focus", () => {
      control.parentElement.classList.add("focused");
    });

    control.addEventListener("blur", () => {
      if (!control.value) {
        control.parentElement.classList.remove("focused");
      }
    });
  });

  // Form Submission with Animation
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = document.getElementById("submit-btn");
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate sending (would be an actual API call in production)
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.classList.add("success");

        // Reset form
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = "Send Message";
          submitBtn.disabled = false;
          submitBtn.classList.remove("success");
        }, 3000);
      }, 1500);
    });
  }

  // Interactive hover effects for skill icons
  const skillIcons = document.querySelectorAll(".skill-icon-item");
  skillIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      icon.style.transform = "translateY(-10px) scale(1.05)";
    });

    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "translateY(0) scale(1)";
    });
  });

  // Timeline interaction
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const content = item.querySelector(".timeline-content");
      if (content) {
        content.style.transform = "scale(1.03)";
        content.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
      }
    });

    item.addEventListener("mouseleave", () => {
      const content = item.querySelector(".timeline-content");
      if (content) {
        content.style.transform = "scale(1)";
        content.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.05)";
      }
    });
  });

  // Create floating bubbles background
  createFloatingBubbles();

  // Force initial animations to show content
  setTimeout(() => {
    // Make hero elements visible by default in case animations fail
    document
      .querySelectorAll(
        ".hero-subtitle, .hero-title, .hero-description, .hero-btns, .hero-img"
      )
      .forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });

    // Make other hidden elements visible
    document
      .querySelectorAll(".fade-up, .fade-right, .fade-left, .stagger-item")
      .forEach((el) => {
        el.classList.add("active");
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });

    // Make skill bars visible
    document.querySelectorAll(".skill-progress-bar").forEach((bar) => {
      const percent = bar.getAttribute("data-percent");
      bar.style.width = percent;
    });
  }, 1000);
});

// Create floating bubbles background
function createFloatingBubbles() {
  const colors = [
    "#16a34a", // green
    "#0ea5e9", // blue
    "#8b5cf6", // purple
    "#f59e0b", // amber
    "#ec4899", // pink
  ];

  const container = document.createElement("div");
  container.className = "floating-bubbles";
  document.body.appendChild(container);

  // Create 15 bubbles
  for (let i = 0; i < 15; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";

    // Random size between 30px and 150px
    const size = Math.floor(Math.random() * 120) + 30;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Random position
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.top = `${Math.random() * 100}%`;

    // Random color
    const colorIndex = Math.floor(Math.random() * colors.length);
    bubble.style.backgroundColor = colors[colorIndex];

    // Random opacity between 0.05 and 0.15
    bubble.style.opacity = (Math.random() * 0.1 + 0.05).toString();

    // Random animation duration between 15s and 30s
    const duration = Math.random() * 15 + 15;
    bubble.style.animationDuration = `${duration}s`;

    // Random animation delay
    bubble.style.animationDelay = `${Math.random() * 5}s`;

    // Add shape variation
    const shapeType = Math.floor(Math.random() * 5);
    if (shapeType === 0) {
      // Circle (default)
    } else if (shapeType === 1) {
      // Square
      bubble.style.borderRadius = "10%";
    } else if (shapeType === 2) {
      // Triangle (using clip-path)
      bubble.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
      bubble.style.borderRadius = "0";
    } else if (shapeType === 3) {
      // Pentagon
      bubble.style.clipPath =
        "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)";
      bubble.style.borderRadius = "0";
    } else {
      // Blob shape
      const r1 = 50 + Math.random() * 20;
      const r2 = 50 + Math.random() * 20;
      const r3 = 50 + Math.random() * 20;
      const r4 = 50 + Math.random() * 20;
      bubble.style.borderRadius = `${r1}% ${r2}% ${r3}% ${r4}% / ${r4}% ${r1}% ${r2}% ${r3}%`;
    }

    container.appendChild(bubble);
  }
}

// Hero Animations with GSAP
function animateHero() {
  if (typeof gsap !== "undefined") {
    gsap.to(".hero-subtitle", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.to(".hero-title", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2,
    });

    gsap.to(".hero-description", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.4,
    });

    gsap.to(".hero-btns", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.6,
    });

    gsap.to(".hero-img", {
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.8,
    });
  } else {
    // Fallback if GSAP isn't loaded
    document.querySelector(".hero-subtitle").style.opacity = "1";
    document.querySelector(".hero-subtitle").style.transform = "translateY(0)";

    document.querySelector(".hero-title").style.opacity = "1";
    document.querySelector(".hero-title").style.transform = "translateY(0)";

    document.querySelector(".hero-description").style.opacity = "1";
    document.querySelector(".hero-description").style.transform =
      "translateY(0)";

    document.querySelector(".hero-btns").style.opacity = "1";
    document.querySelector(".hero-btns").style.transform = "translateY(0)";

    document.querySelector(".hero-img").style.opacity = "1";
  }
}

// Three.js Background with enhanced geometric shapes
function initThreeScene() {
  if (typeof THREE === "undefined") {
    console.error("Three.js is not loaded");
    return;
  }

  const container = document.getElementById("canvas-container");
  if (!container) return;

  // Create scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Create a group to hold all objects
  const group = new THREE.Group();
  scene.add(group);

  // Create multiple varied geometry types
  const geometries = [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.DodecahedronGeometry(1, 0),
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.TorusGeometry(1, 0.3, 8, 12),
    new THREE.ConeGeometry(1, 2, 8),
  ];

  // Create multiple shapes with different colors
  for (let i = 0; i < 25; i++) {
    // Pick a random geometry
    const geometryIndex = Math.floor(Math.random() * geometries.length);
    const geometry = geometries[geometryIndex];

    // Create material with a random color
    let color;
    const colorChoice = Math.floor(Math.random() * 5);

    switch (colorChoice) {
      case 0:
        color = 0x16a34a;
        break; // green
      case 1:
        color = 0x0ea5e9;
        break; // blue
      case 2:
        color = 0x8b5cf6;
        break; // purple
      case 3:
        color = 0xf59e0b;
        break; // amber
      case 4:
        color = 0xec4899;
        break; // pink
    }

    const material = new THREE.MeshPhongMaterial({
      color: color,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      emissive: color,
      emissiveIntensity: 0.2,
    });

    const mesh = new THREE.Mesh(geometry, material);

    // Position randomly
    mesh.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    );

    // Random rotation
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    // Random scale
    const size = Math.random() * 1.5 + 0.5;
    mesh.scale.set(size, size, size);

    // Store animation properties
    mesh.userData = {
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      },
      oscillation: {
        speed: 0.01 + Math.random() * 0.02,
        amplitude: 0.1 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      },
    };

    group.add(mesh);
  }

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.7);
  pointLight.position.set(5, 3, 5);
  scene.add(pointLight);

  // Position camera
  camera.position.z = 10;

  // Add mouse interaction
  let mouseX = 0,
    mouseY = 0;
  let targetMouseX = 0,
    targetMouseY = 0;

  document.addEventListener("mousemove", function (e) {
    targetMouseX = (e.clientX - window.innerWidth / 2) * 0.001;
    targetMouseY = (e.clientY - window.innerHeight / 2) * 0.001;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Smooth camera movement following mouse
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    camera.position.x += mouseX;
    camera.position.y += -mouseY;
    camera.lookAt(scene.position);

    // Animate each shape
    group.children.forEach((mesh) => {
      // Rotate
      mesh.rotation.x += mesh.userData.rotationSpeed.x;
      mesh.rotation.y += mesh.userData.rotationSpeed.y;
      mesh.rotation.z += mesh.userData.rotationSpeed.z;

      // Oscillate
      const time = Date.now() * 0.001;
      const osc = mesh.userData.oscillation;
      mesh.position.x +=
        Math.sin(time * osc.speed + osc.phase) * osc.amplitude * 0.1;
      mesh.position.y +=
        Math.cos(time * osc.speed + osc.phase) * osc.amplitude * 0.1;
    });

    // Slowly rotate the entire group
    group.rotation.x += 0.0005;
    group.rotation.y += 0.0007;

    renderer.render(scene, camera);
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Start animation
  animate();
}
