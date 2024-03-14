const usersContainer = document.getElementById("userList");
const modalWrapperWindow = document.getElementById("shadow_wrap");
const modalWindow = document.getElementById("modal")
const imgMail = './src/icons/mail.svg';
const imgPhone = './src/icons/phone.svg';
const imgClose = './src/icons/close.svg';

let userList =[];

function closeUserInfo(){    
    modalWrapperWindow.style.display = 'none';
}

function drawUserList(users=[]){
    let html = "";
    users.forEach((element, index) => {
        html += `<div class="user_card" onclick="showUserInfo(${index})"><h2 class="user_card__header">${element.name}</h2>
            <div class="user_card__short_info">
                <span><img class="img_icons" src=${imgPhone}></span>
                <span class="user_card__text">${element.phone}</span>
            </div>
            <div class="user_card__short_info">
                <span><img class="img_icons" src=${imgMail}></span>
                <span class="user_card__text">${element.email}</span>
            </div>
        </div>`
    });
    usersContainer.innerHTML = html;
}

function getUserList(query=''){
    fetch("term", {
        method: 'POST',
        body: query
    }).then((answer)=>{
        if (answer.ok){
            answer.json().then((json) =>{
                userList = json;
                drawUserList(userList);
            });
        }
    });
}

function filterHandler(event){
    getUserList(event.target.value);
}

function showUserInfo(num){
    modalWrapperWindow.style.display = 'block';
    const userTags = {
        phone: 'Телефон',
        email: 'Почта',
        hire_date: 'Дата приема',
        position_name: 'Должность',
        department: 'Подразделение'
    }
    const user = userList[num];
    let html = `<div class="flex_space-between"><span class="user_info__header">${user.name}</span> <img src="${imgClose}" onclick="closeUserInfo()" class="img_close"></div>`;
    html += `<div class="user_info__body">`;

    ['phone', 'email', 'hire_date', 'position_name', 'department'].forEach(element => {
        html += `<span class="user_info__main-text user_info__left-text">${userTags[element]}</span><span class="user_info__sub-text user_info__right-text">${user[element]}</span>`;
    })
    html += `</div><div class="user_info__footer">
        <div class="user_info__main-text">Дополнительная информация</div><div class="user_info__sub-text">${user.address}</div></div>`;
    modalWindow.innerHTML = html;
}

getUserList();

window.onclick = function(event){
    if (event.target == modalWrapperWindow){
        closeUserInfo();
    }
}