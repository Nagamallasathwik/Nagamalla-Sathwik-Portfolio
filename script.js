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

// Three.js Background with light colors
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

  // Add objects to the scene
  const geometry = new THREE.IcosahedronGeometry(1, 0);
  const material = new THREE.MeshPhongMaterial({
    color: 0x16a34a, // Using the primary green color
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });

  // Create a group of meshes
  const group = new THREE.Group();
  scene.add(group);

  // Create multiple shapes
  for (let i = 0; i < 15; i++) {
    const mesh = new THREE.Mesh(geometry, material.clone());
    mesh.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    const size = Math.random() * 0.8 + 0.1;
    mesh.scale.set(size, size, size);

    // Use different colors for variety
    if (i % 3 === 0) {
      mesh.material.color.setHex(0x16a34a); // Primary green
    } else if (i % 3 === 1) {
      mesh.material.color.setHex(0x0ea5e9); // Secondary blue
    } else {
      mesh.material.color.setHex(0x8b5cf6); // Accent purple
    }

    group.add(mesh);
  }

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(5, 3, 5);
  scene.add(pointLight);

  // Position camera
  camera.position.z = 5;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    group.rotation.x += 0.0005;
    group.rotation.y += 0.001;

    // Rotate each mesh
    group.children.forEach((mesh) => {
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.005;
    });

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
