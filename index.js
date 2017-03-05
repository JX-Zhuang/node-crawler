/**
 * Created by Jesse on 17/3/4.
 */
const http = require("http"),
    cheerio = require("cheerio"),
    iconv = require("iconv-lite");
let result = "";
http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end(result);
}).listen(5560);
http.get("http://cn.memebox.com/sas/sms/list", (res) => {
    let html = "";
    // res.setEncoding('utf8');
    res.on("data", (chunk) => html += chunk);
    // res.on("data", (chunk) => html += iconv.decode(chunk,"gb2312"));
    res.on("end", () => {
        result = html;
        // const $ = cheerio.load(html);
        // console.log(html);
        // $("#new_s_sc .newsRumors-top li a").each((index,ele)=>{
        //     result.push($(ele).text());
        // });
    });
});