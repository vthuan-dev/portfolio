// ============================================
// Three.js Scene Setup
// ============================================
let scene, camera, renderer;
let particles, starField;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function initThreeJS() {
    // Scene Setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e27, 0.001);

    // Camera Setup
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 50;

    // Renderer Setup
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('three-canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create Particle System
    createParticles();
    
    // Create Star Field
    createStarField();

    // Create Floating Geometries
    createFloatingGeometries();

    // Add Lights
    const ambientLight = new THREE.AmbientLight(0x667eea, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x764ba2, 1);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Mouse Movement Event
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    
    // Window Resize Event
    window.addEventListener('resize', onWindowResize, false);

    // Start Animation
    animate();
}

// Create Particle System
function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.5,
        color: 0x667eea,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
}

// Create Star Field
function createStarField() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
        starPositions[i] = (Math.random() - 0.5) * 300;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({
        size: 1,
        color: 0xffffff,
        transparent: true,
        opacity: 0.6
    });

    starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
}

// Create Floating Geometries
function createFloatingGeometries() {
    const geometries = [
        new THREE.TetrahedronGeometry(3, 0),
        new THREE.OctahedronGeometry(3, 0),
        new THREE.IcosahedronGeometry(3, 0)
    ];

    const material = new THREE.MeshPhongMaterial({
        color: 0x667eea,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });

    for (let i = 0; i < 5; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 100;
        mesh.position.y = (Math.random() - 0.5) * 100;
        mesh.position.z = (Math.random() - 0.5) * 100;
        
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        mesh.userData = {
            rotationSpeedX: Math.random() * 0.01 - 0.005,
            rotationSpeedY: Math.random() * 0.01 - 0.005,
            floatSpeed: Math.random() * 0.5 + 0.5
        };
        
        scene.add(mesh);
    }
}

// Mouse Move Handler
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
}

