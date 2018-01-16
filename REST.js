var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

    router.get("/allChannels",function(req,res){
        var query = "SELECT sensorId, `channel`, `power`, unix_timestamp(`timestamp`) as `timestamp`, latitude, longitude, ant_height as antHeight, ant_gain as antGain, area_type as areaType FROM ??";
        var table = ["sensing"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"channels" : rows});
            }
        });
    });

    router.get("/allNodes",function(req,res){
        var query = "SELECT nodeId, nodeName, freq, latitude, longitude FROM ??";
        var table = ["nodes"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"nodes" : rows});
            }
        });
    });

}

module.exports = REST_ROUTER;
