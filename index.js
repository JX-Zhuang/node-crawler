/**
 * Created by Jesse on 17/3/4.
 */
const http = require("http"),
    url = require("url");
http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname,
        str = "";
    res.writeHead(200, {"Content-Type": "text/plain"});
    http.get("http://cn.memebox.com/h5/view/index", (respose) => {
        respose.on("data", (chunk) => str += chunk);
        respose.on("end", () => {
            const obj = JSON.parse(str),
                ary = pathname.slice(1).split("/");
            let result = obj;
            ary.forEach((item,index)=>{
               if(result[item]){
                    result = result[item];
               } else {
                   res.end("404");
               }
            });
            res.end(JSON.stringify(result));
        });
    });
}).listen(5560);
