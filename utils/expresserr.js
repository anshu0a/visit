class Expresserr extends Error {
    constructor(sts,msg){
        super();
        this.statusCode = sts;
        this.message = msg;
    }
}
module.exports = Expresserr