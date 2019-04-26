///<reference path="../TSGameEngine/Scene.class.ts" />
///<reference path="../TSGameEngine/ScenesManager.class.ts" />
///<reference path="../../Libs/pixi/pixi.js.d.ts" />
///<reference path="../Util/Keyboard.class.ts" />


module gameTest {

    // Class
    export class GameScene extends Scene {

        private keyInput: KeyboardInput;
        private playerMaxBullets: number;

        // yeah, I got lazy
        private playerBullets: {
            sprite: PIXI.Graphics,
            isDestroyed: boolean,
        }[] = []; //stores the player's bullets, serves as a crude implementation of an object pool

        private gameEnemies: {
            sprite: PIXI.extras.AnimatedSprite,
            xVelocity: number,
            yVelocity: number,
            isDestroyed: boolean,
        }[] = []; // Holds a list of all instances of an emey
        private enemySpawnTimer: number = 20000; // Enemies shoudl be spawned every 2 seconds
        private currentenemySpawnTimer: number = 20000; // keep track of the current time between spawns
        private enemyPoints: number = 1500; // how many points the player earns for killign an enemy

        private explosioneEfect: PIXI.extras.AnimatedSprite;
        private playerScoreDisplay: PIXI.Text;
        private playerSprite: PIXI.extras.AnimatedSprite;

        private backgroundNearTextures: PIXI.Sprite[];
        private backgroundFarTextures: PIXI.Sprite[];
        private BACKGROUND_FAR_IMAGE_ASSET: string;
        private BACKGROUND_NEAR_IMAGE_ASSET: string;

        private enemyAnimatedTextures: PIXI.Texture[];
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
            this.BACKGROUND_FAR_IMAGE_ASSET = "Assets/Images/Background/far.png";
            this.BACKGROUND_NEAR_IMAGE_ASSET = "Assets/Images/Background/near.png";
            this.alpha = 1;

            this.playerBullets = [];
            this.gameEnemies = [];
            this.currentenemySpawnTimer = this.enemySpawnTimer;

            this.sceneBackgroundColor = 0x000000;// Define the background for the current scene

            // Setup the assets
            this.setPlayerSprite();
            this.setEnemySprite();
            this.setScoreText();
            this.setBackground();
        }

        constructor(screenWidth, screenHeight) {

            super(screenWidth, screenHeight);

            this.init();

            // Add the assets to be rendered
            this.addChild(this.playerSprite);

            // Event driven keyboard not working propertly, doens't feel right, reverting back to old method
            // this.keyInput = new KeyboardInput();

            // // PRESS LEFT ARROW OR 'A' KEY
            // this.keyInput.addKeycodeCallback(37, this.playerMoveLeft);
            // this.keyInput.addKeycodeCallback(65, this.playerMoveLeft);

            // // PRESS UP ARROW OR 'W' KEY
            // this.keyInput.addKeycodeCallback(38, this.playerMoveUp);
            // this.keyInput.addKeycodeCallback(87, this.playerMoveUp);

            // // PRESS RIGHT ARROW OR 'D' KEY
            // this.keyInput.addKeycodeCallback(39, this.playerMoveRight);
            // this.keyInput.addKeycodeCallback(68, this.playerMoveRight);

            // // PRESS DOWN ARROW OR 'S' KEY
            // this.keyInput.addKeycodeCallback(40, this.playerMoveDown);
            // this.keyInput.addKeycodeCallback(83, this.playerMoveDown);

            // // PRESS SPACE BAR
            // this.keyInput.addKeycodeCallback(32, this.playerShoot);

            // Add keyboard even lsiteners to move the player aroudn the map
            onkeydown = (event) => {

                var key = event.key;
                console.log(key);
                if (key == "w") {
                    this.playerMoveUp();
                }

                if (key == "s") {
                    this.playerMoveDown();
                }

                if (key == "a") {
                    this.playerMoveLeft();
                }

                if (key == "d") {
                    this.playerMoveRight();
                }

                if (key == " ") {

                    // Don't shoot if the max amount of player bullet's have been fired
                    this.playerShoot();

                }
            }

        }

