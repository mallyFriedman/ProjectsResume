let putItemPlus = 1;
let sumPhoto = 1;
let x = 0;
let y = 0;



function CheckPassword(inputtxt) {
    if (!inputtxt.match(/^\d+$/)) {
        alert('Wrong, password should include  only numbers!');
        displaylog()
        return false;
    }
    return true;
}
function CheckEmail(inputtxt) {
    if (!inputtxt.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        alert('Wrong,  this email address ia not valid!');
        displaylog()
        return false;
    }
    return true;
}




function logIn() {
    let name = document.getElementById("name").value;
    let mail = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (CheckEmail(mail) && CheckPassword(password)) {
        let logFXML = new FXMLHttpRequest();
        logFXML.open("get", "http:/server/log_sign");
        let users = logFXML.send(null, null, null);
        find = users.find(user => user._email == mail && user._name == name);
        if (find) {
            let current_user = find;
            localStorage.setItem("Users", JSON.stringify(users));
            document.getElementById("log").style.display = "none";
            document.getElementById("boxFriend").style.display = "block";
            get_client(current_user);
        }
        else {
            alert("The User not exist, Please sign-In");
            location.reload();
        }
    }
}



function signIn() {
    document.getElementById("sign").style.display = "none";
    if (currentUser()) {
        let current_user = currentUser();
        if (!localStorage.getItem("Users")) {
            window.localStorage.setItem('Users', JSON.stringify([]));
        }
        let logFXML = new FXMLHttpRequest();
        logFXML.open("get", "http:/server/log_sign");
        let users = logFXML.send(null, null, null);
        find = users.find(user => user._password == current_user._password && user._name == current_user._name);
        if (!find) {
            let signFXML = new FXMLHttpRequest();
            signFXML.open("post", "http:/server/log_sign");
            signFXML.send(null, users, current_user);
            get_client(current_user);
        }
        else {
            alert("The User already exist, Please Log-In");
            displaylog()
        }
    }
}
function currentUser() {
    let nameValue = document.getElementById("new-name").value;
    let emailValue = document.getElementById("new-email").value;
    let numberValue = document.getElementById("new-number").value;
    let passwordValue = document.getElementById("new-password").value;
    if (numberValue.length != 10) {
        alert("please enter a correct number!")
        location.reload()
        return false;
    }
    if (CheckEmail(emailValue) && CheckPassword(passwordValue)) {
        return new Person(nameValue, emailValue, numberValue, passwordValue);
    }
    location.reload();
    return false;
}



function signOut(current_user) {
    current_user = null;
    window.location.reload();
}



function get_client(current_user) {

    document.getElementById("search_div").style.display = "block"
    let getXml = new FXMLHttpRequest();
    getXml.open("get", "http:/server")
    let user = getXml.send(null, null, current_user);
    if (user == undefined)
        return;
    for (let i = 0; i < user.length; i++) {
        build(user[i], current_user);
    }
    let click = document.getElementById("add_your_friend");
    click.addEventListener("click", () => { post_client(current_user) });
    document.getElementById("search").onkeyup = function () { search(current_user) };
    let out1=document.getElementById("log_out1");
    out1.addEventListener("click",()=>{
        signOut(current_user)
    })
    let out2=document.getElementById("log_out2");
    out2.addEventListener("click",()=>{
        signOut(current_user)
    })
}




function post_client(current_user) {
    let new_friend = logFromClient();
    let flag = 1;
    if (new_friend._first_name == '' || new_friend._last_name == '' || new_friend.phone == '') {
        alert("please complit all the lines!!")
    }
    else {
        let postXml = new FXMLHttpRequest();
        postXml.open("post", "http:/server");
        postXml.send(new_friend, null, current_user);
        document.getElementById("boxFriend").style.display = "block";
        build(new_friend, current_user);
        flag = 0;
        logFromClient(flag)
    }
}

function logFromClient(flag) {
    let phone = document.getElementById("phone_name_add").value;
    let first_name = document.getElementById("first_name_add").value;
    let last_name = document.getElementById("last_name_add").value;
    let a = new AddFriendNumber(phone, first_name, last_name);
    if (!flag) {
        document.getElementById("phone_name_add").value = null;
        document.getElementById("first_name_add").value = null;
        document.getElementById("last_name_add").value = null;
    }
    return a;
}




function delete_client(obg, current_user) {
    let deleteXml = new FXMLHttpRequest();
    deleteXml.open("del", "http:/server");
    let user = deleteXml.send(obg, null, current_user);
    let div = document.getElementById("boxFriend");
    div.innerHTML = null;
    x = 0;
    y = 0;
    sumPhoto = 1;
    if (user == undefined)
        return;
    for (let i = 0; i < user.length; i++) {
        build(user[i], current_user);
    }
}



