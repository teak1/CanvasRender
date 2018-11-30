System.register(["./Color", "./Vector", "./Canvas", "./stateManager", "./states", "./Renderables/Rect", "./Renderables/Polygon", "./renderQueue"], function (exports_1, context_1) {
    "use strict";
    var Color_1, Vector_1, Canvas_1, stateManager_1, states_1, Rect_1, Polygon_1, renderQueue_1, last_frame_duration, state_manager, render_canvas, avg_frame_time, fremlen, frems, hooks, _hooks;
    var __moduleName = context_1 && context_1.id;
    function __render_loop() {
        let start_time = performance.now();
        let hook_exec_func = function (func) {
            let __current_context = Canvas_1.default.getGlobalCanvas();
            let getState = state_manager.getReadonly();
            let rect = Rect_1.default.render;
            let polygon = Polygon_1.default.render;
            let context = {
                getState,
                rect,
                polygon,
                // circle,
                Color: Color_1.default,
                width: __current_context.canvas.width,
                height: __current_context.canvas.height
            };
            func(context);
        };
        renderQueue_1.default.empty();
        state_manager.setState(states_1.STATES.physics_allowed, true);
        hooks.pre_update.forEach(hook => hook_exec_func(hook));
        hooks.update.forEach(hook => hook_exec_func(hook));
        hooks.post_update.forEach(hook => hook_exec_func(hook));
        state_manager.setState(states_1.STATES.physics_allowed, false);
        state_manager.setState(states_1.STATES.rendering_allowed, true);
        hooks.pre_render.forEach(hook => hook_exec_func(hook));
        hooks.render.forEach(hook => hook_exec_func(hook));
        hooks.post_render.forEach(hook => hook_exec_func(hook));
        state_manager.setState(states_1.STATES.rendering_allowed, false);
        if (render_canvas)
            render_canvas.render();
        window.requestAnimationFrame(_ => __render_loop());
        let end_time = performance.now();
        last_frame_duration = end_time - start_time;
        avg_frame_time += last_frame_duration;
        avg_frame_time /= 2;
        frems.push(1000 / avg_frame_time);
        frems.shift();
        console.log(frems.reduce((a, v) => a + v, 0) / fremlen);
    }
    function __on(thing, func) {
        if (hooks[thing]) {
            hooks[thing].push(func);
            return true;
        }
        return false;
    }
    function create_render_surface({ width = innerWidth, height = innerHeight, parent = document.body }) {
        if (render_canvas) {
            throw new Error("a render surface already exists.");
        }
        render_canvas = Canvas_1.default.createCanvas(width, height);
        render_canvas.put(parent);
        return render_canvas;
    }
    return {
        setters: [
            function (Color_1_1) {
                Color_1 = Color_1_1;
            },
            function (Vector_1_1) {
                Vector_1 = Vector_1_1;
            },
            function (Canvas_1_1) {
                Canvas_1 = Canvas_1_1;
            },
            function (stateManager_1_1) {
                stateManager_1 = stateManager_1_1;
            },
            function (states_1_1) {
                states_1 = states_1_1;
            },
            function (Rect_1_1) {
                Rect_1 = Rect_1_1;
            },
            function (Polygon_1_1) {
                Polygon_1 = Polygon_1_1;
            },
            function (renderQueue_1_1) {
                renderQueue_1 = renderQueue_1_1;
            }
        ],
        execute: function () {
            last_frame_duration = 0;
            state_manager = new stateManager_1.default();
            render_canvas = null;
            avg_frame_time = 0;
            fremlen = 30;
            frems = new Array(fremlen).fill(60);
            hooks = {
                pre_update: new Array(),
                update: new Array(),
                post_update: new Array(),
                pre_render: new Array(),
                render: new Array(),
                post_render: new Array(),
                register_graphics: new Array()
            };
            __render_loop();
            _hooks = states_1.HOOKS;
            window["CR"] = {
                Vector: Vector_1.default,
                on: __on,
                Canvas: Canvas_1.default,
                create_render_surface,
                Color: Color_1.default,
                STATES: states_1.STATES,
                hooks: _hooks,
                DEBUG: {
                    state_manager,
                    hooks,
                    getRenderDuration() {
                        return last_frame_duration;
                    },
                    render_queue() {
                        return renderQueue_1.default;
                    },
                    avg() {
                        return avg_frame_time;
                    }
                }
            };
            // rect = args > que.push([rect, args])
            // , circ, arc
        }
    };
});
//# sourceMappingURL=main.js.map