

function netWork(url,method,readystate,data,current, current_user) {
    this.readyState = 3;
    switch (url) {
        case "http:/server":  return server(method,data,current,current_user);
        break;
        case "http:/server/log_sign": return server_log_sign(method,data,current,current_user);
        break;
    }
    
}
