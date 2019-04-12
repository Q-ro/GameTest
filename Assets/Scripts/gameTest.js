/*######################################################################################################
# Author: Andres Mrad (Q-ro)
# Date: Apr/09/2019 11:11 AM
# Description: Main game file
#######################################################################################################*/

// Define the possible states for the game to be in
var gameStates = {
  Spalsh: 1,
  MainMenu: 2,
  Credits: 3,
  Game: 4,
  GameOver: 5,
};

//Set the initial state for the game
let gameState = gameStates.Spalsh;

//Create a Pixi Application
let app = new PIXI.Application({
  width: 1280,         // default: 800
  height: 900,        // default: 600
  antialias: true,    // default: false
  transparent: false, // default: false
  resolution: 1       // default: 1
}
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

// Spalsh screeen asset imports
PIXI.loader
  .add("catSplashGif", "Assets/Images/alienCat.gif")
  .on("progress", loadProgressHandler)
  .load(setup);

// Loading resources
function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%");

  //If you gave your files names as the first argument 
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
}

// On resource load finished
function setup() {
  let catSplash = new PIXI.Sprite(
    PIXI.loader.resources.catSplashGif.texture
  );

  // Set the sprite's location to the bottom center of the screen
  catSplash.x = window.innerWidth / 2 - catSplash.width;
  catSplash.y = window.innerHeight / 2;

  //Add the cat to the stage
  app.stage.addChild(catSplash);
}




