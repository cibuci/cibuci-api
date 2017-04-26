# cibuci-api

This api built by [loopback](https://loopback.io/doc/en/lb3/index.html) 3.0.

## Link to cibuci-admin

I've add some codes below add the `X-Total-Count` in the header.

```
var remotes = app.remotes();
// Set X-Total-Count for all search requests
remotes.after('*.find', function (ctx, next) {
  var filter;
  if (ctx.args && ctx.args.filter) {
    filter = ctx.args.filter.where;
  }

  if (!ctx.res._headerSent) {
    this.count(filter, function (err, count) {
      ctx.res.set('X-Total-Count', count);
      next();
    });
  } else {
    next();
  }
});
```
