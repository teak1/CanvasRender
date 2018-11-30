import Vector from './Vector';
export class Box {
    public size: any;
    public theta: number = 0;
    public pos: any;
    constructor(x, y, w, h, theta: number = 0) {
        this.pos = new Vector.Vector2(x, y);
        this.size = new Vector.Vector2(w, h);
        this.theta = theta * Math.PI / 180;
    }
    public getTheta(): number {
        return this.theta * 180 / Math.PI;
    }
    public halfsize(): any {
        return this.size.shrink(2);
    }
    public left(): number {
        return this.pos.x - this.halfsize().x;
    }
    public top(): number {
        return this.pos.y - this.halfsize().y;
    }
    public vertex1(): any {
        return this.pos.add(this.halfsize().invert().rotate(this.theta));
    }
    public vertex2(): any {
        return this.pos.add(this.halfsize().mult(new Vector.Vector2(-1, 1)).rotate(this.theta));
    }
    public vertex3(): any {
        return this.pos.add(this.halfsize().rotate(this.theta));
    }
    public vertex4(): any {
        return this.pos.add(this.halfsize().mult(new Vector.Vector2(1, -1)).rotate(this.theta));
    }
}

export default Box;