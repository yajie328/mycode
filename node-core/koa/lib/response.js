let response = {
    "_body" : "",
    get body(){
        return this._body;
    },
    set body(v){
        this.res.statusCode = 200;
        this._body = v;
    }
}
module.exports = response;