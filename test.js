Can = CR.create_render_surface({});
CR.on(CR.hooks.pre_render, function (context) {
    context.rect(context.width / 2, context.height / 2, context.width, context.height, context.Color("black"), context.Color("black"));
})
CR.on(CR.hooks.render, function (context) {
    for (var j = 0; j < 10; j++) {
        for (var i = 0; i < 10; i++) context.rect(i * 100 + 80, 80 + j * 80, 15, 15, context.Color("red"), context.Color(0, 0, 0, 255), new Date().getTime() / 100 + j * i);
        // debugger;
    }
    // context.rect(100 + 80, 80, 15, 15, context.Color("red"), context.Color(0, 0, 0, 255), new Date().getTime() / 100);
});