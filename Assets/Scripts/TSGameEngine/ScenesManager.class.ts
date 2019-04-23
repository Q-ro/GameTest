///<reference path="../../Libs/pixi/pixi.js.d.ts" />
///<reference path="Scene.class.ts" />

// Module
module gameTest {

    export class ScenesManager {

        private static scenes: any = {}; // Contains all the game scenes
        public static currentScene: Scene; // The current scene being displayed
        public static renderer: PIXI.SystemRenderer;

        public static create(width: number, height: number) {
            if (ScenesManager.renderer) return this;

            ScenesManager.renderer = PIXI.autoDetectRenderer(width, height);
            document.body.appendChild(ScenesManager.renderer.view);

            requestAnimationFrame(ScenesManager.loop);
            return this;
        }

        private static loop(time) {
            requestAnimationFrame(function () { ScenesManager.loop(time) });

            if (!this.currentScene || this.currentScene.isPaused()) return;
            this.currentScene.update(time);
            ScenesManager.renderer.render(this.currentScene);
        }

        public static createScene(id: string, TScene: new (width, height) => Scene = Scene): Scene {
            console.log("creating scene : " + id);

            if (ScenesManager.scenes[id]) return undefined;

            var scene = new TScene(this.renderer.width, this.renderer.height);

            // scene.width = this.renderer.width;
            // scene.height = this.renderer.height;

            ScenesManager.scenes[id] = scene;
            return scene;
        }

        public static goToScene(id: string): boolean {

            if (ScenesManager.scenes[id]) {
                if (ScenesManager.currentScene) ScenesManager.currentScene.pause();
                ScenesManager.currentScene = ScenesManager.scenes[id];
                ScenesManager.currentScene.init();
                ScenesManager.currentScene.resume();
                this.setBackgroundColor(ScenesManager.currentScene.getSceneBackgroundColor());
                console.log("switching to scene : " + id);
                return true;
            }
            return false;
        }

        public static setBackgroundColor(color: number) {
            this.renderer.backgroundColor = color;
        }
    }

}




