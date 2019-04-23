/*######################################################################################################
# Author: Andres Mrad (Q-ro)
# Date: Apr/09/2019 11:11 AM
# Description: Main game file
#######################################################################################################*/

// Define the possible states for the game
var gameStates = {
  Splash: 1,
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

// Import game assets
PIXI.loader
  // Import splash screeen asset
  .add("catSplash1", "Assets/Images/SplashScreen/alienCat1.png")
  .add("catSplash2", "Assets/Images/SplashScreen/alienCat2.png")
  .add("catSplash3", "Assets/Images/SplashScreen/alienCat3.png")
  .add("catSplash4", "Assets/Images/SplashScreen/alienCat1.png")
  // Import game assets
  .add("catPlayer1", "Assets/Images/Player/alienCat1.png")
  .add("catPlayer2", "Assets/Images/Player/alienCat2.png")
  .add("catPlayer3", "Assets/Images/Player/alienCat3.png")
  .add("catPlayer4", "Assets/Images/Player/alienCat4.png")
  .add("catPlayer5", "Assets/Images/Player/alienCat5.png")
  .add("catPlayer6", "Assets/Images/Player/alienCat6.png")
  .add("catPlayer7", "Assets/Images/Player/alienCat7.png")
  .add("catPlayer8", "Assets/Images/Player/alienCat8.png")
  .add("catPlayer9", "Assets/Images/Player/alienCat9.png")
  .add("catPlayer10", "Assets/Images/Player/alienCat10.png")
  .add("catPlayer11", "Assets/Images/Player/alienCat11.png")
  .add("catPlayer12", "Assets/Images/Player/alienCat12.png")
  .on("progress", loadProgressHandler)
  .load(setupGame);

// Loading resources
function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%");

  //If you gave your files names as the first argument 
  //of the `add` method, you can access them like this
  console.log("loading: " + resource.name);
}

// On resource load finished
function setupGame() {

  const splashAnimationTextures = [];

  splashAnimationTextures.push(PIXI.loader.resources.catSplash1.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash1.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash1.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash1.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash2.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash2.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash2.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash2.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash2.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash2.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash2.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash2.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash3.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash3.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash3.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash3.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash3.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash3.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash3.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash3.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash3.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash3.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash3.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash3.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash3.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);
  splashAnimationTextures.push(PIXI.loader.resources.catSplash4.texture);

  const catSplash = new PIXI.extras.AnimatedSprite(splashAnimationTextures);

  // Set the sprite's location to the bottom center of the screen
  catSplash.x = window.innerWidth / 2 - catSplash.height / 2;
  catSplash.y = window.innerHeight / 2 + catSplash.height / 2;

  catSplash.anchor.x = 0.5;
  catSplash.anchor.y = 0.5;

  catSplash.gotoAndPlay(0);
  
  //Add the cat to the stage
  app.stage.addChild(catSplash);
}




