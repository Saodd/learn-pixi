import * as PIXI from "pixi.js";
import {calcMove, MoveProps} from "../models/move";
import {Character} from "../models/roles";


const bulletContainer = new PIXI.Container()

export class BulletSprite extends PIXI.Sprite {
    moveProps: MoveProps
    enemies: Character[] = []

    constructor(texture: PIXI.Texture, moveProps: MoveProps, enemies: Character[]) {
        super(texture);
        this.moveProps = moveProps
        this.enemies = enemies
    }
}

export function pushBullet(b: BulletSprite) {
    bulletContainer.addChild(b)
}


export function initBulletsTicker(app: PIXI.Application) {
    app.stage.addChild(bulletContainer)
    app.ticker.add(delta => {
        bulletContainer.children.forEach((sp: BulletSprite) => {
            calcMove(sp, delta)
        })
        const toRemove = bulletContainer.children.filter((sp: BulletSprite) => isOutRange(sp, app))
        if (!toRemove.length) return;
        bulletContainer.removeChild(...toRemove)
    })
}

function isOutRange(p: BulletSprite, app: PIXI.Application): boolean {
    if (p.x < 0 || p.x > app.screen.width || p.y < 0 || p.y > app.screen.height) {
        return true
    }
    return false
}
