function ResultHelp({error = "", data = {}}={}) {
    this.code = 200;
    this.message = "操作成功";
    this.data={};
    this.sendJson = function (res) {
        if (error || error !== "") {
            console.log(error);
            this.code = 100;
            this.message = error.toString();
        }
        this.data = data;
        res.set('Content-Type', 'application/json; charset=utf-8');
        res.json(this)
    };
}
module.exports = ResultHelp;