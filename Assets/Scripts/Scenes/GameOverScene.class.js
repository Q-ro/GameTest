///<reference path="../../Libs/pixi/pixi.js.d.ts" />
///<reference path="../TSGameEngine/Scene.class.ts" />
///<reference path="../TSGameEngine/ScenesManager.class.ts" />
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
    var GameOverScene = /** @class */ (function (_super) {
        __extends(GameOverScene, _super);
        function GameOverScene(screenWidth, screenHeight) {
            var _this = _super.call(this, screenWidth, screenHeight) || this;
            _this.init();
            return _this;
        }
        GameOverScene.prototype.init = function () {
            _super.prototype.init.call(this);
            // this.score = score;
            this.alpha = 1;
            this.sceneBackgroundColor = 0x000000; // Define the background for the current scene
            this.setGameOverText();
        };
        GameOverScene.prototype.setGameOverText = function () {
            this.gameOverDisplay = new PIXI.Text("GAME OVER", new PIXI.TextStyle({
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
            this.gameOverDisplay.pivot.x = 0.5;
            this.gameOverDisplay.pivot.y = 0.5;
            this.gameOverDisplay.interactive = true;
            this.gameOverDisplay.buttonMode = true;
            this.gameOverDisplay.position.set(this.sceneHeight / 2, this.sceneWidth / 2);
            this.addChild(this.gameOverDisplay);
            this.gameOverDisplay.on('tap', function (event) {
                gameTest.ScenesManager.goToScene("gameMenu");
            });
            this.gameOverDisplay.on('click', function (event) {
                gameTest.ScenesManager.goToScene("gameMenu");
            });
        };
        return GameOverScene;
    }(gameTest.Scene));
    gameTest.GameOverScene = GameOverScene;
})(gameTest || (gameTest = {}));
