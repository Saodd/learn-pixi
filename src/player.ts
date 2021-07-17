import * as PIXI from "pixi.js";
import {calcMove, distanceOfPoints, MoveProps} from "./models/move";


export class PlayerSprite extends PIXI.Sprite {
    moveProps: MoveProps
}

export function addPlayer(app: PIXI.Application) {
    const texture = PIXI.Texture.from('bunny');
    const player = new PlayerSprite(texture)

    player.anchor.set(0.5)
    player.scale.set(2)  // 52*74
    player.x = app.screen.width * 0.5
    player.y = app.screen.height - 100

    const mp = {
        r: 0,
        ra: 0,
        v: {x: 0, y: 0},
        va: {x: 0, y: 0},
    }
    player.moveProps = mp
    const BaseSpeed = 0.1

    app.stage.addChild(player)
    app.ticker.add(delta => {
        // https://pixijs.io/examples/#/demos-advanced/collision-detection.js
        const mouse = app.renderer.plugins.interaction.mouse.global;
        if (app.screen.width > mouse.x || mouse.x > 0 || app.screen.height > mouse.y || mouse.y > 0) {
            const v = distanceOfPoints(mouse, player)
            const angle = Math.atan2(mouse.y - player.y, mouse.x - player.x)
            mp.v.x = Math.cos(angle) * v * BaseSpeed
            mp.v.y = Math.sin(angle) * v *BaseSpeed
        }
        calcMove(player, delta)
        limitMoveRange(player, app)
    })
}

function limitMoveRange(p: PlayerSprite, app: PIXI.Application) {
    if (p.x < 0) {
        p.x = 0
        p.moveProps.v.x = 0
    } else if (p.x > app.screen.width) {
        p.x = app.screen.width
        p.moveProps.v.x = 0
    }
    if (p.y < 0) {
        p.y = 0
        p.moveProps.v.y = 0
    } else if (p.y > app.screen.height) {
        p.y = app.screen.height
        p.moveProps.v.y = 0
    }
}