function updateFAJAX(valueToUpdate, current, current_user) {
    let updateXml = new FXMLHttpRequest();
    updateXml.open("update", "http:/server");
    let user = updateXml.send(valueToUpdate, current, current_user);
    let diva = document.getElementById("boxFriend");
    diva.innerHTML = null;
    x = 0;
    y = 0;
    sumPhoto = 1;
    for (let i = 0; i < user.length; i++) {
        build(user[i], current_user);
    }

}



function search(current_user) {
    let input = document.getElementById("search");
    let letter_search = input.value;
    let found = search_pepole(letter_search, current_user);
    document.getElementById("boxFriend").innerHTML = null;
    sumPhoto = 1;
    x = 0;
    y = 0;
    for (let i = 0; i < found.length; i++) {
        build(found[i], current_user)
    }
}

function search_pepole(data, current_user) {
    let arr = [];
    let flag = true;
    let findFXML = new FXMLHttpRequest();
    findFXML.open("get", "http:/server/log_sign");
    let users = findFXML.send(null, null, null);
    let user = users.find(user => user._email == current_user._email && user._password == current_user._password);
    if (data == "")
        return user.AddFriendNumber;
    for (let i = 0; i < user.AddFriendNumber.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (user.AddFriendNumber[i]._first_name[j] != data[j].toUpperCase() && user.AddFriendNumber[i]._first_name[j] != data[j].toLowerCase()) {
                flag = false;
                break
            }
        }
        if (flag) {
            arr.push(user.AddFriendNumber[i])
        }
        flag = true;
    }
    return arr;
}




function build(toPrint, current_user) {
    let bigDiv = document.getElementById("boxFriend");
    let divChild = document.createElement("div");
    bigDiv.appendChild(divChild);
    divChild.id = putItemPlus;
    divChild.classList.add("createNewCreate");
    let title = document.createElement("h1");
    divChild.appendChild(title)
    title.innerHTML = "name:" + " " + toPrint._first_name + " " + toPrint._last_name + " " + "phone number:" + " " + toPrint._phone;
    title.classList.add("titleContact");
    let btnDel
    createDel_ApdateButtons(btnDel, divChild, 0, delete_client, toPrint._phone, current_user);
    let btnUpdate
    createDel_ApdateButtons(btnUpdate, divChild, 1, createButtonUpdate, toPrint._phone, current_user);
    replaceItems();
    let img = document.createElement("img");
    img.src = '../images/' + sumPhoto + '.jpg';
    img.classList.add("createNew");
    divChild.appendChild(img);
    img.addEventListener("click", () => {
        mouseover(img);
    });
    img.addEventListener("mouseover", () => {
        mouseout(img);
    });
}




function replaceItems() {
    if (x == 1710) {
        x = 0;
        y += 220;
    }
    document.getElementById(putItemPlus).style.marginLeft = x + "px";
    document.getElementById(putItemPlus).style.marginTop = y + "px";
    putItemPlus++;
    sumPhoto++;
    x += 570;
}



function createDel_ApdateButtons(method, divChild, update, funcName, value, current_user) {
    method = document.createElement("button");
    divChild.appendChild(method);
    method.classList.add("btnClass");
    if (update) {
        method.innerHTML = "update"
        method.addEventListener("click", () => { funcName(value, divChild, current_user) })
    }
    else {
        method.innerHTML = "delete"
        method.addEventListener("click", () => { funcName(value, current_user) })
    }
}



function createButtonUpdate(current, divChild, current_user) {
    let btn = document.createElement("input");
    divChild.appendChild(btn);
    btn.type = "text"
    btn.placeholder = "enter new number";
    btn.classList.add("btnClasses");
    btn.id = "btnUP";
    let btn1 = document.createElement("button")
    divChild.appendChild(btn1);
    btn1.classList.add("btnClasses");
    btn1.id = "inputUP"
    btn1.innerHTML = "Confirm";
    btn1.addEventListener("click", () => {
        valueToUpdate = document.getElementById("btnUP").value;
        updateFAJAX(valueToUpdate, current, current_user)
    });
}




function displaylog() {
    document.getElementById("sign").style.display = "none";
    document.getElementById("log").style.display = "block";

}
function displaysign() {
    document.getElementById("log").style.display = "none";
    document.getElementById("sign").style.display = "block";

}





function mouseover(img) {
    img.id = "mouseover_img";
}
function mouseout(img) {
    img.id = null;
}