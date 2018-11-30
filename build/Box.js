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
                    this.vertices = [];
                    this.pos = new Vector_1.default.Vector2(x, y);
                    this.size = new Vector_1.default.Vector2(w, h);
                    this.halfsize = new Vector_1.default.Vector2(w / 2, h / 2);
                    this.theta = theta * Math.PI / 180;
                }
                getTheta() {
                    return this.theta * 180 / Math.PI;
                }
                pre_render() {
                    if (this.theta)
                        this.vertices = [
                            this.pos.add(this.halfsize.invert().rotate(this.theta)),
                            this.pos.add(this.halfsize.mult(new Vector_1.default.Vector2(-1, 1)).rotate(this.theta)),
                            this.pos.add(this.halfsize.rotate(this.theta)),
                            this.pos.add(this.halfsize.mult(new Vector_1.default.Vector2(1, -1)).rotate(this.theta))
                        ];
                    this.top = this.pos.y - this.halfsize.y;
                    this.left = this.pos.x - this.halfsize.x;
                }
            };
            exports_1("Box", Box);
            exports_1("default", Box);
        }
    };
});
//# sourceMappingURL=Box.js.map