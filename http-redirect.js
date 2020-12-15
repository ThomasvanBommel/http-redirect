/**
 * Redirect middleware for express to redirect traffic from the http to https
 * @author Thomas vanBommel
 * @since 12-12-2020
 */
 const https = require("https");
 const http = require("http");

class HTTP_Redirect {
  /**
   * Express middleware for redirecting traffic from http to https.
   * This middleware overrides app.listen method
   * @constructor
   * @param {Object}    options - Node https options (key, cert, pass, etc...)
   * @param {string}    options.key - TLS key string
   * @param {string}    options.cert - TLS certificate string
   * @param {string}    [options.passphrase=""] - Password for encrypted keys
   * @param {Object}    app - Express application "app" obj
   */
  constructor(options, app){
    app.listen = (secure_port=443, insecure_port=80) => {
      this.secure_port = secure_port;

      this.http = http.createServer(app).listen(insecure_port,
        console.log(`Redirecting : http://localhost:${insecure_port}`
      ));

      this.https = https.createServer(options, app).listen(secure_port,
        console.log(`Listening : https://localhost:${secure_port}`
      ));

      this.secure_port = 443;
    };
  }

  /**
   * Middleware function for this object, should be added to express app obj
   * @function
   * @param {Object}    req - Express request "req" object
   * @param {Object}    res - Express response "res" object
   * @param {function}  next - Express next object
   */
  middleware = (req, res, next) => {
    if(!req.secure)
      return res.redirect(`https://${req.hostname}:${this.secure_port}${req.url}`);

    next();
  };
}

/**
 * Express middleware for redirecting traffic from http to https.
 * This middleware overrides app.listen method
 * @constructor
 * @param {Object}    options - Node https options (key, cert, pass, etc...)
 * @param {string}    options.key - TLS key string
 * @param {string}    options.cert - TLS certificate string
 * @param {string}    [options.passphrase=""] - Password for encrypted keys
 * @param {Object}    app - Express application "app" obj
 */
module.exports = (options, app) => {
  return new HTTP_Redirect(options, app).middleware;
};
