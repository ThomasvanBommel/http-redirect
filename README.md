# http-redirect

This is a JavaScript module, created for use with NodeJS and the [express](https://github.com/expressjs/express) module.

This program will accept a insecure port (http) and a secure port (https) and redirect all traffic from the insecure port to the secure one.

This program should be used as middleware for the express module.

## TODO
- [ ] accept ports as parameters
- [ ] allow multiple port redirects

## Usage

```js
const HTTPRedirect = require("./modules/http-redirect/http-redirect");
const TLS = require("transport-layer-security");
const express = require("express");

let tls = new TLS();
let app = express();

app.use(HTTPRedirect(tls, app));

app.all("*", (req, res) => {
  /* do stuffs */
});
```
