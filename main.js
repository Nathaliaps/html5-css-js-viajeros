//Variable globals

const formUI = document.getElementById('formLogin');

const formRegisterUI = document.getElementById('formRegister');

const formCreatePost = document.getElementById('formPost');

const postCreate = document.getElementById('post');

let arrayUsers = [];

let arrayPost = [];

//Funtions

const createUser = () => {

    let user = {

        name: formRegisterUI.formNameRegister.value,
        email: formRegisterUI.formEmailRegister.value,
        pass: formRegisterUI.formPasswordRegister.value
    }

    arrayUsers.push(user);
    saveLS();
    localStorage.setItem('sessionUserName', formRegisterUI.formNameRegister.value);
    formRegisterUI.reset();
    return window.location = "./main-page/page.html";

}

const saveLS = () => {

    localStorage.setItem('Users', JSON.stringify(arrayUsers));

}

const savePost = () => {

    localStorage.setItem('Post', JSON.stringify(arrayPost));
    drawPost();
}

const loginUser = (form) => {

    let localStorageLogin = JSON.parse(localStorage.getItem('Users'));

    for (let clave in localStorageLogin) {

        if (form.email === localStorageLogin[clave].email && form.pass === localStorageLogin[clave].pass) {

            localStorage.setItem('sessionUserName', form.name);

            return window.location = "./main-page/page.html";

        }
    } {
        alert('El usuario no existe, por favor regístrese');

    }

}

const createPost = () => {

    let post = {

        id: new Date().getTime(),
        url: formCreatePost.formUrl.value,
        comment: formCreatePost.formComment.value,
        userName: localStorage.getItem('sessionUserName')

    }

    arrayPost.push(post);
    formCreatePost.reset();
    savePost();
    console.log('post', post)

}

const drawPost = () => {

    let localStorageLogin = JSON.parse(localStorage.getItem('Users'));

    postCreate.innerHTML = '';

    arrayPost = JSON.parse(localStorage.getItem('Post'));

    if (arrayPost === null) {

        arrayPost = [];

    } else {

        arrayPost.sort((a, b) => a.id > b.id).map((element, i) => {

            postCreate.innerHTML += `
                <div class="col-md-8 d-flex custom-card-post">
                    <div class="col-md-12 mb-4 custom-image">
                        <nav class="navbar navbar-expand-lg navbar-light custom-navbar">
                            <div class="container-fluid custom-nav">
                                <img src="./images/ANGELES.jpg" class="rounded-circle" height="22" alt="" loading="lazy" />
                                <div class="user-name">${element.userName}</div>
                            </div>
                        </nav>
                        <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                            <img src="${element.url}" class="img-fluid" /><a href="#!"><div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div></a>
                        </div>
                    </div>
                    <div class="row d-flex custom-row-description">
                        <div class="col-md-8 mb-4 d-flex custom-description">
                            <h3>
                            ${element.userName}
                            </h3>
                            <p>
                               ${element.comment}
                            </p>
                            <p>
                            ${element.id}
                            </p>
                        </div>
                    </div>
            </div>`

        });
    }

}

// ${localStorageLogin[i].name}

const readPost = () => {

    drawPost();
}

readPost();

const logout = () => {

    return window.location = "../index.html";
}



// EventListener

formUI.addEventListener('submit', (e) => {

    e.preventDefault();

    let userUI = {

        email: document.getElementById('formEmail').value,
        pass: document.getElementById('formPassword').value,
    }

    loginUser(userUI);

    formUI.reset();
});