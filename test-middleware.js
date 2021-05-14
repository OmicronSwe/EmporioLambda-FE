module.exports = (req, res, next) => {
    // if (req.method === 'POST') {
    //     req.method = 'GET';
    //     req.query = req.body;
    // }
    allowedPOSTMethods = ["product"];
    if (!allowedPOSTMethods.some((el) => req.url.includes(el))) {
        if (req.method === "POST") {
            req.method = "GET";
            req.query = req.body;
        }
    }
    var send = res.send
    res.send = function (string) {
        var body = string instanceof Buffer ? string.toString() : string
        var newbody = ''
        if(body.includes('id_token')){
            newbody = body;
        }else if(JSON.parse(body).length > 1){
            newbody = '{"result": { "items": ' + body + '} }'
        }else if(body.includes('"error":')){
            newbody = body.replace(/.$/, '').replace(/^./,'');
        }else{
            newbody = '{"result": ' + body.replace(/.$/, '').replace(/^./,'') + '}'
        }
        send.call(this, newbody)
    }
    next()
}