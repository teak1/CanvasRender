Can = CR.create_render_surface({});
CR.on(CR.hooks.pre_render, function (context) {
    context.rect(context.width / 2, context.height / 2, context.width, context.height, context.Color("black"), context.Color("black"));
})
CR.on(CR.hooks.render, function (context) {
    // for (var i = 0; i < 80; i++) {
    //     context.rect(context.width * Math.random(), context.height * Math.random(), 15, 15, context.Color("red"), context.Color(0, 0, 0, 255), new Date().getTime() / 100);
    // }
});