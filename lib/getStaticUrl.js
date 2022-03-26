const config = require("./config");
module.exports = function(staticUrl){
    return config().root+staticUrl;
}