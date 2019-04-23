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
    var SplashScene = /** @class */ (function (_super) {
        __extends(SplashScene, _super);
        function SplashScene(screenWidth, screenHeight) {
            var _this = _super.call(this, screenWidth, screenHeight) || this;
            _this.init();
            // Add the assets to be rendered
            _this.addChild(_this.splashAnimatedImage);
            _this.addChild(_this.splashText);
            return _this;
        }
        SplashScene.prototype.init = function () {
            _super.prototype.init.call(this);
            this.SPLASH_IMAGE_ASSET = "Assets/Images/SplashScreen/alienCat";
            this.fadeSplash = false;
            this.timeToChange = 2500;
            this.alpha = 1;
            this.sceneBackgroundColor = 0x1e2021; // Define the background for the current scene
            // Setup the assets
            this.setAnimatedSplashImage();
            this.setSplashText();
        };
        SplashScene.prototype.update = function (deltaTime) {
            _super.prototype.update.call(this, deltaTime);
            console.log(deltaTime);
            // this.splashAnimatedImage.rotation += 0.01;
            if (this.fadeSplash)
                this.timeToChange -= deltaTime;
            if (this.timeToChange < 0)
                this.alpha -= 0.02;
            if (this.alpha <= 0)
                gameTest.ScenesManager.goToScene("gameMenu");
        };
        SplashScene.prototype.fadeOutSplash = function () {
            console.log("splash animation completed");
            this.fadeSplash = true;
        };
        SplashScene.prototype.setAnimatedSplashImage = function () {
            var _this = this;
            // Make sure to do this only once
            if (this.splashAnimatedImage === undefined) {
                var splashAnimatedTextures = [];
                var i = void 0;
                //Get the animated secuence for the cat splash screen
                for (i = 0; i < 4; i++) {
                    var texture = PIXI.Texture.from(this.SPLASH_IMAGE_ASSET + (i + 1) + ".png");
                    splashAnimatedTextures.push(texture);
                }
                // Add a kitty:) 
                this.splashAnimatedImage = new PIXI.extras.AnimatedSprite(splashAnimatedTextures);
            }
            // Center the sprites anchor point
            this.splashAnimatedImage.anchor.x = 0.5;
            this.splashAnimatedImage.anchor.y = 0.5;
            // Move the sprite to the center of the screen
            this.splashAnimatedImage.position.x = this.sceneWidth / 2;
            this.splashAnimatedImage.position.y = (this.sceneHeight / 2) - 45;
            // Set the scale of the image 
            this.splashAnimatedImage.scale.x = 0.65;
            this.splashAnimatedImage.scale.y = 0.65;
            // Define the Animation properties
            this.splashAnimatedImage.animationSpeed = 0.08; // Slow down the animation speed since the animation has very few frames
            this.splashAnimatedImage.currentFrame = 0;
            this.splashAnimatedImage.gotoAndPlay(0);
            this.splashAnimatedImage.loop = false; //Stop the animation from looping after it ends
            this.splashAnimatedImage.onComplete = function () { return _this.fadeOutSplash(); }; //Calls the fade spalsh function upon animation completion
        };
        SplashScene.prototype.setSplashText = function () {
            this.splashText = new PIXI.Text("And Alien Cat Game\nby Andres Mrad (Q-ro)", new PIXI.TextStyle({
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
            this.splashText.pivot.x = 0.5;
            this.splashText.pivot.y = 0.5;
            this.splashText.position.set(this.sceneWidth / 2 - this.splashText.width / 2, (this.sceneHeight / 2) + this.splashText.height + 20);
        };
        SplashScene.prototype.getSceneBackgroundColor = function () {
            return this.sceneBackgroundColor;
        };
        return SplashScene;
    }(gameTest.Scene));
    gameTest.SplashScene = SplashScene;
})(gameTest || (gameTest = {}));
