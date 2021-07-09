import * as PIXI from "pixi.js"


interface BunnyProp {
    speed: number
    turningSpeed: number
    direction: number
}

class BunnySprite extends PIXI.Sprite {
    props: BunnyProp
}

function main() {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    const app = new PIXI.Application({
        width: 1000, height: 1000, backgroundColor: 0x0, resolution: 1,
    });
    document.body.appendChild(app.view);

    const bunnyContainer = new PIXI.Container();
    app.stage.addChild(bunnyContainer);

    const texture = PIXI.Texture.from('https://pixijs.io/examples/examples/assets/bunny.png');

    for (let i = 0; i < 100; i++) {
        const bunny = new BunnySprite(texture);
        bunny.props = {
            speed: Math.random() * 5,
            turningSpeed: Math.random() - 0.8,
            direction: Math.random() * Math.PI * 2,
        }
        bunny.x = Math.random() * app.view.width
        bunny.y = Math.random() * app.view.height
        bunny.tint = Math.random() * 0xFFFFFF
        bunny.scale.set(0.5 + Math.random())
        bunny.anchor.set(0.5)

        bunny.interactive = true;
        bunny.on("pointerdown", function (this: BunnySprite) {
            this.props.direction += Math.PI
        })

        bunnyContainer.addChild(bunny);
    }

    const extraBound = 100
    const bunnyBounds = new PIXI.Rectangle(-extraBound, -extraBound, app.screen.width + 2 * extraBound, app.screen.height + 2 * extraBound)

    app.ticker.add((delta) => {
        bunnyContainer.children.forEach((bunny: BunnySprite) => {
            // 计算运动
            const {props} = bunny
            props.direction += props.turningSpeed * 0.01 * delta
            bunny.x += Math.sin(props.direction) * props.speed * delta
            bunny.y += Math.cos(props.direction) * props.speed * delta
            bunny.rotation = -props.direction - Math.PI

            // 检查超出边界
            if (bunny.x > bunnyBounds.width + bunnyBounds.x) {
                bunny.x -= bunnyBounds.width
            } else if (bunny.x < bunnyBounds.x) {
                bunny.x += bunnyBounds.width
            }
            if (bunny.y > bunnyBounds.height + bunnyBounds.y) {
                bunny.y -= bunnyBounds.height
            } else if (bunny.y < bunnyBounds.y) {
                bunny.y += bunnyBounds.height
            }
        })
    });
}

main()
