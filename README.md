# Altitude Trace Header Background

This is a customized version of the p5.js altitude trace sketch with modified colors for use as a header background.

## Files

- `index.html` - Main HTML file to run the sketch
- `sketch.js` - p5.js sketch with custom colors
- `style.css` - CSS styles for integrating as header background
- `README.md` - This file

## Colors Used

- **Background**: RGB(242, 242, 242) - Light gray
- **Foreground**: RGB(10, 48, 185) - Blue traces

## Usage

### As Standalone Page
Open `index.html` in a web browser to view the animated sketch.

### As Header Background
To integrate this into your project as a header background:

1. Copy the files to your project directory
2. Include the CSS file in your HTML:
   ```html
   <link rel="stylesheet" href="style.css">
   ```

3. Add the sketch container to your HTML:
   ```html
   <div class="full-width-header" id="header-sketch">
     <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.10/p5.js"></script>
     <script src="sketch.js"></script>
     <div class="header-content">
       <h1>Your Title</h1>
       <p>Your subtitle or description</p>
     </div>
   </div>
   ```

### Customization Options

- Adjust header height by modifying the `height` property in the CSS classes
- Change canvas size by modifying `p.createCanvas(1400, 900)` in `sketch.js`
- Modify colors by changing:
  - Background: `p.background(242, 242, 242)`
  - Stroke: `p.stroke(10, 48, 185, 10)`

## Features

- Responsive design
- Animated particle traces
- Customizable colors
- Ready for web integration

## Original Source

Based on the altitude trace sketch from [kgolid/p5ycho](https://github.com/kgolid/p5ycho/tree/master/trace4)
