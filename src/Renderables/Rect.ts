import * as Vector from '../Vector';
import Renderable from '../Renderable';
import render_queue from '../renderQueue';
import Box from '../Box';

//Everything is centered
export class Rect extends Renderable {
    public box: Box;
    constructor(x, y, w, h, fill: any, stroke: any, theta: number = 0) {
        super(fill, stroke);
        this.box = new Box(x, y, w, h, theta);
    }
    public render(ctx) {
        this.setColor(ctx);
        if (this.box.theta == 0) {
            ctx.fillRect(this.box.left(), this.box.top(), this.box.size.x, this.box.size.y);
        } else {
            ctx.beginPath();
            ctx.moveTo(this.box.vertex1().x, this.box.vertex1().y);
            ctx.lineTo(this.box.vertex2().x, this.box.vertex2().y);
            ctx.lineTo(this.box.vertex3().x, this.box.vertex3().y);
            ctx.lineTo(this.box.vertex4().x, this.box.vertex4().y);
            ctx.closePath();
        }
        this.draw(ctx);
    }
}
export default {
    Rect,
    render(x, y, w, h, fill, stroke, theta) {
        render_queue.add(new Rect(x, y, w, h, fill, stroke, theta));
    }
}