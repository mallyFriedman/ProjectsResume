

function post(data,current,current_user) {
    let users = JSON.parse(localStorage.getItem("Users"));
    let user = users.find(user => user._email == current_user._email && user._password == current_user._password);
    if(!user){
        current_user=JSON.parse(current_user)
        user = users.find(user => user._email == current_user._email && user._password == current_user._password);
    }
    if (user) {
        user.AddFriendNumber.push(data);
    }
    current_user=user;
    localStorage.setItem("Users", JSON.stringify(users));
}




function get(data,current,current_user) {
    let users = JSON.parse(localStorage.getItem("Users"));
    let find = users.find(user => user._email == current_user._email && user._password == current_user._password);
    if(!find){
        current_user=JSON.parse(current_user);
        find = users.find(user => user._email == current_user._email && user._password == current_user._password);
    }
    if (find) {
        return find.AddFriendNumber;
    }
    return [];
}



function del(data,current,current_user) {
    let index = 0;
    let flag = 0;
    let users = JSON.parse(localStorage.getItem("Users"))
    let find1 = users.find(user => user._email == current_user._email && user._password == current_user._password)
    if(find1==undefined){
        current_user=JSON.parse(current_user);
         find1 = users.find(user => user._email == current_user._email && user._password == current_user._password)
    }
    for (let i = 0; i < find1.AddFriendNumber.length; i++) {
        if (find1.AddFriendNumber[i]._phone == data) {
            flag = 1;
        }
        if (!flag) {
            index++;
        }
    }
    let temp=find1.AddFriendNumber[0]
    find1.AddFriendNumber[0]=find1.AddFriendNumber[index]
    find1.AddFriendNumber[index]=temp;

    find1.AddFriendNumber.shift();
    current_user = find1;
    localStorage.setItem("Users", JSON.stringify(users))
    return current_user.AddFriendNumber;
}



function update(value,current,current_user) {
    let users = JSON.parse(localStorage.getItem("Users"));
    let find2 = users.find(user => user._email == current_user._email && user._password == current_user._password)
    if(find2==undefined){
        current_user=JSON.parse(current_user);
         find2 = users.find(user => user._email == current_user._email && user._password == current_user._password)
    }
    for (let i = 0; i < find2.AddFriendNumber.length; i++) {
        if (find2.AddFriendNumber[i]._phone == current) {
            find2.AddFriendNumber[i]._phone=value;
            break;
        }
    }
    current_user = find2;
    localStorage.setItem("Users", JSON.stringify(users))
    return current_user.AddFriendNumber;
}



function get_log_sign(data,current,current_user){
return JSON.parse(localStorage.getItem("Users")) || [];
}



function post_log_sign(data,users,current_user){
    users.push(current_user);
    localStorage.setItem("Users", JSON.stringify(users));
}