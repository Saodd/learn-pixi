import * as PIXI from "pixi.js"
import {addPlayer} from "./player";


function gameInit(app: PIXI.Application) {
    addPlayer(app)
    app.start()
}

function main() {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;


    const app = new PIXI.Application({
        width: 1000, height: 1000, backgroundColor: 0x0, resolution: 1,
    });
    document.body.appendChild(app.view);
    app.loader
        .add('eggHead', 'https://pixijs.io/examples/examples/assets/eggHead.png')
        .add('flowerTop', 'https://pixijs.io/examples/examples/assets/flowerTop.png')
        .add('helmlok', 'https://pixijs.io/examples/examples/assets/helmlok.png')
        .add('skully', 'https://pixijs.io/examples/examples/assets/skully.png')  // 155*165
        .add('bunny', 'https://pixijs.io/examples/examples/assets/bunny.png') // 26*37
        .load(() => gameInit(app));
}

main()
