/**
 * Created by Jesse on 17/3/5.
 */
const url = require("url"),
    querystring = require("querystring");
let sessions = require("./sessions");
function init(request, response) {
    const html = `<form method="post" action="/login">
<label>username
<input type="text" name="username">
</label>
<label>password
<input type="password" name="password">
</label>
<input type="submit" value="login">
</form>`;
    const cookie = querystring.parse(request.headers.cookie,";")[' username']||querystring.parse(request.headers.cookie,";")['username'];
    console.log(cookie);
    if(cookie&&cookie!="null"){
        response.writeHead(302,{
            "Location":"/success"
        });
    }else{
        response.writeHead(200, {"Content-Type": "text/html"});
    }
    response.end(html);
}
function login(request, response) {
    const userObj = [
            {
                user: "abc",
                password: "abc"
            }
        ],
        params = url.parse(request.url, true).query;
    let obj = {
        "GET": () => {
            response.writeHeader(200, {"Content-Type": "text/html"});
            response.end("username:" + params.username + "\n" + "password:" + params.password);
        },
        "POST": () => {
            let body = "";
            request.on("data", (chunk) => {
                body += chunk;
            });
            request.on("end", () => {
                body = querystring.parse(body);
                response.writeHead(200, {
                    "Content-Type": "text/html",
                    // "session":`username=${body.username}&password=${body.password}`,
                    "Set-Cookie": `username=${body.username}@${body.password};expires=Wed, 15-Mar-2017 14:50:33 GMT; Max-Age=864000; path=/; domain=localhost; httponly`
                });
                response.end(`username: ${body.username}  \n password:  ${body.password}`);
            });
        }
    };
    obj[request.method]();
    userObj.forEach(function (item) {

    })
}
function success(request,response) {
    const html = "success";
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(html);
}
function logout(request,response) {
    response.writeHead(200, {
        "Content-Type": "text/html",
        "Set-Cookie":`username=null`
    });
    response.end("logout!!!");
}
function fail(request,response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end("fail!!!");
}
module.exports = {
    init: init,
    login: login,
    success: success,
    fail: fail,
    logout:logout
};