        public update(deltaTime) {
            super.update(deltaTime);

            this.scrollBackground();


            // this.keyInput.inputLoop();

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

            //update player's bullets
            this.updatePlayerBullets();

            // Spawn and update enemies as necessary 
            this.spawnEnemy(deltaTime);
            this.updateEnemies();

            // Make sure the lsoe game condition hasn't been reached yet
            // (A.K.A. the player has not collided with any enemies)
            this.checkGameOver()
        }

        private scrollBackground() {

            // scroll the images at different speeds, and recicle the sprites ocne they exit the screen view
            for (let imageIndex = 0; imageIndex < this.backgroundNearTextures.length; imageIndex++) {
                const backgroundImage = this.backgroundNearTextures[imageIndex];
                backgroundImage.x -= 9.2;
                if (backgroundImage.x <= 0 - 940 * backgroundImage.scale.x) {
                    backgroundImage.x = 940 / 2 * backgroundImage.scale.x * this.backgroundNearTextures.length;
                }
            }

            for (let imageIndex = 0; imageIndex < this.backgroundFarTextures.length; imageIndex++) {
                const backgroundImage = this.backgroundFarTextures[imageIndex];
                backgroundImage.x -= 0.6;
                if (backgroundImage.x <= 0 - 5001 * backgroundImage.scale.x) {
                    backgroundImage.x = 5001 / 2 * backgroundImage.scale.x * this.backgroundFarTextures.length;
                }
            }
        }

        private setBackground() {

            // Make sure to do this only once
            if (this.backgroundFarTextures === undefined) {
                this.backgroundFarTextures = [];
                let i;
                //Get the texture asset for the far section
                // Add it several tiem to give the impresion of an infinite scrolling world
                for (i = 0; i < 3; i++) {
                    const sprite = PIXI.Sprite.from(this.BACKGROUND_FAR_IMAGE_ASSET);
                    sprite.anchor.x = 0;
                    sprite.anchor.y = 1;
                    sprite.scale.y = 0.15;
                    sprite.scale.x = 0.15;
                    // sprite.position.x = ((sprite.width) * i);
                    //using the actual size of the image since sprite.widht property is returning a value between 0 and 1 A.K.A the scale
                    sprite.position.x = ((5001 * sprite.scale.x) * i);
                    sprite.position.y = (this.sceneHeight);
                    this.backgroundFarTextures.push(sprite);
                    this.addChild(this.backgroundFarTextures[i]);

                    console.log(sprite.width);
                    console.log(sprite.position.y);
                    console.log(sprite.position.x);
                }
            }

            // Make sure to do this only once
            if (this.backgroundNearTextures === undefined) {
                this.backgroundNearTextures = [];
                let i;
                //Get the texture asset for the near section
                // Add it several tiem to give the impresion of an infinite scrolling world
                for (i = 0; i < 3; i++) {
                    const sprite = PIXI.Sprite.from(this.BACKGROUND_NEAR_IMAGE_ASSET);
                    sprite.anchor.x = 0;
                    sprite.anchor.y = 1;
                    sprite.scale.x = 0.7;
                    sprite.scale.y = 0.7;
                    //using the actual size of the image since sprite.widht property is returning a value between 0 and 1 A.K.A the scale
                    sprite.position.x = ((940 * sprite.scale.x) * i);
                    sprite.position.y = (this.sceneHeight);
                    this.backgroundNearTextures.push(sprite);
                    this.addChild(this.backgroundNearTextures[i]);

                    // console.log(sprite.position.y);
                    // console.log(sprite.position.x);
                }
            }
        }

        checkGameOver() {
            let isGameOver = false;
            for (let enemyIndex = 0; enemyIndex < this.gameEnemies.length; enemyIndex++) {
                const enemy = this.gameEnemies[enemyIndex];

                if (!enemy.isDestroyed) {
                    if (this.hitTestRectangle(enemy.sprite, this.playerSprite)) {
                        isGameOver = true;
                        break;
                    }
                }
            }

            if (isGameOver) {

                // Make sure to clean up every single enemy and bullet sprite from the scene so that next
                // scene calls (A.K.A.) new games after gaem over, don't have any leftover sprites from previous games
                this.gameEnemies.forEach(function (enemy) {
                    enemy.isDestroyed = true;
                    enemy.sprite.destroy();
                });
                this.playerBullets.forEach(function (bullet) {
                    bullet.isDestroyed = true;
                    bullet.sprite.destroy();
                });

                this.gameEnemies = [];
                this.playerBullets = [];
                ScenesManager.goToScene("gameOver");
            }
        }

