/**
 * Created by Jesse on 17/3/5.
 */
function route(request,response,handle,pathname) {
    if(typeof handle[pathname] === "function"){
        handle[pathname](request,response);
    }else{
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
    }
}
module.exports = route;