const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({expand: true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/public/home.html");
})

app.post("/", function (req, res){
    var email = req.body.email;
    var password = req.body.password;
    const datas = {
        members: [{
            email_address: email,
            status: "subscribed",
            // merge_fields: {
            //     FNAME: email,
            //     LNAME: email,
            // }
        }]
    };
    const jsonData = JSON.stringify(datas);
    const url = "https://us5.api.mailchimp.com/3.0/lists/c2dfd964fe";
    const options = {
        method: "POST",
        auth: "tushar:d48f36256afbc0f71b54baacc1806171-us5"
    };
    var request = https.request(url, options, function (response){
        response.on("data", function (data){
            var result = JSON.parse(data);
            console.log(result);
            if(response.statusCode === 200)
                res.sendFile(__dirname + "/public/failure.html");
            else
                res.sendFile(__dirname + "/public/success.html");
            })
        })
    request.write(jsonData);
    request.end();
})

app.listen(3000, function (){
    console.log("running");
});
