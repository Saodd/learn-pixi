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
        // 1. 超出边界，消失
        const toRemove = bulletContainer.children.filter((sp: BulletSprite) => isOutRange(sp, app))
        // 2. 碰撞敌人
        bulletContainer.children.forEach((sp: BulletSprite) => {
            for (let enemy of sp.enemies) {
                if (testForAABB(sp, enemy as PIXI.Sprite)) {
                    enemy.onHit()
                    toRemove.push(sp)
                    return
                }
            }
        })
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

function testForAABB(object1: PIXI.Sprite, object2: PIXI.Sprite) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}
