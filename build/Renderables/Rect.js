System.register(["../Renderable", "../renderQueue", "../Box"], function (exports_1, context_1) {
    "use strict";
    var Renderable_1, renderQueue_1, Box_1, Rect;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Renderable_1_1) {
                Renderable_1 = Renderable_1_1;
            },
            function (renderQueue_1_1) {
                renderQueue_1 = renderQueue_1_1;
            },
            function (Box_1_1) {
                Box_1 = Box_1_1;
            }
        ],
        execute: function () {
            //Everything is centered
            Rect = class Rect extends Renderable_1.default {
                constructor(x, y, w, h, fill, stroke, theta = 0) {
                    super(fill, stroke);
                    this.box = new Box_1.default(x, y, w, h, theta);
                }
                render(ctx) {
                    this.setColor(ctx);
                    if (this.box.theta == 0) {
                        ctx.fillRect(this.box.left(), this.box.top(), this.box.size.x, this.box.size.y);
                    }
                    else {
                        ctx.beginPath();
                        ctx.moveTo(this.box.vertex1().x, this.box.vertex1().y);
                        ctx.lineTo(this.box.vertex2().x, this.box.vertex2().y);
                        ctx.lineTo(this.box.vertex3().x, this.box.vertex3().y);
                        ctx.lineTo(this.box.vertex4().x, this.box.vertex4().y);
                        ctx.closePath();
                    }
                    this.draw(ctx);
                }
            };
            exports_1("Rect", Rect);
            exports_1("default", {
                Rect,
                render(x, y, w, h, fill, stroke, theta) {
                    renderQueue_1.default.add(new Rect(x, y, w, h, fill, stroke, theta));
                }
            });
        }
    };
});
//# sourceMappingURL=Rect.js.map