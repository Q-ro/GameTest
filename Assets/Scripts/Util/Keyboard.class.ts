// Module
module gameTest {

    export class Keyboard {

        public value: any;
        public isDown = false;
        public isUp = true;
        public press = undefined;
        public release = undefined;
        downHandler;
        upHandler;
        downListener;
        upListener;

        constructor(value) {
            this.value = value;
            this.isDown = false;
            this.isUp = true;
            this.press = undefined;
            this.release = undefined;

            this.downHandler = event => {
                if (event.key === this.value) {
                    if (this.isUp && this.press) this.press();
                    this.isDown = true;
                    this.isUp = false;
                    event.preventDefault();
                }
            };

            this.upHandler = event => {
                if (event.key === this.value) {
                    if (this.isDown && this.release) this.release();
                    this.isDown = false;
                    this.isUp = true;
                    event.preventDefault();
                }
            };

            window.addEventListener(
                "keydown", this.downListener, false
            );
            window.addEventListener(
                "keyup", this.upListener, false
            );

        }



    }

}