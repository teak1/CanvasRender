import Color from './Color';
import Canvas from './Canvas';
let lastFillColor = null;
let lastStrokeColor = null;
export default class Renderable {
    public colorFill: any;
    public colorStroke: any;
    constructor(fill = Color(0, 0, 0, 1), stroke = Color(0, 0, 0, 1)) {
        this.colorFill = fill;
        this.colorStroke = stroke;
    }
    setColor(ctx) {
        ctx.fillStyle = this.colorFill.toString();
        ctx.strokeStyle = this.colorStroke.toString();
    }
    draw(ctx) {
        if (lastFillColor != ctx.fillStyle || lastStrokeColor != ctx.strokeStyle) {
            ctx.fill();
            ctx.stroke();
            lastFillColor = ctx.fillStyle;
            lastStrokeColor = ctx.strokeStyle;
        }
    }
    public canvas() {
        return Canvas.getGlobalCanvas();
    }
    public context() {
        return this.canvas().context;
    }
}