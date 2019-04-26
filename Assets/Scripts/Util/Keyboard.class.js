/*######################################################################################################
# Author: Andres Mrad (Q-ro)
# Date: Apr/25/2019 @ CURRENT_HOUR:CURRENT_MINUTE
# Description: Implementation of a keyboard controller that subscribes to key inputs events and triggers delegate functions as needed
#######################################################################################################*/
// Module
var gameTest;
(function (gameTest) {
    var KeyboardInput = /** @class */ (function () {
        function KeyboardInput() {
            var _this = this;
            this.keyCallback = {};
            this.keyDown = {};
            this.keyboardDown = function (event) {
                event.preventDefault();
                _this.keyDown[event.keyCode] = true;
            };
            this.keyboardUp = function (event) {
                _this.keyDown[event.keyCode] = false;
            };
            this.addKeycodeCallback = function (keycode, f) {
                _this.keyCallback[keycode] = f;
                _this.keyDown[keycode] = false;
            };
            this.inputLoop = function () {
                for (var key in _this.keyDown) {
                    var is_down = _this.keyDown[key];
                    if (is_down) {
                        var callback = _this.keyCallback[key];
                        if (callback != null) {
                            callback();
                        }
                    }
                }
            };
            document.addEventListener('keydown', this.keyboardDown);
            document.addEventListener('keyup', this.keyboardUp);
        }
        return KeyboardInput;
    }());
    gameTest.KeyboardInput = KeyboardInput;
})(gameTest || (gameTest = {}));
