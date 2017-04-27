# cibuci-api

This api built by [loopback](https://loopback.io/doc/en/lb3/index.html) 3.0.

## Special

- `X-Total-Count` (cibuci-admin need this field)

```js
// Set X-Total-Count for all search requests
remotes.after('*.find', function(ctx, next) {
  var filter;
  if (ctx.args && ctx.args.filter) {
    filter = ctx.args.filter.where;
  }

  if (!ctx.res.headersSent) {
    this.count(filter, function(err, count) {
      ctx.res.set('X-Total-Count', count);
      next();
    });
  } else {
    next();
  }
});
```

## Reference

- [loopback-example-access-control](https://github.com/strongloop/loopback-example-access-control): know how admin permission and access control works.
- [loopback-example-user-management](https://github.com/strongloop/loopback-example-user-management): know how user register, login, verify and so on.
- [loopback-getting-started-intermediate](https://github.com/strongloop/loopback-getting-started-intermediate): know simple model relations.
