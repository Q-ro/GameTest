///<reference path="../TSGameEngine/Scene.class.ts" />
///<reference path="../TSGameEngine/ScenesManager.class.ts" />
///<reference path="../../Libs/pixi/pixi.js.d.ts" />


module gameTest {

    // Class
    export class GameScene extends Scene {

        private playerScoreDisplay: PIXI.Text;
        private playerSprite: PIXI.extras.AnimatedSprite;
        private playerBulletSprite: PIXI.extras.AnimatedSprite;
        private enemyImage: PIXI.extras.AnimatedSprite;
        private PLAYER_IMAGE_ASSET: string;
        private ENEMY_IMAGE_ASSET: string;

        private isGameOver: boolean;
        private playerScoreCounter: number;

        private playerVX: number = 0;
        private playerVY: number = 0;

        public init() {
            super.init();

            this.playerScoreCounter = 0;
            this.PLAYER_IMAGE_ASSET = "Assets/Images/Player/catPlayer";
            this.ENEMY_IMAGE_ASSET = "Assets/Images/Enemy/enemy";
            this.alpha = 1;

            this.sceneBackgroundColor = 0x000000;// Define the background for the current scene

            // Setup the assets
            this.setPlayerSprite();
            this.setEnemySprite();
            this.setScoreText();
        }

        constructor(screenWidth, screenHeight) {

            super(screenWidth, screenHeight);

            this.init();

            // Add the assets to be rendered
            this.addChild(this.playerSprite);
            this.addChild(this.playerScoreDisplay);

            // Add keyboard even lsiteners to move the player aroudn the map
            onkeydown = (event) => {
                var key = event.key;
                console.log(key);
                if (key == "w") {
                    // this.playerSprite.y -= 2.9;
                    this.playerVY = - 1.2;
                    // this.playerVX = 0;
                }

                if (key == "s") {
                    // this.playerSprite.y += 2.9;
                    this.playerVY = + 1.2;
                    // this.playerVX = 0;
                }

                if (key == "a") {
                    // this.playerSprite.x -= 2.9;
                    this.playerVX = - 1.2;
                    // this.playerVY = 0;
                }

                if (key == "d") {
                    // this.playerSprite.x += 2.9;
                    this.playerVX = + 1.2;
                    // this.playerVY = 0;
                }

                if (key == " ") {

                    let rectangle = new PIXI.Graphics();
                    rectangle.lineStyle(4, 0xFF3300, 1);
                    rectangle.beginFill(0x66CCFF);
                    rectangle.drawRect(0, 0, 10, 12);
                    rectangle.endFill();
                    rectangle.x = this.playerSprite.x;
                    rectangle.y = this.playerSprite.y;
                    this.addChild(rectangle);

                }
            }

        }

        public update(deltaTime) {
            super.update(deltaTime);

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
        }

        private setEnemySprite() {

            // Make sure to do this only once
            if (this.enemyImage === undefined) {

                const enemyAnimatedTextures = [];
                let i;
                //Get the animated secuence for the cat splash screen
                for (i = 0; i < 4; i++) {
                    const texture = PIXI.Texture.from(`${this.ENEMY_IMAGE_ASSET + (i + 1)}.png`);
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
        }

        private setPlayerSprite() {

            // Make sure to do this only once
            if (this.playerSprite === undefined) {

                const playerAnimatedTextures = [];
                let i;
                //Get the animated secuence for the cat splash screen
                for (i = 0; i < 12; i++) {
                    const texture = PIXI.Texture.from(`${this.PLAYER_IMAGE_ASSET + (i + 1)}.png`);
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
        }

        private setScoreText() {

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
                dropShadowDistance: 6,
            }));

            this.setPlayerScore(0);
            this.playerScoreDisplay.pivot.x = 0;
            this.playerScoreDisplay.pivot.y = 0;
            this.playerScoreDisplay.position.set(15, 10);
        }

        private setPlayerScore(score) {
            this.playerScoreCounter = score;
            this.playerScoreDisplay.text = "Score : " + this.playerScoreCounter;
        }

        public updatePlayerScore(score) {
            this.playerScoreCounter += score;
            this.setPlayerScore(this.playerScoreCounter);
        }

        public getSceneBackgroundColor() {
            return this.sceneBackgroundColor;
        }

    }
}