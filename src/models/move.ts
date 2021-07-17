export interface Vector {
    x: number;
    y: number;
}


export interface MoveProps {
    v: Vector;
    va: Vector
    r: number;  // PI
    ra: number;  // PI
}


interface _MovableObject {
    moveProps: MoveProps;
    x: number;
    y: number;
    rotation: number;
}

export function calcMove(s: _MovableObject, delta: number) {
    s.x += s.moveProps.v.x * delta;
    s.y += s.moveProps.v.y * delta;
    s.rotation += s.moveProps.r * delta;

    s.moveProps.v.x += s.moveProps.va.x * delta;
    s.moveProps.v.y += s.moveProps.va.y * delta;
    s.moveProps.r += s.moveProps.ra * delta;
}


export function distanceOfPoints(p1: Vector, p2:Vector) {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;
    return Math.hypot(a, b);
}
