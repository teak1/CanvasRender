import Vector from './Vector';
export class Box {
    public size: any;
    public theta: number = 0;
    public pos: any;
    public halfsize: any;
    public vertices: Array<any> = [];
    public top: number;
    public left: number;
    public hasRotation: Boolean;
    constructor(x, y, w, h, theta: number = 0) {
        this.pos = new Vector.Vector2(x, y);
        this.size = new Vector.Vector2(w, h);
        this.halfsize = new Vector.Vector2(w / 2, h / 2);
        this.theta = theta * Math.PI / 180;
        this.hasRotation = theta != undefined;
    }
    public getTheta(): number {
        return this.theta * 180 / Math.PI;
    }
    public pre_render() {
        if (this.hasRotation) {
            let c = Math.cos(this.theta);
            let s = Math.sin(this.theta);
            let xc = this.halfsize.x * c;
            let xs = this.halfsize.x * s;
            let yc = this.halfsize.y * c;
            let ys = this.halfsize.y * s;
            this.vertices = [
                new Vector.Vector2(
                    this.pos.x + xc - ys,
                    this.pos.y + yc + xs
                ),
                new Vector.Vector2(
                    this.pos.x - xc - ys,
                    this.pos.y + yc - xs
                ),
                new Vector.Vector2(
                    this.pos.x - xc + ys,
                    this.pos.y - yc - xs
                ),
                new Vector.Vector2(
                    this.pos.x + xc + ys,
                    this.pos.y - yc + xs
                )
            ];
        } else {
            this.top = this.pos.y - this.halfsize.y;
            this.left = this.pos.x - this.halfsize.x;
        }
    }
}

export default Box;