// Window Resize Handler
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
    }

    // Rotate star field
    if (starField) {
        starField.rotation.y += 0.0002;
    }

    // Animate floating geometries
    scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.userData.rotationSpeedX) {
            child.rotation.x += child.userData.rotationSpeedX;
            child.rotation.y += child.userData.rotationSpeedY;
            child.position.y += Math.sin(Date.now() * 0.001 * child.userData.floatSpeed) * 0.05;
        }
    });

    // Camera follow mouse
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// ============================================
// Hero 3D Model
// ============================================
function createHero3DModel() {
    const heroContainer = document.getElementById('hero-3d-container');
    if (!heroContainer) return;

    const heroScene = new THREE.Scene();
    const heroCamera = new THREE.PerspectiveCamera(
        50,
        heroContainer.clientWidth / heroContainer.clientHeight,
        0.1,
        1000
    );
    heroCamera.position.z = 30;

    const heroRenderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    heroRenderer.setSize(heroContainer.clientWidth, heroContainer.clientHeight);
    heroContainer.appendChild(heroRenderer.domElement);

    // Create animated cube with gradients
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshPhongMaterial({
        color: 0x667eea,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const cube = new THREE.Mesh(geometry, material);
    heroScene.add(cube);

    // Add inner cube
    const innerGeometry = new THREE.BoxGeometry(7, 7, 7);
    const innerMaterial = new THREE.MeshPhongMaterial({
        color: 0x764ba2,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const innerCube = new THREE.Mesh(innerGeometry, innerMaterial);
    cube.add(innerCube);

    // Add lights
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    heroScene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    heroScene.add(ambientLight);

    // Animation
    function animateHero() {
        requestAnimationFrame(animateHero);
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        innerCube.rotation.x -= 0.01;
        innerCube.rotation.y -= 0.01;
        heroRenderer.render(heroScene, heroCamera);
    }
    animateHero();

    // Resize handler
    window.addEventListener('resize', () => {
        heroCamera.aspect = heroContainer.clientWidth / heroContainer.clientHeight;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(heroContainer.clientWidth, heroContainer.clientHeight);
    });
}

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js
    initThreeJS();
    
    // Create Hero 3D Model
    createHero3DModel();
    
    // Initialize Particles.js
    initParticlesJS();
    
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Loading Screen
    setTimeout(function(){
        document.querySelector('body').className += ' loaded';
    }, 2000);

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            // Make sure navbar stays on top when scrolling
            navbar.style.zIndex = "9000";
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Typing Effect
    const typingText = document.querySelector('.typing-text');
    window.roles = ['Backend Developer', 'Blockchain Enthusiast', 'Problem Solver', 'Tech Innovator'];
    window.roleIndex = 0;
    window.charIndex = 0;
    window.isDeleting = false;

    window.typeRole = function() {
        const currentRole = window.roles[window.roleIndex];
        
        if (window.isDeleting) {
            typingText.textContent = currentRole.substring(0, window.charIndex - 1);
            window.charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, window.charIndex + 1);
            window.charIndex++;
        }

        if (!window.isDeleting && window.charIndex === currentRole.length) {
            window.isDeleting = true;
            window.typeRoleTimeout = setTimeout(window.typeRole, 2000);
        } else if (window.isDeleting && window.charIndex === 0) {
            window.isDeleting = false;
            window.roleIndex = (window.roleIndex + 1) % window.roles.length;
            window.typeRoleTimeout = setTimeout(window.typeRole, 500);
        } else {
            window.typeRoleTimeout = setTimeout(window.typeRole, window.isDeleting ? 50 : 100);
        }
    }

    window.typeRoleTimeout = setTimeout(window.typeRole, 1000);

    // Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                let count = 0;
                const increment = target / 50;

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCount();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Skill Cards 3D Tilt Effect
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // EmailJS initialization
    emailjs.init("EDBoWTGr2KY2OlIpL"); // Thay "YOUR_USER_ID" bằng User ID từ EmailJS

    // Form Submission with EmailJS
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Disable submit button during sending
            submitBtn.disabled = true;
            // Get current language
            const currentLang = localStorage.getItem('preferredLanguage') || 'en';
            const sendingText = currentLang === 'vi' ? 'Đang gửi...' : 'Sending...';
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${sendingText}`;
            
            // Get form values
            const templateParams = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Send email using EmailJS
            emailjs.send('service_ha46yhp', 'template_1jxtj77', templateParams) // Thay bằng Service ID và Template ID từ EmailJS
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message with confetti effect
                    const successText = currentLang === 'vi' ? 
                        'Cảm ơn bạn đã gửi tin nhắn! Tôi sẽ phản hồi sớm nhất có thể.' : 
                        'Thank you for your message! I will get back to you soon.';
                    formStatus.innerHTML = `
                        <i class="fas fa-check-circle" style="color: #10b981; font-size: 1.5em; margin-right: 8px;"></i>
                        ${successText}
                    `;
                    formStatus.className = 'form-status success';
                    
                    // Create confetti effect
                    createSuccessParticles();
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after success
                    submitBtn.disabled = false;
                    const langKey = document.documentElement.lang === 'vi' ? 
                        '<i class="fas fa-paper-plane"></i> Gửi tin nhắn' : 
                        '<i class="fas fa-paper-plane"></i> Send Message';
                    submitBtn.innerHTML = langKey;
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    const errorText = currentLang === 'vi' ? 
                        'Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.' : 
                        'Oops! There was a problem sending your message. Please try again later.';
                    formStatus.innerHTML = `
                        <i class="fas fa-exclamation-circle" style="color: #ef4444; font-size: 1.5em; margin-right: 8px;"></i>
                        ${errorText}
                    `;
                    formStatus.className = 'form-status error';
                    
                    // Reset button after error
                    submitBtn.disabled = false;
                    const langKey = document.documentElement.lang === 'vi' ? 
                        '<i class="fas fa-paper-plane"></i> Gửi tin nhắn' : 
                        '<i class="fas fa-paper-plane"></i> Send Message';
                    submitBtn.innerHTML = langKey;
                });
        });
    }

    // Hero Fade Effect on Scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            // Bắt đầu làm mờ khi scroll xuống 100px
            const fadeStart = 100;
            // Hoàn thành làm mờ khi scroll xuống 300px
            const fadeEnd = 300;
            
            if (scrolled > fadeStart) {
                const opacity = Math.max(0, 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart));
                const translateY = Math.min(30, (scrolled - fadeStart) / 10);
                const scale = Math.max(0.95, 1 - (scrolled - fadeStart) / 2000);
                const blur = Math.min(5, (scrolled - fadeStart) / 40);
                
                heroContent.style.opacity = opacity;
                heroContent.style.transform = `translateY(-${translateY}px) scale(${scale})`;
                heroContent.style.filter = `blur(${blur}px)`;
                
                if (opacity <= 0.1) {
                    heroContent.classList.add('fade-out');
                }
            } else {
                heroContent.style.opacity = 1;
                heroContent.style.transform = 'translateY(0) scale(1)';
                heroContent.style.filter = 'blur(0)';
                heroContent.classList.remove('fade-out');
            }
        }
    });

    // Magnetic Buttons Effect
    const magneticButtons = document.querySelectorAll('.btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // Add scroll reveal animations for project cards
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateY(-10deg)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        projectObserver.observe(card);
    });

    // Add gradient animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.transform = 'scale(1.05)';
        });
        title.addEventListener('mouseleave', () => {
            title.style.transform = 'scale(1)';
        });
    });
});

// Initialize Particles.js
function initParticlesJS() {
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('Particles.js loaded - portfolio looks amazing!');
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let waiting = false;
    return function() {
        if (!waiting) {
            func.apply(this, arguments);
            waiting = true;
            setTimeout(() => {
                waiting = false;
            }, wait);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 100));

// Create success confetti particles effect using Three.js
function createSuccessParticles() {
    const container = document.querySelector('.contact-form');
    if (!container) return;
    
    // Create temporary canvas for particles
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    container.style.position = 'relative';
    container.appendChild(canvas);
    
    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.position.z = 20;
    
    // Create confetti particles
    const particles = new THREE.Group();
    scene.add(particles);
    
    const colors = [0x667eea, 0x764ba2, 0xf093fb, 0x10b981, 0x60a5fa];
    const totalParticles = 80;
    
    for (let i = 0; i < totalParticles; i++) {
        const geometry = new THREE.PlaneGeometry(0.2, 0.2);
        const material = new THREE.MeshBasicMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            side: THREE.DoubleSide
        });
        const particle = new THREE.Mesh(geometry, material);
        
        particle.position.set(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10 + 5, // Start slightly above
            (Math.random() - 0.5) * 15
        );
        
        particle.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        particle.userData = {
            velocity: {
                x: (Math.random() - 0.5) * 0.2,
                y: -0.1 - Math.random() * 0.2, // Fall down
                z: (Math.random() - 0.5) * 0.2
            },
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.1,
                y: (Math.random() - 0.5) * 0.1,
                z: (Math.random() - 0.5) * 0.1
            }
        };
        
        particles.add(particle);
    }
    
    // Animation
    let animationFrame;
    function animate() {
        animationFrame = requestAnimationFrame(animate);
        
        particles.children.forEach(particle => {
            // Update position
            particle.position.x += particle.userData.velocity.x;
            particle.position.y += particle.userData.velocity.y;
            particle.position.z += particle.userData.velocity.z;
            
            // Update rotation
            particle.rotation.x += particle.userData.rotationSpeed.x;
            particle.rotation.y += particle.userData.rotationSpeed.y;
            particle.rotation.z += particle.userData.rotationSpeed.z;
            
            // If particle is out of view, remove it
            if (particle.position.y < -10) {
                particles.remove(particle);
            }
        });
        
        // Stop animation when all particles are gone
        if (particles.children.length === 0) {
            cancelAnimationFrame(animationFrame);
            container.removeChild(canvas);
        }
        
        renderer.render(scene, camera);
    }
    
    animate();
}

console.log('Portfolio initialized successfully! 🚀');

