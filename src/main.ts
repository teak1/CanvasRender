import Color from './Color';
import Vector from './Vector';
import Canvas from './Canvas';
import StateManager from './stateManager';
import { STATES, HOOKS } from './states';
import Rect from './Renderables/Rect';
import Polygon from './Renderables/Polygon';
import render_queue from './renderQueue';
let last_frame_duration = 0;
let state_manager = new StateManager();
let render_canvas = null;
let avg_frame_time = 0;
let fremlen = 30;
let frems = new Array(fremlen).fill(60);
const hooks = {
    pre_update: new Array<Function>(),
    update: new Array<Function>(),
    post_update: new Array<Function>(),
    pre_render: new Array<Function>(),
    render: new Array<Function>(),
    post_render: new Array<Function>(),
    register_graphics: new Array<Function>()
}

function __render_loop() {
    let start_time = performance.now()
    let hook_exec_func = function (func: Function) {
        let __current_context = Canvas.getGlobalCanvas();
        let getState: Function = state_manager.getReadonly();
        let rect: Function = Rect.render;
        let polygon: Function = Polygon.render;
        let context: Object = {
            getState,
            rect,
            polygon,
            // circle,
            Color,
            width: __current_context.canvas.width,
            height: __current_context.canvas.height
        };
        func(context);
    }
    render_queue.empty();
    state_manager.setState(STATES.physics_allowed, true);
    hooks.pre_update.forEach(hook => hook_exec_func(hook));
    hooks.update.forEach(hook => hook_exec_func(hook));
    hooks.post_update.forEach(hook => hook_exec_func(hook));
    state_manager.setState(STATES.physics_allowed, false);
    state_manager.setState(STATES.rendering_allowed, true);
    hooks.pre_render.forEach(hook => hook_exec_func(hook));
    hooks.render.forEach(hook => hook_exec_func(hook));
    hooks.post_render.forEach(hook => hook_exec_func(hook));
    state_manager.setState(STATES.rendering_allowed, false);
    if (render_canvas) render_canvas.render();
    window.requestAnimationFrame(_ => __render_loop());
    let end_time = performance.now()
    last_frame_duration = end_time - start_time;
    avg_frame_time += last_frame_duration;
    avg_frame_time /= 2;
    frems.push(1000 / avg_frame_time);
    frems.shift();
    console.log(frems.reduce((a, v) => a + v, 0) / fremlen);
}
__render_loop();

function __on(thing: any, func: Function) {
    if (hooks[thing]) {
        hooks[thing].push(func);
        return true;
    }
    return false
}
function create_render_surface({ width = innerWidth, height = innerHeight, parent = document.body }) {
    if (render_canvas) {
        throw new Error("a render surface already exists.");
    }
    render_canvas = Canvas.createCanvas(width, height);
    render_canvas.put(parent);
    return render_canvas;
}
const _hooks = HOOKS;
window["CR"] = {
    Vector,
    on: __on,
    Canvas: Canvas,
    create_render_surface,
    Color,
    STATES,
    hooks: _hooks,
    DEBUG: {
        state_manager,
        hooks,
        getRenderDuration() {
            return last_frame_duration;
        },
        render_queue() {
            return render_queue;
        },
        avg() {
            return avg_frame_time;
        }
    }
};






// rect = args > que.push([rect, args])
// , circ, arc