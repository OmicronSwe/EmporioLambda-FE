module.exports = (req, res, next) => {
    pureResponseMethods = ["updateProfileSuccess", "updatePasswordSuccess", "updatePasswordFail", "noOrdersFound", "deleteProfileSuccess"];
    allowedPOSTMethods = ["product"];
    singleResultItemsArrayMethods = ["/orderUser?id="];

    if (!allowedPOSTMethods.some((el) => req.url.includes(el))) {
        if (req.method === "POST") {
            req.method = "GET";
            req.query = req.body;
        }
    }
    //Product endpoint mock responses based on product ID
    positiveResponseProduct = ["t8QXCHw"];
    if (req.method != "GET" && req.url.includes("product")) {
        if (req.method == "PUT") {
            if (positiveResponseProduct.some((el) => req.url.includes(el))) {
                res.json({ message: "Product edited successfully" });
            } else {
                res.json({ err: "Error product edit" });
            }
        } else if (req.method == "DELETE") {
            if (positiveResponseProduct.some((el) => req.url.includes(el))) {
                res.json({ message: "Product deleted successfully" });
            } else {
                res.json({ err: "Error product delete" });
            }
        }
        else if (req.method == "POST") {
            res.json({ message: "Product \"CypressTest\" created correctly" });
        }
    }else if (!pureResponseMethods.some((el) => req.url.includes(el))) {
        var send = res.send;
        res.send = function (string) {
            var body = string instanceof Buffer ? string.toString() : string;
            var newbody = "";
            if (body.includes("id_token")) {
                newbody = body;
            } else if (JSON.parse(body).length > 1 || singleResultItemsArrayMethods.some((el) => req.url.includes(el))) {
                newbody = '{"result": { "items": ' + body + "} }";
            } else if (body.includes('"error":')) {
                newbody = body.replace(/.$/, "").replace(/^./, "");
            } else {
                newbody = '{"result": ' + body.replace(/.$/, "").replace(/^./, "") + "}";
            }
            send.call(this, newbody);
        };
    }
    next();
};
