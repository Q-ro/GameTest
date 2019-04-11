/*######################################################################################################
# Author: Andres Mrad (Q-ro)
# Date: Apr/09/2019 11:11 AM
# Description: Main game file
#######################################################################################################*/

// Asset imports
let texture = PIXI.utils.TextureCache["../Images/AlienCat.gif"];
let sprite = new PIXI.Sprite(texture);

//Create a Pixi Application
let app = new PIXI.Application({
  width: 800,         // default: 800
  height: 600,        // default: 600
  antialias: true,    // default: false
  transparent: false, // default: false
  resolution: 1       // default: 1
}
);

// Make sure the canvas fills the available screen realstate
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
// app.renderer;
app.renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

PIXI.utils.sayHello("App created");