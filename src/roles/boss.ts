import * as  PIXI from "pixi.js";
import {calcMove, MoveProps} from "../models/move";

export class BossSprite extends PIXI.Sprite {
    moveProps: MoveProps
    health: number = 100

    onHit() {
        this.health -= 1
        console.log(`boss剩余血量: ${this.health}`)
        if (this.health === 0) {
            bossContainer.removeChild(this)
        } else {
            this.tint = 0xAAAAAA
        }
    }

    turn() {
        if (this.x < 200 || this.x > 800) this.moveProps.v.x *= -1
    }
}

export const bossContainer = new PIXI.Container()

export function initBoss(app: PIXI.Application) {
    addBoss1(app)
    app.stage.addChild(bossContainer)
}

function addBoss1(app: PIXI.Application) {
    const texture = PIXI.Texture.from('skully');// 155*165
    const boss = new BossSprite(texture)

    boss.anchor.set(0.5)
    boss.scale.set(2)
    boss.x = app.screen.width * 0.5
    boss.y = 200

    const mp = {
        r: 0,
        ra: 0,
        v: {x: 5, y: 0},
        va: {x: 0, y: 0},
    }
    boss.moveProps = mp

    bossContainer.addChild(boss)
    app.ticker.add(delta => {
        calcMove(boss, delta)
        boss.tint = 0xFFFFFF
        boss.turn()
    })
}
