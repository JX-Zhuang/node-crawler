/**
 * Created by Jesse on 17/3/5.
 */
const http = require("http"),
    request = require("./request"),
    route = require("./router"),
    url = require("url");
let handle = {},
    sessions = require("./sessions");
handle["/login"] = request.login;
handle["/logout"] = request.logout;
handle["/success"] = request.success;
handle["/"] = request.init;
function server(route,handle) {
    function onRequest(req,res) {
        const pathname = url.parse(req.url).pathname;
        route(req,res,handle,pathname);
    }
    http.createServer(onRequest).listen(5560);
}
server(route,handle);

