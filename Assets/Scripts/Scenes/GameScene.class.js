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
    var GameScene = /** @class */ (function (_super) {
        __extends(GameScene, _super);
        function GameScene(screenWidth, screenHeight) {
            var _this = _super.call(this, screenWidth, screenHeight) || this;
            _this.playerVX = 0;
            _this.playerVY = 0;
            _this.init();
            // Add the assets to be rendered
            _this.addChild(_this.playerSprite);
            _this.addChild(_this.playerScoreDisplay);
            // Add keyboard even lsiteners to move the player aroudn the map
            onkeydown = function (event) {
                var key = event.key;
                console.log(key);
                if (key == "w") {
                    // this.playerSprite.y -= 2.9;
                    _this.playerVY = -1.2;
                    // this.playerVX = 0;
                }
                if (key == "s") {
                    // this.playerSprite.y += 2.9;
                    _this.playerVY = +1.2;
                    // this.playerVX = 0;
                }
                if (key == "a") {
                    // this.playerSprite.x -= 2.9;
                    _this.playerVX = -1.2;
                    // this.playerVY = 0;
                }
                if (key == "d") {
                    // this.playerSprite.x += 2.9;
                    _this.playerVX = +1.2;
                    // this.playerVY = 0;
                }
                if (key == " ") {
                    var rectangle = new PIXI.Graphics();
                    rectangle.lineStyle(4, 0xFF3300, 1);
                    rectangle.beginFill(0x66CCFF);
                    rectangle.drawRect(0, 0, 64, 64);
                    rectangle.endFill();
                    rectangle.x = _this.playerSprite.x;
                    rectangle.y = _this.playerSprite.y;
                    _this.addChild(rectangle);
                }
            };
            return _this;
        }
        GameScene.prototype.init = function () {
            _super.prototype.init.call(this);
            this.playerScoreCounter = 0;
            this.PLAYER_IMAGE_ASSET = "Assets/Images/Player/catPlayer";
            this.ENEMY_IMAGE_ASSET = "Assets/Images/Enemy/enemy";
            this.alpha = 1;
            this.sceneBackgroundColor = 0x000000; // Define the background for the current scene
            // Setup the assets
            this.setPlayerSprite();
            this.setEnemySprite();
            this.setScoreText();
        };
        GameScene.prototype.update = function (deltaTime) {
            _super.prototype.update.call(this, deltaTime);
            // accelerate the player towards the key input
            this.playerSprite.x += this.playerVX;
            this.playerSprite.y += this.playerVY;
            // deaccelerate the player gradually
            // this.playerVX -= 0.01;
            // this.playerVY += 0.01;
            //Math.sign nto working, have no time to figure our why, implementing work around
            // this.playerVY = Math.sign(this.playerVY)* Math.min((Math.abs(this.playerVY) - 0.01), 0);
            this.playerVX = this.playerVX > 0 ? Math.max((Math.abs(this.playerVX) - 0.01), 0) : -1 * Math.max((Math.abs(this.playerVX) - 0.01), 0);
            this.playerVY = this.playerVY > 0 ? Math.max((Math.abs(this.playerVY) - 0.01), 0) : -1 * Math.max((Math.abs(this.playerVY) - 0.01), 0);
        };
        GameScene.prototype.setEnemySprite = function () {
            // Make sure to do this only once
            if (this.enemyImage === undefined) {
                var enemyAnimatedTextures = [];
                var i = void 0;
                //Get the animated secuence for the cat splash screen
                for (i = 0; i < 4; i++) {
                    var texture = PIXI.Texture.from(this.ENEMY_IMAGE_ASSET + (i + 1) + ".png");
                    enemyAnimatedTextures.push(texture);
                }
                // Add a space ship
                this.enemyImage = new PIXI.extras.AnimatedSprite(enemyAnimatedTextures);
            }
            // Center the sprites anchor point
            this.enemyImage.anchor.x = 0.5;
            this.enemyImage.anchor.y = 0.5;
            // Move the sprite to the center of the screen
            this.enemyImage.position.x = this.sceneWidth / 2;
            this.enemyImage.position.y = (this.sceneHeight / 2);
            // Set the scale of the image 
            this.enemyImage.scale.x = 0.65;
            this.enemyImage.scale.y = 0.65;
            // Define the Animation properties
            this.enemyImage.animationSpeed = 0.05; // Slow down the animation speed since the animation has very few frames
            this.enemyImage.currentFrame = 0;
            this.enemyImage.gotoAndPlay(0); //start playign the animation from teh first frame
            this.enemyImage.loop = true; //Stop the animation from looping after it ends
        };
        GameScene.prototype.setPlayerSprite = function () {
            // Make sure to do this only once
            if (this.playerSprite === undefined) {
                var playerAnimatedTextures = [];
                var i = void 0;
                //Get the animated secuence for the cat splash screen
                for (i = 0; i < 12; i++) {
                    var texture = PIXI.Texture.from(this.PLAYER_IMAGE_ASSET + (i + 1) + ".png");
                    playerAnimatedTextures.push(texture);
                }
                // Add a kitty:) 
                this.playerSprite = new PIXI.extras.AnimatedSprite(playerAnimatedTextures);
            }
            // Center the sprites anchor point
            this.playerSprite.anchor.x = 0.5;
            this.playerSprite.anchor.y = 0.5;
            // Move the sprite to the center of the screen
            this.playerSprite.position.x = this.sceneWidth / 2 - 200;
            this.playerSprite.position.y = (this.sceneHeight / 2) - 45;
            // Set the scale of the image 
            this.playerSprite.scale.x = 0.18;
            this.playerSprite.scale.y = 0.18;
            // Define the Animation properties
            this.playerSprite.animationSpeed = 0.35; // Slow down the animation speed since the animation has very few frames
            this.playerSprite.currentFrame = 0;
            this.playerSprite.gotoAndPlay(0); //start playign the animation from teh first frame
            this.playerSprite.loop = true; //Stop the animation from looping after it ends
        };
        GameScene.prototype.setScoreText = function () {
            this.playerScoreDisplay = new PIXI.Text("", new PIXI.TextStyle({
                fontFamily: "Arial",
                fontSize: 35,
                fill: "white",
                stroke: '#266f93',
                strokeThickness: 4,
                dropShadow: true,
                dropShadowColor: "#000000",
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6
            }));
            this.setPlayerScore(0);
            this.playerScoreDisplay.pivot.x = 0;
            this.playerScoreDisplay.pivot.y = 0;
            this.playerScoreDisplay.position.set(15, 10);
        };
        GameScene.prototype.setPlayerScore = function (score) {
            this.playerScoreCounter = score;
            this.playerScoreDisplay.text = "Score : " + this.playerScoreCounter;
        };
        GameScene.prototype.updatePlayerScore = function (score) {
            this.playerScoreCounter += score;
            this.setPlayerScore(this.playerScoreCounter);
        };
        GameScene.prototype.getSceneBackgroundColor = function () {
            return this.sceneBackgroundColor;
        };
        return GameScene;
    }(gameTest.Scene));
    gameTest.GameScene = GameScene;
})(gameTest || (gameTest = {}));
