

function server(method,data, current,current_user) {
    switch (method) {
        case "get":  return get(data,current,current_user);
            break;
        case "post":  post(data,current,current_user);
            break;
        case "update":return update(data,current,current_user);
            break;
        case "del": return del(data,current,current_user);
            break;
    }
}



function server_log_sign(method,data, current,current_user){
    switch (method) {
        case "get":  return get_log_sign(data,current,current_user);
            break;
        case "post":  post_log_sign(data,current,current_user);
            break;
    }
}