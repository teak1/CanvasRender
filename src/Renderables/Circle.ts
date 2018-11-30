import * as Vector from '../Vector';
import Renderable from '../Renderable';
import render_queue from '../renderQueue';

//Everything is centered
export class Circle extends Renderable {
    public pos: Vector.Vec
    constructor(x, y, r, fill: any, stroke: any) {
        super(fill, stroke);
        for (let i = 0; i < args.length; i += 2)
            this.points.push(new Vector.Vector2(args[i], args[i + 1]));
    }
    public render(ctx) {
        this.setColor(ctx);
        ctx.beginPath();

        ctx.closePath();
        this.draw(ctx);
    }
}
export default {
    Polygon,
    render(fill: any, stroke: any, ...args) {
        render_queue.add(new Polygon(fill, stroke, args));
    }
}