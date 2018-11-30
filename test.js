Can = CR.create_render_surface({});
CR.on(CR.hooks.pre_render, function (context) {
    context.rect(context.width / 2, context.height / 2, context.width, context.height, context.Color("black"), context.Color("black"));
})
CR.on(CR.hooks.render, function (context) {
    for (var j = 0; j < (context.height - 25) / 45 - 1; j++) {
        for (var i = 0; i < (context.width - 25) / 45 - 1; i++) {
            context.rect(i * 45 + 25, 25 + j * 45, 15, 45, context.Color("red"), context.Color("black"), new Date().getTime() / 10 + i * j);
            context.rect(i * 45 + 25, 30 + j * 45, 15, 45, context.Color("red"), context.Color("black"), new Date().getTime() / 10 + i * j);
        }
        // debugger;
    }
    // context.rect(100 + 80, 80, 15, 15, context.Color("red"), context.Color(0, 0, 0, 255), new Date().getTime() / 100);
});