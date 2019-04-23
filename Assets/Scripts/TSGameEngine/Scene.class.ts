///<reference path="../../Libs/pixi/pixi.js.d.ts" />

//Module
module gameTest {

    export class Scene extends PIXI.Container {
        private paused: boolean = false;
        private updateCB = function (time) { };
        protected sceneWidth: number;
        protected sceneHeight: number;
        protected sceneBackgroundColor: number; // Background color for the scene

        constructor(screenWidth, screenHeight) {
            super();
            this.sceneWidth = screenWidth;
            this.sceneHeight = screenHeight;
        }

        public onUpdate(updateCB: () => void) {
            this.updateCB = updateCB;
        }

        public update(time) {
            this.updateCB(time);
        }
        public pause() {
            this.paused = true;
        }
        public resume() {
            this.paused = false;
        }
        public isPaused() {
            return this.paused;
        }

        public init() {
            this.paused = false;
        }

        public getSceneBackgroundColor() {
            return this.sceneBackgroundColor;
        }

    }

}