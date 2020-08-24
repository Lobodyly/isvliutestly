"use strict";

var fetchController = {
  fetch: function fetch(ctx) {
    var interMode = ctx.cookies.get('interMode');
    var mode = ctx.query.mode;
    var redirectUrl = null;

    if (!interMode && mode) {
      ctx.cookies.set('interMode', mode, {
        path: '/',
        expires: new Date(Date.now() + 24 * 3600 * 1000),
        httpOnly: true
      });
      redirectUrl = mode === 'pc' ? '/portal' : '/billing';
    }

    ctx.body = {
      code: 200,
      data: {
        redirectUrl: redirectUrl
      },
      message: '测试成功'
    };
  }
};
module.exports = fetchController;