///<reference path="../TSGameEngine/Scene.class.ts" />
///<reference path="../TSGameEngine/ScenesManager.class.ts" />
///<reference path="../../Libs/pixi/pixi.js.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var gameTest;
(function (gameTest) {
    // Class
    var MainMenuScene = /** @class */ (function (_super) {
        __extends(MainMenuScene, _super);
        function MainMenuScene(screenWidth, screenHeight) {
            var _this = _super.call(this, screenWidth, screenHeight) || this;
            _this.boolTransitionToGame = false;
            _this.init();
            // Add the assets to be rendered
            _this.addChild(_this.menuAnimatedImage);
            _this.addChild(_this.mainMenuText);
            _this.addChild(_this.mainMenuButton1);
            _this.addChild(_this.mainMenuButton2);
            _this.addChild(_this.mainMenuButton3);
            _this.addChild(_this.mainMenuButtonExit);
            return _this;
        }
        MainMenuScene.prototype.init = function () {
            _super.prototype.init.call(this);
            this.MENU_IMAGE_ASSET = "Assets/Images/Player/catPlayer";
            this.boolTransitionToGame = false;
            this.alpha = 1;
            // Setup the assets
            this.setMainMenuImage();
            this.setMainMenuText();
            this.setMainMenuButton1();
            this.setMainMenuButton2();
            this.setMainMenuButton3();
            this.setMainMenuButtonExit();
            this.sceneBackgroundColor = 0x010202; // Define the background for the current scene
        };
        MainMenuScene.prototype.update = function (deltaTime) {
            _super.prototype.update.call(this, deltaTime);
            if (this.boolTransitionToGame)
                this.alpha -= 0.02;
            if (this.alpha <= 0)
                gameTest.ScenesManager.goToScene("game");
        };
        MainMenuScene.prototype.setMainMenuImage = function () {
            //Make sure to only import assets once
            if (this.menuAnimatedImage === undefined) {
                var splashAnimatedTextures = [];
                var i = void 0;
                //Get the animated secuence for the cat splash screen
                for (i = 0; i < 12; i++) {
                    var texture = PIXI.Texture.from(this.MENU_IMAGE_ASSET + (i + 1) + ".png");
                    splashAnimatedTextures.push(texture);
                }
                // Add a kitty:) 
                this.menuAnimatedImage = new PIXI.extras.AnimatedSprite(splashAnimatedTextures);
            }
            // Center the sprites anchor point
            this.menuAnimatedImage.anchor.x = 0.5;
            this.menuAnimatedImage.anchor.y = 0.5;
            // Move the sprite to the center of the screen
            this.menuAnimatedImage.position.x = this.sceneWidth / 2;
            this.menuAnimatedImage.position.y = (this.sceneHeight / 2) - 195;
            // Set the scale of the image 
            this.menuAnimatedImage.scale.x = 0.45;
            this.menuAnimatedImage.scale.y = 0.45;
            // Define the Animation properties
            this.menuAnimatedImage.animationSpeed = 0.2; // Slow down the animation speed since the animation has very few frames
            this.menuAnimatedImage.play();
            this.menuAnimatedImage.loop = true; //Stop the animation from looping after it ends
        };
        MainMenuScene.prototype.setMainMenuText = function () {
            this.mainMenuText = new PIXI.Text("Main Menu", new PIXI.TextStyle({
                fontFamily: "Arial",
                fontSize: 44,
                fill: "white",
                stroke: '#266f93',
                strokeThickness: 4,
                dropShadow: true,
                dropShadowColor: "#000000",
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6
            }));
            this.mainMenuText.pivot.x = 0.5;
            this.mainMenuText.pivot.y = 0.5;
            this.mainMenuText.position.set(this.sceneWidth / 2 - this.mainMenuText.width / 2, (this.sceneHeight / 2) + this.mainMenuText.height - 190);
        };
        MainMenuScene.prototype.setMainMenuButton1 = function () {
            var _this = this;
            this.mainMenuButton1 = new PIXI.Text("GAME 1", new PIXI.TextStyle({
                fontFamily: "Arial",
                fontSize: 44,
                fill: "white",
                stroke: '#6457db',
                strokeThickness: 4,
                dropShadow: true,
                dropShadowColor: "#000000",
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6
            }));
            this.mainMenuButton1.pivot.x = 0.5;
            this.mainMenuButton1.pivot.y = 0.5;
            this.mainMenuButton1.interactive = true;
            this.mainMenuButton1.buttonMode = true;
            this.mainMenuButton1.position.set(this.sceneWidth / 4 - this.mainMenuButton1.width / 2, (this.sceneHeight / 2) + this.mainMenuButton1.height + 10);
            // wen the button is tapped or clicked, go to scene "Game 1" (A.K.A. the game)
            this.mainMenuButton1.on('tap', function (event) {
                console.log("GO TO GAME 1");
                _this.boolTransitionToGame = true;
            });
            this.mainMenuButton1.on('click', function (event) {
                console.log("GO TO GAME 1");
                _this.boolTransitionToGame = true;
            });
        };
        MainMenuScene.prototype.setMainMenuButton2 = function () {
            var _this = this;
            this.mainMenuButton2 = new PIXI.Text("GAME 2", new PIXI.TextStyle({
                fontFamily: "Arial",
                fontSize: 44,
                fill: "white",
                stroke: '#6457db',
                strokeThickness: 4,
                dropShadow: true,
                dropShadowColor: "#000000",
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6
            }));
            this.mainMenuButton2.pivot.x = 0.5;
            this.mainMenuButton2.pivot.y = 0.5;
            this.mainMenuButton2.interactive = true;
            this.mainMenuButton2.buttonMode = true;
            this.mainMenuButton2.position.set(2 * this.sceneWidth / 4 - this.mainMenuButton2.width / 2, (this.sceneHeight / 2) + this.mainMenuButton2.height + 10);
            // wen the button is tapped or clicked, go to scene "Game 2" (A.K.A. the game)
            this.mainMenuButton2.on('tap', function (event) {
                console.log("GO TO GAME 2");
                _this.boolTransitionToGame = true;
            });
            this.mainMenuButton2.on('click', function (event) {
                console.log("GO TO GAME 2");
                _this.boolTransitionToGame = true;
            });
        };
        MainMenuScene.prototype.setMainMenuButton3 = function () {
            var _this = this;
            this.mainMenuButton3 = new PIXI.Text("GAME 3", new PIXI.TextStyle({
                fontFamily: "Arial",
                fontSize: 44,
                fill: "white",
                stroke: '#6457db',
                strokeThickness: 4,
                dropShadow: true,
                dropShadowColor: "#000000",
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6
            }));
            this.mainMenuButton3.pivot.x = 0.5;
            this.mainMenuButton3.pivot.y = 0.5;
            this.mainMenuButton3.interactive = true;
            this.mainMenuButton3.buttonMode = true;
            this.mainMenuButton3.position.set(3 * this.sceneWidth / 4 - this.mainMenuButton3.width / 2, (this.sceneHeight / 2) + this.mainMenuButton3.height + 10);
            // wen the button is tapped or clicked, go to scene "Game 3" (A.K.A. the game)
            this.mainMenuButton3.on('tap', function (event) {
                console.log("GO TO GAME 3");
                _this.boolTransitionToGame = true;
            });
            this.mainMenuButton3.on('click', function (event) {
                console.log("GO TO GAME 3");
                _this.boolTransitionToGame = true;
            });
        };
        MainMenuScene.prototype.setMainMenuButtonExit = function () {
            this.mainMenuButtonExit = new PIXI.Text("EXIT", new PIXI.TextStyle({
                fontFamily: "Arial",
                fontSize: 44,
                fill: "white",
                stroke: '#c90c51',
                strokeThickness: 4,
                dropShadow: true,
                dropShadowColor: "#000000",
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6
            }));
            this.mainMenuButtonExit.pivot.x = 0.5;
            this.mainMenuButtonExit.pivot.y = 0.5;
            this.mainMenuButtonExit.interactive = true;
            this.mainMenuButtonExit.buttonMode = true;
            this.mainMenuButtonExit.position.set(this.sceneWidth / 2 - this.mainMenuButtonExit.width / 2, (this.sceneHeight / 2) + this.mainMenuButtonExit.height + 100);
            // wen the button is tapped or clicked, go to scene "Google.com"
            this.mainMenuButtonExit.on('tap', function (event) {
                console.log("GO TO Google");
                window.location.href = "http://www.google.com";
            });
            this.mainMenuButtonExit.on('click', function (event) {
                console.log("GO TO Google");
                window.location.href = "http://www.google.com";
            });
        };
        return MainMenuScene;
    }(gameTest.Scene));
    gameTest.MainMenuScene = MainMenuScene;
})(gameTest || (gameTest = {}));
