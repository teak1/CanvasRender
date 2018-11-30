import Vector from './Vector';
export class Box {
    public size: any;
    public theta: number = 0;
    public pos: any;
    public halfsize: any;
    public vertices: Array<any> = [];
    public top: number;
    public left: number;
    constructor(x, y, w, h, theta: number = 0) {
        this.pos = new Vector.Vector2(x, y);
        this.size = new Vector.Vector2(w, h);
        this.halfsize = new Vector.Vector2(w / 2, h / 2);
        this.theta = theta * Math.PI / 180;
    }
    public getTheta(): number {
        return this.theta * 180 / Math.PI;
    }
    public pre_render() {
        if (this.theta) this.vertices = [
            this.pos.add(this.halfsize.invert().rotate(this.theta)),
            this.pos.add(this.halfsize.mult(new Vector.Vector2(-1, 1)).rotate(this.theta)),
            this.pos.add(this.halfsize.rotate(this.theta)),
            this.pos.add(this.halfsize.mult(new Vector.Vector2(1, -1)).rotate(this.theta))
        ];
        this.top = this.pos.y - this.halfsize.y;
        this.left = this.pos.x - this.halfsize.x;
    }
}

export default Box;