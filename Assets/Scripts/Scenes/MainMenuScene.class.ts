///<reference path="../TSGameEngine/Scene.class.ts" />
///<reference path="../TSGameEngine/ScenesManager.class.ts" />
///<reference path="../../Libs/pixi/pixi.js.d.ts" />


module gameTest {

    // Class
    export class MainMenuScene extends Scene {

        private mainMenuText: PIXI.Text;
        private mainMenuButton1: PIXI.Text;
        private mainMenuButton2: PIXI.Text;
        private mainMenuButton3: PIXI.Text;
        private mainMenuButtonExit: PIXI.Text;
        private menuAnimatedImage: PIXI.extras.AnimatedSprite;
        private MENU_IMAGE_ASSET: string;

        private boolTransitionToGame: boolean = false;

        public init() {
            super.init();

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

            this.sceneBackgroundColor = 0x010202;// Define the background for the current scene
        }

        constructor(screenWidth, screenHeight) {

            super(screenWidth, screenHeight);

            this.init();

            // Add the assets to be rendered
            this.addChild(this.menuAnimatedImage);
            this.addChild(this.mainMenuText);
            this.addChild(this.mainMenuButton1);
            this.addChild(this.mainMenuButton2);
            this.addChild(this.mainMenuButton3);
            this.addChild(this.mainMenuButtonExit);
        }

        public update(deltaTime) {
            super.update(deltaTime);

            if (this.boolTransitionToGame)
                this.alpha -= 0.02;

            if (this.alpha <= 0)
                ScenesManager.goToScene("game");
        }



        private setMainMenuImage() {

            //Make sure to only import assets once
            if (this.menuAnimatedImage === undefined) {
                const mainMenuAnimatedTextures = [];
                let i;
                //Get the animated secuence for the cat splash screen
                for (i = 0; i < 12; i++) {
                    const texture = PIXI.Texture.from(`${this.MENU_IMAGE_ASSET + (i + 1)}.png`);
                    mainMenuAnimatedTextures.push(texture);
                }

                // Add a kitty:) 
                this.menuAnimatedImage = new PIXI.extras.AnimatedSprite(mainMenuAnimatedTextures);
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

        }

        private setMainMenuText() {

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
                dropShadowDistance: 6,
            }));

            this.mainMenuText.pivot.x = 0.5;
            this.mainMenuText.pivot.y = 0.5;
            this.mainMenuText.position.set(this.sceneWidth / 2 - this.mainMenuText.width / 2, (this.sceneHeight / 2) + this.mainMenuText.height - 190);

        }

        private setMainMenuButton1() {

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
                dropShadowDistance: 6,
            }));

            this.mainMenuButton1.pivot.x = 0.5;
            this.mainMenuButton1.pivot.y = 0.5;
            this.mainMenuButton1.interactive = true;
            this.mainMenuButton1.buttonMode = true;
            this.mainMenuButton1.position.set(this.sceneWidth / 4 - this.mainMenuButton1.width / 2, (this.sceneHeight / 2) + this.mainMenuButton1.height + 10);

            // wen the button is tapped or clicked, go to scene "Game 1" (A.K.A. the game)
            this.mainMenuButton1.on('tap', (event) => {
                console.log("GO TO GAME 1");
                this.boolTransitionToGame = true;
            });

            this.mainMenuButton1.on('click', (event) => {
                console.log("GO TO GAME 1");
                this.boolTransitionToGame = true;
            });

        }

        private setMainMenuButton2() {

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
                dropShadowDistance: 6,
            }));

            this.mainMenuButton2.pivot.x = 0.5;
            this.mainMenuButton2.pivot.y = 0.5;
            this.mainMenuButton2.interactive = true;
            this.mainMenuButton2.buttonMode = true;
            this.mainMenuButton2.position.set(2 * this.sceneWidth / 4 - this.mainMenuButton2.width / 2, (this.sceneHeight / 2) + this.mainMenuButton2.height + 10);

            // wen the button is tapped or clicked, go to scene "Game 2" (A.K.A. the game)
            this.mainMenuButton2.on('tap', (event) => {
                console.log("GO TO GAME 2");
                this.boolTransitionToGame = true;
            });

            this.mainMenuButton2.on('click', (event) => {
                console.log("GO TO GAME 2");
                this.boolTransitionToGame = true;
            });

        }

        private setMainMenuButton3() {

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
                dropShadowDistance: 6,
            }));

            this.mainMenuButton3.pivot.x = 0.5;
            this.mainMenuButton3.pivot.y = 0.5;
            this.mainMenuButton3.interactive = true;
            this.mainMenuButton3.buttonMode = true;
            this.mainMenuButton3.position.set(3 * this.sceneWidth / 4 - this.mainMenuButton3.width / 2, (this.sceneHeight / 2) + this.mainMenuButton3.height + 10);

            // wen the button is tapped or clicked, go to scene "Game 3" (A.K.A. the game)
            this.mainMenuButton3.on('tap', (event) => {
                console.log("GO TO GAME 3");
                this.boolTransitionToGame = true;
            });

            this.mainMenuButton3.on('click', (event) => {
                console.log("GO TO GAME 3");
                this.boolTransitionToGame = true;
            });

        }

        private setMainMenuButtonExit() {

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
                dropShadowDistance: 6,
            }));

            this.mainMenuButtonExit.pivot.x = 0.5;
            this.mainMenuButtonExit.pivot.y = 0.5;
            this.mainMenuButtonExit.interactive = true;
            this.mainMenuButtonExit.buttonMode = true;
            this.mainMenuButtonExit.position.set(this.sceneWidth / 2 - this.mainMenuButtonExit.width / 2, (this.sceneHeight / 2) + this.mainMenuButtonExit.height + 100);

            // wen the button is tapped or clicked, go to scene "Google.com"
            this.mainMenuButtonExit.on('tap', (event) => {
                console.log("GO TO Google");
                window.location.href = "http://www.google.com";
            });

            this.mainMenuButtonExit.on('click', (event) => {
                console.log("GO TO Google");
                window.location.href = "http://www.google.com";
            });

        }

    }
}