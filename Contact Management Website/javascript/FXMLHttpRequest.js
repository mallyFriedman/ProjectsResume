

class FXMLHttpRequest {

    constructor() {
        this._status = null;
        this.response=null;
        this._readystate = 0;
        this._responseText = null;
        this._method = null;
        this._url = null;
    }
    open(method, url) {
        this._readystate = 1;
        this._url = url;
        this._method = method;
        this.response = "loading";
    }
    send(data,current, current_user) {
        this._readystate = 2;
        this.responseText = netWork(this._url, this._method,this._readystate, data,current, current_user);
        if (this.responseText != undefined) {
            this.status = 200;
            this.response = "ready";
            this.readyState = 4;
            return this.responseText;
        }
        else {
            this.status = 404;
            this.response = "error";
            this.readyState = 0;
            return;
        }
    }
}