        spawnEnemy(deltaTime) {

            // if it's time to spawn a neww enemy do so
            if (this.currentenemySpawnTimer <= 0) {

                // Spawn the enemy at a random position on the right side edge of the screen
                let newEnemySprite = this.getEnemiAnimatedSprite();
                newEnemySprite.x = 750;
                newEnemySprite.y = Math.random() * 500;

                // add the enemy to the array
                this.gameEnemies.push({
                    sprite: newEnemySprite,
                    xVelocity: Math.random() * - 3.2, // set them on a random path towards the general direction of the player
                    yVelocity: Math.random() * - 3.2, // set them on a random path towards the general direction of the player
                    isDestroyed: false,
                });

                //Add to the scene
                this.addChild(this.gameEnemies[this.gameEnemies.length - 1].sprite);

                this.currentenemySpawnTimer = this.enemySpawnTimer; // reset the counter
            }

            this.currentenemySpawnTimer -= deltaTime;
        }

        updateEnemies() {
            this.gameEnemies.forEach(function (enemy) {
                if (enemy.isDestroyed !== true) {
                    enemy.sprite.x += enemy.xVelocity;
                    enemy.sprite.y += enemy.yVelocity;
                }
            });
        }

        private updatePlayerBullets() {
            // Update all bullets positions for the current frame
            this.playerBullets.forEach(function (bullet) {
                if (bullet.isDestroyed !== true) {
                    bullet.sprite.x += 5.5;
                }
            });

            // Check for bullet colitions with enemies
            for (let bulletIndex = 0; bulletIndex < this.playerBullets.length; bulletIndex++) {
                const bullet = this.playerBullets[bulletIndex];

                // if (bullet !== undefined || bullet.transform !== null) {
                if (bullet.isDestroyed !== true) {

                    for (let enemyIndex = 0; enemyIndex < this.gameEnemies.length; enemyIndex++) {
                        const enemy = this.gameEnemies[enemyIndex];

                        // if (enemy !== undefined || enemy.transform !== null) {
                        if (enemy.isDestroyed !== true) {

                            // Make sure we aren't checking collisions for objects that have been already destroyed
                            // if (bullet !== undefined || bullet.transform !== null && enemy !== undefined || enemy.transform !== null) {
                            // if (bullet.isDestroyed !== true && enemy.isDestroyed !== true) {

                            if (this.hitTestRectangle(bullet.sprite, enemy.sprite)) {
                                //TODO: rather than destroying them, perhaps add finish implementing object pooling for both arrays
                                // Destroy both objects
                                // console.log(bullet);
                                // console.log(enemy);


                                // bullet.sprite.destroy();
                                // enemy.sprite.destroy();

                                // console.log(bullet);
                                // console.log(enemy);

                                // SUPER HACK: for whatever reason destroying the objects stopped working and 
                                // I just don't have the time to look into why that's the case
                                bullet.isDestroyed = true;
                                enemy.isDestroyed = true;

                                bullet.sprite.visible = false;
                                enemy.sprite.visible = false;

                                this.setPlayerScore(this.enemyPoints);
                            }
                            // }
                        }
                    }
                }

            }

        }

        private setEnemySprite() {

            // Make sure to do this only once
            if (this.enemyAnimatedTextures === undefined) {

                this.enemyAnimatedTextures = [];
                let i;
                //Get the animated secuence for the cat splash screen
                for (i = 0; i < 4; i++) {
                    const texture = PIXI.Texture.from(`${this.ENEMY_IMAGE_ASSET + (i + 1)}.png`);
                    this.enemyAnimatedTextures.push(texture);
                }

            }

        }

