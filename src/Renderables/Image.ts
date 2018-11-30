import * as Vector from '../Vector';
import Renderable from '../Renderable';
import render_queue from '../renderQueue';
import Box from '../Box';

//Everything is centered
export class ImageRenderable extends Renderable {
    public img: HTMLImageElement;
    public box: Box;
    constructor(URL, x, y, w, h, theta = 0) {
        super();
        this.img = new Image();
        this.img.src = URL;
        this.box = new Box(x, y, w, h, theta);
    }
    public render(ctx) {
        ctx.save();
        ctx.translate(-this.box.pos.x, -this.box.pos.y);
        ctx.rotate(this.box.theta);
        ctx.drawImage(this.img, -this.box.size.x / 2, -this.box.size.y / 2, this.box.size.x, this.box.size.y);
        ctx.restore();
    }
}