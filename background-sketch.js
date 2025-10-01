// Background animation sketch for Propeller website
let sketch = function(p) {
  let THE_SEED;
  let border = 0;
  let number_of_particles = 4000;
  let number_of_particle_sets = 8;
  let particle_sets = [];
  let tick = 0;

  let palette;

  let nzoom = 10;

  p.setup = function() {
    // Make canvas responsive to window size
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('background-animation');
    
    THE_SEED = p.floor(p.random(9999999));
    p.randomSeed(THE_SEED);

    p.noFill();
    p.background(237, 246, 249);
    p.stroke(152, 173, 244, 15);
    p.strokeWeight(0.7);
    p.smooth();

    palette = [p.color(152, 173, 244, 20), p.color(152, 173, 244, 15)];

    for (var j = 0; j < number_of_particle_sets; j++) {
      let ps = [];
      for (var i = 0; i < number_of_particles; i++) {
        ps.push(
          new Particle(
            p.randomGaussian(p.width / 2, 160),
            p.randomGaussian(3 * p.height / 5, 160),
            p.random(p.TWO_PI)
          )
        );
      }
      particle_sets.push(ps);
    }
  };

  p.draw = function() {
    particle_sets.forEach(function(particles, index) {
      particles.forEach(function(particle) {
        particle.update(index);
        particle.display(index);
      });
    });
  };

  // Resize canvas when window is resized
  p.windowResized = function() {
    // Store the old dimensions for scaling calculations
    let oldWidth = p.width;
    let oldHeight = p.height;
    
    // Only resize the canvas, don't regenerate particles
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    
    // If we have existing particles, scale their positions proportionally
    // This preserves the animation state while adapting to new dimensions
    if (particle_sets.length > 0) {
      let scaleX = p.width / oldWidth;
      let scaleY = p.height / oldHeight;
      
      particle_sets.forEach(function(particles) {
        particles.forEach(function(particle) {
          // Scale particle positions to match new canvas dimensions
          particle.pos.x *= scaleX;
          particle.pos.y *= scaleY;
        });
      });
    }
  };

  p.keyPressed = function() {
    if (p.keyCode === 80) p.saveCanvas('sketch_' + THE_SEED, 'jpeg');
  };

  class Particle {
    constructor(x, y, phi) {
      this.pos = p.createVector(x, y);
      this.angle = phi;
      this.val = 0;
      this.altitude = 0;
    }

    update(index) {
      this.pos.x += p.cos(this.angle);
      this.pos.y += p.sin(this.angle);

      let nx = p.map(this.pos.y, 0, p.height + 100, 4, 0.5) * p.map(this.pos.x, 0, p.width, -1, 1);
      let ny = 2 * p.map(this.pos.y, 0, p.height + 100, 4, 1) * p.map(this.pos.y, 0, p.height, -1, 1);

      let n = p.createVector(nx, ny);

      this.altitude = p.noise(n.x + 423.2, n.y - 231.1);
      let nval = (this.altitude + 0.045 * (index - number_of_particle_sets / 2)) % 1;

      this.angle += 3 * p.map(nval, 0, 1, -1, 1);
      this.val = nval;
    }

    display(index) {
      if (this.val > 0.482 && this.val < 0.518) {
        p.push();
        p.translate(this.pos.x, this.pos.y + 10 - this.altitude * 40 * p.map(this.pos.y, 0, p.height + 100, 1, 4));
        p.rotate(this.angle);
        p.point(0, 0);
        p.pop();
      }
    }
  }
};

// Initialize the background animation
new p5(sketch);
