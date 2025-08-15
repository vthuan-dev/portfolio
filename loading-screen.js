/**
 * Three.js Circle Loading Screen
 * Creates a beautiful circular loading animation
 */

class CircleLoader {
    constructor() {
        this.canvas = document.getElementById('loader-canvas');
        this.percentageElement = document.querySelector('.loader-percentage');
        this.loadingScreen = document.getElementById('loading-screen');
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.circles = [];
        this.progress = 0;
        
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        // Colors for circles
        this.colors = [
            0x667eea, // Primary
            0x764ba2, // Secondary
            0xf093fb  // Accent
        ];
        
        this.init();
    }
    
    init() {
        // Create Three.js Scene
        this.scene = new THREE.Scene();
        
        // Create camera with orthographic projection for 2D effect
        const aspect = this.width / this.height;
        const frustumSize = 10;
        this.camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            frustumSize / -2,
            0.1,
            100
        );
        this.camera.position.z = 10;
        
        // Create WebGL renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x0a0e27, 0);
        
        // Create circles
        this.createCircles();
        
        // Add window resize listener
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Start animation loop
        this.animate();
        
        // Start progress simulation
        this.simulateLoading();
    }
    
    createCircles() {
        // Create three concentric circles with different properties
        for (let i = 0; i < 3; i++) {
            const radius = 3 + i * 0.8;
            const segments = 64;
            const geometry = new THREE.RingGeometry(radius - 0.2, radius, segments);
            
            // Create dashed material for the circles
            const material = new THREE.MeshBasicMaterial({
                color: this.colors[i],
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.7 - i * 0.15,
                wireframe: false
            });
            
            // Create the circle mesh
            const circle = new THREE.Mesh(geometry, material);
            
            // Set initial rotation and properties
            circle.rotation.z = Math.random() * Math.PI * 2;
            circle.userData = {
                rotationSpeed: (0.002 + i * 0.001) * (i % 2 === 0 ? 1 : -1),
                radius: radius,
                initialScale: 0.1,
                targetScale: 1
            };
            
            // Start with small scale to animate in
            circle.scale.set(0.1, 0.1, 0.1);
            
            // Add to scene and store in array
            this.scene.add(circle);
            this.circles.push(circle);
        }
        
        // Create center circle
        const centerGeometry = new THREE.CircleGeometry(0.5, 32);
        const centerMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });
        const centerCircle = new THREE.Mesh(centerGeometry, centerMaterial);
        this.scene.add(centerCircle);
        
        // Add to circles array for animation
        centerCircle.userData = {
            pulsate: true,
            initialScale: 0.6,
            targetScale: 1
        };
        this.circles.push(centerCircle);
    }
    
    animate() {
        // If hidden, stop animation
        if (this.loadingScreen.classList.contains('hidden')) return;
        
        // Request next animation frame
        requestAnimationFrame(this.animate.bind(this));
        
        // Animate each circle
        this.circles.forEach((circle, i) => {
            // Rotate outer rings
            if (circle.userData.rotationSpeed) {
                circle.rotation.z += circle.userData.rotationSpeed;
            }
            
            // Scale animation
            if (circle.userData.initialScale < circle.userData.targetScale) {
                circle.userData.initialScale += 0.02;
                circle.scale.set(
                    circle.userData.initialScale,
                    circle.userData.initialScale,
                    circle.userData.initialScale
                );
            }
            
            // Pulsate center circle
            if (circle.userData.pulsate) {
                circle.scale.x = circle.scale.y = 0.6 + Math.sin(Date.now() * 0.003) * 0.1;
            }
        });
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
    
    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        // Update camera aspect ratio
        const aspect = this.width / this.height;
        const frustumSize = 10;
        
        this.camera.left = frustumSize * aspect / -2;
        this.camera.right = frustumSize * aspect / 2;
        this.camera.top = frustumSize / 2;
        this.camera.bottom = frustumSize / -2;
        this.camera.updateProjectionMatrix();
        
        // Update renderer size
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    
    simulateLoading() {
        // Simulate progress increments
        const increment = () => {
            if (this.progress < 100) {
                // Randomize progress increments
                const randomIncrement = Math.floor(Math.random() * 5) + 1;
                this.progress = Math.min(this.progress + randomIncrement, 100);
                
                // Update percentage display
                if (this.percentageElement) {
                    this.percentageElement.textContent = `${this.progress}%`;
                }
                
                // Continue until 100%
                if (this.progress < 100) {
                    setTimeout(increment, 100 + Math.random() * 200);
                } else {
                    // Complete loading
                    setTimeout(() => {
                        this.complete();
                    }, 500);
                }
            }
        };
        
        // Start progress after a short delay
        setTimeout(increment, 500);
    }
    
    complete() {
        // Add hidden class to hide loading screen
        this.loadingScreen.classList.add('hidden');
    }
}

// Add language keys for loading screen
if (!window.languages) window.languages = {};
if (!window.languages.en) window.languages.en = {};
if (!window.languages.vi) window.languages.vi = {};

window.languages.en.loader = {
    loading: "Loading"
};

window.languages.vi.loader = {
    loading: "Đang tải"
};

// Initialize loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create circle loader
    window.circleLoader = new CircleLoader();
});
