document.addEventListener('DOMContentLoaded', () => {

  // --- Clock Timecode Update ---
  const timecodeEl = document.getElementById('timecode');
  setInterval(() => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    timecodeEl.textContent = `${h}:${m}:${s}`;
  }, 1000);

  // --- FPV Parallax & Sensor Simulation ---
  const pitchLadder = document.querySelector('.pitch-ladder');
  const reticle = document.querySelector('.reticle');
  const altVal = document.getElementById('alt-val');
  const speedVal = document.getElementById('speed-val');
  
  let targetPitch = 0;
  let targetRoll = 0;
  let currentPitch = 0;
  let currentRoll = 0;
  
  let baseAlt = 124.5;
  let baseSpeed = 42.0;

  // Simulate drone movement on mousemove
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5; // -0.5 to 0.5
    const y = (e.clientY / window.innerHeight) - 0.5; // -0.5 to 0.5

    targetRoll = x * 15; // Max 15 degrees roll
    targetPitch = y * 30; // Max 30 px translation
  });

  function animateFPV() {
    // Smooth interpolation
    currentPitch += (targetPitch - currentPitch) * 0.1;
    currentRoll += (targetRoll - currentRoll) * 0.1;

    // Apply to pitch ladder (horizon tilts and moves up/down)
    if (pitchLadder) {
      pitchLadder.style.transform = `translate(-50%, calc(-50% + ${currentPitch}px)) rotate(${currentRoll}deg)`;
    }
    
    // Slight counter-movement for reticle to give 3D depth
    if (reticle) {
      reticle.style.transform = `translate(calc(-50% + ${-currentRoll*2}px), calc(-50% + ${-currentPitch*0.5}px))`;
    }

    // Simulate slight fluctuations in altitude and speed
    if (Math.random() > 0.9) {
      const altFluctuation = (Math.random() - 0.5) * 0.4;
      const speedFluctuation = (Math.random() - 0.5) * 1.2;
      altVal.textContent = (baseAlt + altFluctuation).toFixed(1);
      speedVal.textContent = (baseSpeed + speedFluctuation).toFixed(1);
    }

    requestAnimationFrame(animateFPV);
  }
  animateFPV();

  // --- Navigation & Viewport Switching ---
  const navBtns = document.querySelectorAll('.deck-btn');
  const panes = document.querySelectorAll('.content-pane');
  const staticNoise = document.getElementById('static-overlay');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      
      if (btn.classList.contains('active')) return;

      // Update buttons
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Trigger Static Transition
      staticNoise.classList.remove('active');
      void staticNoise.offsetWidth; // Trigger reflow
      staticNoise.classList.add('active');

      // Swap panes exactly midway through the static flash (0.2s)
      setTimeout(() => {
        panes.forEach(pane => pane.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
        
        // Slightly fluctuate altitude to simulate moving
        baseAlt += (Math.random() * 10 - 5);
      }, 200);
    });
  });

});
