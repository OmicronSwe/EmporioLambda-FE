module.exports = (req, res, next) => {
    pureResponseMethods = ["updateProfileSuccess", "updatePasswordSuccess", "updatePasswordFail"];

    if (req.method === "POST") {
        req.method = "GET";
        req.query = req.body;
    }
    if (!pureResponseMethods.some((el) => req.url.includes(el))) {
        var send = res.send;
        res.send = function (string) {
            var body = string instanceof Buffer ? string.toString() : string;
            console.log(JSON.parse(body).length);
            var newbody = "";
            if (body.includes("id_token")) {
                newbody = body;
            } else if (JSON.parse(body).length > 1) {
                newbody = '{"result": { "items": ' + body + "} }";
            } else if (body.includes('"error":')) {
                newbody = body.replace(/.$/, "").replace(/^./, "");
            } else {
                newbody = '{"result": ' + body.replace(/.$/, "").replace(/^./, "") + "}";
            }
            console.log(newbody);
            send.call(this, newbody);
        };
    }
    next();
};
