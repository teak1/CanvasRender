System.register(["./Vector"], function (exports_1, context_1) {
    "use strict";
    var Vector_1, Box;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Vector_1_1) {
                Vector_1 = Vector_1_1;
            }
        ],
        execute: function () {
            Box = class Box {
                constructor(x, y, w, h, theta = 0) {
                    this.theta = 0;
                    this.pos = new Vector_1.default.Vector2(x, y);
                    this.size = new Vector_1.default.Vector2(w, h);
                    this.theta = theta * Math.PI / 180;
                }
                getTheta() {
                    return this.theta * 180 / Math.PI;
                }
                halfsize() {
                    return this.size.shrink(2);
                }
                left() {
                    return this.pos.x - this.halfsize().x;
                }
                top() {
                    return this.pos.y - this.halfsize().y;
                }
                vertex1() {
                    return this.pos.add(this.halfsize().invert().rotate(this.theta));
                }
                vertex2() {
                    return this.pos.add(this.halfsize().mult(new Vector_1.default.Vector2(-1, 1)).rotate(this.theta));
                }
                vertex3() {
                    return this.pos.add(this.halfsize().rotate(this.theta));
                }
                vertex4() {
                    return this.pos.add(this.halfsize().mult(new Vector_1.default.Vector2(1, -1)).rotate(this.theta));
                }
            };
            exports_1("Box", Box);
            exports_1("default", Box);
        }
    };
});
//# sourceMappingURL=Box.js.map