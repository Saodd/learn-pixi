import * as PIXI from "pixi.js"


interface BunnyProp {
    speed: number,
    turningSpeed: number,
    direction: number,
}

function main() {
    const app = new PIXI.Application({
        width: 1000, height: 1000, backgroundColor: 0x0, resolution: 1,
    });
    document.body.appendChild(app.view);

    const container = new PIXI.Container();
    app.stage.addChild(container);

    const texture = PIXI.Texture.from('https://pixijs.io/examples/examples/assets/bunny.png');

    const bunnyProps: { bunny: PIXI.Sprite, prop: BunnyProp }[] = []
    for (let i = 0; i < 100; i++) {
        const bunny = new PIXI.Sprite(texture);
        bunny.x = Math.random() * app.view.width
        bunny.y = Math.random() * app.view.height
        bunny.tint = Math.random() * 0xFFFFFF
        bunny.scale.set(0.5 + Math.random())

        const prop: BunnyProp = {
            speed: Math.random()*5,
            turningSpeed: Math.random() - 0.8,
            direction: Math.random() * Math.PI * 2,
        }
        bunnyProps.push({bunny, prop})
        container.addChild(bunny);
    }

    const bunnyBounds = new PIXI.Rectangle(-100, -100, app.screen.width + 200, app.screen.height + 200)

    app.ticker.add((delta) => {
        bunnyProps.forEach(({bunny, prop}, i) => {
            // 计算运动
            prop.direction += prop.turningSpeed * 0.01 * delta
            bunny.x += Math.sin(prop.direction) * prop.speed * delta
            bunny.y += Math.cos(prop.direction) * prop.speed * delta
            bunny.rotation = -prop.direction-Math.PI

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
