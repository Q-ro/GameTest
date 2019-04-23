///<reference path="../../Libs/pixi/pixi.js.d.ts" />
///<reference path="Scene.class.ts" />
// Module
var gameTest;
(function (gameTest) {
    var ScenesManager = /** @class */ (function () {
        function ScenesManager() {
        }
        ScenesManager.create = function (width, height) {
            if (ScenesManager.renderer)
                return this;
            ScenesManager.renderer = PIXI.autoDetectRenderer(width, height);
            document.body.appendChild(ScenesManager.renderer.view);
            requestAnimationFrame(ScenesManager.loop);
            return this;
        };
        ScenesManager.loop = function (time) {
            requestAnimationFrame(function () { ScenesManager.loop(time); });
            if (!this.currentScene || this.currentScene.isPaused())
                return;
            this.currentScene.update(time);
            ScenesManager.renderer.render(this.currentScene);
        };
        ScenesManager.createScene = function (id, TScene) {
            if (TScene === void 0) { TScene = gameTest.Scene; }
            console.log("creating scene : " + id);
            if (ScenesManager.scenes[id])
                return undefined;
            var scene = new TScene(this.renderer.width, this.renderer.height);
            // scene.width = this.renderer.width;
            // scene.height = this.renderer.height;
            ScenesManager.scenes[id] = scene;
            return scene;
        };
        ScenesManager.goToScene = function (id) {
            if (ScenesManager.scenes[id]) {
                if (ScenesManager.currentScene)
                    ScenesManager.currentScene.pause();
                ScenesManager.currentScene = ScenesManager.scenes[id];
                ScenesManager.currentScene.init();
                ScenesManager.currentScene.resume();
                this.setBackgroundColor(ScenesManager.currentScene.getSceneBackgroundColor());
                console.log("switching to scene : " + id);
                return true;
            }
            return false;
        };
        ScenesManager.setBackgroundColor = function (color) {
            this.renderer.backgroundColor = color;
        };
        ScenesManager.scenes = {}; // Contains all the game scenes
        return ScenesManager;
    }());
    gameTest.ScenesManager = ScenesManager;
})(gameTest || (gameTest = {}));