        private getEnemiAnimatedSprite() {
            // Add an evil cat
            let enemySprite = new PIXI.extras.AnimatedSprite(this.enemyAnimatedTextures);

            // Center the sprites anchor point
            enemySprite.anchor.x = 0.5;
            enemySprite.anchor.y = 0.5;
            // Move the sprite to the center of the screen
            enemySprite.position.x = this.sceneWidth / 2;
            enemySprite.position.y = (this.sceneHeight / 2);
            // Set the scale of the image 
            enemySprite.scale.x = 0.35;
            enemySprite.scale.y = 0.35;

            // Define the Animation properties
            enemySprite.animationSpeed = 0.05; // Slow down the animation speed since the animation has very few frames
            enemySprite.currentFrame = 0;
            enemySprite.gotoAndPlay(0); //start playign the animation from teh first frame
            enemySprite.loop = true; //Stop the animation from looping after it ends

            return enemySprite;

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

            this.playerScoreDisplay.pivot.x = 0;
            this.playerScoreDisplay.pivot.y = 0;
            this.playerScoreDisplay.position.set(15, 10);
            this.setPlayerScore(0);
        }

        private setPlayerScore(score) {
            this.playerScoreCounter += score;
            this.playerScoreDisplay.text = "Score : " + this.playerScoreCounter;
            // some hack to ensure score is updated when enemies get killed
            this.addChild(this.playerScoreDisplay);
        }

        private playerMoveRight() {

            this.playerVX = + 1.2;
        }

        private playerMoveLeft() {
            // this.playerSprite.x -= 2.9;
            this.playerVX = - 1.2;
            // this.playerVY = 0;
        }

        private playerMoveUp() {
            // this.playerSprite.y -= 2.9;
            this.playerVY = - 1.2;
            // this.playerVX = 0;
        }

        private playerMoveDown() {
            // this.playerSprite.y += 2.9;
            this.playerVY = + 1.2;
            // this.playerVX = 0;
        }

        private playerShoot() {
            // if (this.playerBullets.length < this.playerMaxBullets) {
            let rectangle = new PIXI.Graphics();
            rectangle.lineStyle(2, 0xFFEEEA, 1);
            rectangle.beginFill(0x66CCFF);
            rectangle.drawRect(0, 0, 12, 5);
            rectangle.endFill();
            rectangle.x = this.playerSprite.x;
            rectangle.y = this.playerSprite.y;

            this.playerBullets.push({
                sprite: rectangle,
                isDestroyed: false
            });

            this.addChild(rectangle);
            // }
        }

        public updatePlayerScore(score) {
            this.playerScoreCounter += score;
            this.setPlayerScore(this.playerScoreCounter);
        }

        public getSceneBackgroundColor() {
            return this.sceneBackgroundColor;
        }

        private hitTestRectangle(r1, r2) {

            //Define the variables we'll need to calculate
            let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

            //hit will determine whether there's a collision
            hit = false;

            //Find the center points of each sprite
            r1.centerX = r1.x + r1.width / 2;
            r1.centerY = r1.y + r1.height / 2;
            r2.centerX = r2.x + r2.width / 2;
            r2.centerY = r2.y + r2.height / 2;

            //Find the half-widths and half-heights of each sprite
            r1.halfWidth = r1.width / 2;
            r1.halfHeight = r1.height / 2;
            r2.halfWidth = r2.width / 2;
            r2.halfHeight = r2.height / 2;

            //Calculate the distance vector between the sprites
            vx = r1.centerX - r2.centerX;
            vy = r1.centerY - r2.centerY;

            //Figure out the combined half-widths and half-heights
            combinedHalfWidths = r1.halfWidth + r2.halfWidth;
            combinedHalfHeights = r1.halfHeight + r2.halfHeight;

            //Check for a collision on the x axis
            if (Math.abs(vx) < combinedHalfWidths) {

                //A collision might be occurring. Check for a collision on the y axis
                if (Math.abs(vy) < combinedHalfHeights) {

                    //There's definitely a collision happening
                    hit = true;
                } else {

                    //There's no collision on the y axis
                    hit = false;
                }
            } else {

                //There's no collision on the x axis
                hit = false;
            }

            //`hit` will be either `true` or `false`
            return hit;
        };

    }
}