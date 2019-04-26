///<reference path="../../Libs/pixi/pixi.js.d.ts" />
///<reference path="../TSGameEngine/Scene.class.ts" />
///<reference path="../TSGameEngine/ScenesManager.class.ts" />

module gameTest {

    // Class
    export class GameOverScene extends Scene {

        // private score;
        private gameOverDisplay: PIXI.Text;

        constructor(screenWidth, screenHeight) {
            super(screenWidth, screenHeight);

            this.init();
        }

        public init() {
            super.init();
            // this.score = score;
            this.alpha = 1;

            this.sceneBackgroundColor = 0x000000;// Define the background for the current scene

            this.setGameOverText();
        }

        private setGameOverText() {

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
                dropShadowDistance: 6,
            }));

            this.gameOverDisplay.pivot.x = 0.5;
            this.gameOverDisplay.pivot.y = 0.5;
            this.gameOverDisplay.interactive = true;
            this.gameOverDisplay.buttonMode = true;
            this.gameOverDisplay.position.set(this.sceneHeight / 2, this.sceneWidth / 2);
            this.addChild(this.gameOverDisplay);

            this.gameOverDisplay.on('tap', (event) => {
                ScenesManager.goToScene("gameMenu");
            });

            this.gameOverDisplay.on('click', (event) => {
                ScenesManager.goToScene("gameMenu");
            });
        }

    }
}