
// --- 1. DARK MODE TOGGLE ---
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.35; // Kept at a low, non-intrusive ambient level

// 1. Check if there is a saved timestamp from a previous page
function checkSavedTime() {
  const savedTime = sessionStorage.getItem('musicPosition');
  if (savedTime) {
    bgMusic.currentTime = parseFloat(savedTime);
  }
}

// 2. Safely trigger the music playback
function initiateMusic() {
  // Always verify if a previous timestamp exists before playing
  checkSavedTime();

  bgMusic.play()
    .then(() => {
      // Remove listeners once playing so clicks don't reset audio state
      document.removeEventListener('click', initiateMusic);
      document.removeEventListener('keydown', initiateMusic);
    })
    .catch(error => {
      console.log("Audio waiting for user interaction.", error);
    });
}

// Listen for first interaction anywhere on the window to start music
document.addEventListener('click', initiateMusic);
document.addEventListener('keydown', initiateMusic);

// 3. CONTINUOUS TIME TRACKING (Saves the time right before the page unloads)
window.addEventListener('beforeunload', () => {
  if (!bgMusic.paused) {
    sessionStorage.setItem('musicPosition', bgMusic.currentTime);
  }
});



// --- 2. FALLING LEAVES ENGINE (HTML5 Canvas) ---
const canvas = document.getElementById('leaves-canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Leaf Particle Template Structure
const totalLeaves = 25;
const leafArray = [];

class MapleLeaf {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = Math.random() * 12 + 8; // Size variants
    this.speedX = Math.random() * 1.5 - 0.5; // Slight drift to the right
    this.speedY = Math.random() * 1.2 + 0.8;  // Fall rate
    this.rotation = Math.random() * Math.PI * 2;
    this.spinSpeed = Math.random() * 0.02 - 0.01;
    // Varied shades of Japanese autumn red/crimson
    this.color = ['#8A1C14', '#D11A2A', '#A61C24', '#700E08'][Math.floor(Math.random() * 4)];
  }

  update() {
    this.x += this.speedX + Math.sin(this.y / 30) * 0.5; // Sway back and forth
    this.y += this.speedY;
    this.rotation += this.spinSpeed;

    // Reset leaf position when it falls off-screen
    if (this.y > canvas.height + 20 || this.x > canvas.width + 20 || this.x < -20) {
      this.x = Math.random() * canvas.width;
      this.y = -20;
      this.speedY = Math.random() * 1.2 + 0.8;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;

    // Draw an abstract Japanese maple jagged leaf vector shape geometry
    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.lineTo(this.size * 0.3, -this.size * 0.4);
    ctx.lineTo(this.size * 0.9, -this.size * 0.5);
    ctx.lineTo(this.size * 0.4, 0);
    ctx.lineTo(this.size * 0.8, this.size * 0.4);
    ctx.lineTo(this.size * 0.2, this.size * 0.3);
    ctx.lineTo(0, this.size);
    ctx.lineTo(-this.size * 0.2, this.size * 0.3);
    ctx.lineTo(-this.size * 0.8, this.size * 0.4);
    ctx.lineTo(-this.size * 0.4, 0);
    ctx.lineTo(-this.size * 0.9, -this.size * 0.5);
    ctx.lineTo(-this.size * 0.3, -this.size * 0.4);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

// Instantiate particles
for (let i = 0; i < totalLeaves; i++) {
  leafArray.push(new MapleLeaf());
}

// Continuous Animation Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  leafArray.forEach(leaf => {
    leaf.update();
    leaf.draw();
  });
  
  requestAnimationFrame(animate);
}
animate();




/**
 * ============================================================================
 * 4. CINEMATIC MULTI-PAGE PARAGRAPH SLIDER LOGIC (FIXED)
 * ============================================================================
 */
const viewport = document.getElementById('story-viewport');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageCounter = document.getElementById('page-counter');
const slides = document.querySelectorAll('.slide-pane');
const totalPages = slides.length;

let currentPageIndex = 0;

// Updates the interactive Page counter label and checks boundary status
function updateSliderControls() {
  if (pageCounter) {
    pageCounter.textContent = `Page: ${currentPageIndex + 1}`;
  }

  if (prevBtn) prevBtn.disabled = currentPageIndex === 0;
  if (nextBtn) nextBtn.disabled = currentPageIndex === totalPages - 1;
}

// Moves view screen cleanly onto target page coordinates
function scrollToPage(index) {
  if (!viewport || totalPages === 0) return;
  
  // FIXED: Instead of window.innerWidth, use the exact client width of a slide pane
  const slideWidth = slides[0].clientWidth;
  
  viewport.scrollTo({
    left: index * slideWidth,
    behavior: 'smooth'
  });
  
  currentPageIndex = index;
  updateSliderControls();
}

// Controller click listeners
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (currentPageIndex < totalPages - 1) {
      scrollToPage(currentPageIndex + 1);
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (currentPageIndex > 0) {
      scrollToPage(currentPageIndex - 1);
    }
  });
}

// Detect manual swipe touch inputs or button scroll changes
if (viewport && totalPages > 0) {
  viewport.addEventListener('scroll', () => {
    const slideWidth = slides[0].clientWidth;
    if (slideWidth === 0) return; // Prevent division by zero errors
    
    // Calculates which page is filling the screen center based on scroll alignment pixels
    const calculatedIndex = Math.round(viewport.scrollLeft / slideWidth);
    if (calculatedIndex !== currentPageIndex && calculatedIndex < totalPages) {
      currentPageIndex = calculatedIndex;
      updateSliderControls();
    }
  });
}

// Initialize layout numbers upon initialization load
updateSliderControls();


/**
 * ============================================================================
 * 5. INTERACTIVE SLIDING CHARACTER DRAWER MODULE
 * ============================================================================
 */
const charRows = document.querySelectorAll('.char-row');
const drawer = document.getElementById('profile-drawer');
const closeDrawerBtn = document.getElementById('close-drawer');

const dTitle = document.getElementById('drawer-title');
const dImg = document.getElementById('drawer-img');
const dP1 = document.getElementById('drawer-p1');
const dP2 = document.getElementById('drawer-p2');

if (charRows.length > 0 && drawer) {
  charRows.forEach(row => {
    row.addEventListener('click', (e) => {
      // Stop event from propagating up to the window immediately
      e.stopPropagation();

      // Strip active state highlights from all other rows
      charRows.forEach(r => r.classList.remove('is-active'));
      
      // Inject current active highlights onto clicked node row
      row.classList.add('is-active');

      // Fetch specific layout data properties mapped in the HTML attributes
      const name = row.getAttribute('data-name');
      const image = row.getAttribute('data-image');
      const p1 = row.getAttribute('data-p1');
      const p2 = row.getAttribute('data-p2');

      // Swap the internal profile panel structure variables instantly
      if (dTitle) dTitle.textContent = name;
      if (dImg) dImg.src = image;
      if (dP1) dP1.textContent = p1;
      if (dP2) dP2.textContent = p2;

      // Add the open class to trigger the smooth CSS slide-in
      drawer.classList.add('open');
    });
  });

  // Handle closing drawer panel via the 'X' escape button
  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
      charRows.forEach(r => r.classList.remove('is-active'));
    });
  }

  window.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target)) {
      drawer.classList.remove('open');
      charRows.forEach(r => r.classList.remove('is-active'));
    }
  });
}


