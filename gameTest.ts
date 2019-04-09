/*######################################################################################################
# Author: Andres Mrad (Q-ro)
# Date: Apr/09/2019 11:11 AM
# Description: Main game file
#######################################################################################################*/

//Create a Pixi Application
let app = new PIXI.Application({ 
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

PIXI.utils.sayHello("App created")