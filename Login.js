//boolean checking if user is logged in
let isLogged = false;
//boolean checking if ID is in the database
let idFound = false;
//boolean checking if name is in the database
let nameFound = false;
let loc = location.pathname;
let locNew;

//creating login object
const loginObject = {
    loginForm: document.getElementById("login-form"),
    loginButton: document.getElementById("login-form-submit"),
}



if(loginObject.loginForm && loginObject.loginButton) {
    //once login button is clicked
    loginObject.loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        //assigning the user input to variables
        const id = loginObject.loginForm.id.value;
        const name = loginObject.loginForm.inputName.value;
        //reading the spreadsheet using fetch API
        fetch('https://sheetdb.io/api/v1/a7g9pzfs5517z')
            .then(function (response) {
                response.json()
                    .then(function (dataObject) {
                        //checking if the id or the name is found in the spreadsheet for this row
                    
                        loginAndGetData(dataObject, id, name);
                    });

            })
            .catch(function (err) {
                console.log('fetch error ', err);
            });
    })
}

function loginAndGetData(dataObject, id, name) {
    for (i = 0; i < dataObject.length; i++) {
        if (id == dataObject[i].Id) {
            idFound = true;
        }
        if (name.toLowerCase() == dataObject[i].Name.toLowerCase()) {
            nameFound = true;
        }
        if (id == "0123456" && name.toLowerCase() == "Admin".toLowerCase()) {
            isLogged = true;
            locNew = loc.replace("Login", "Admin");
            location.replace(locNew);
        }

        //if the user enters correct credentials
        if (id === dataObject[i].Id && name.toLowerCase() === dataObject[i].Name.toLowerCase()) {
       

            //user is now logged in 
            isLogged = true;

            //setting the values from the row in local storage to access in the next page
            storeData(dataObject);
            //redirecting the user to their student's data
            locNew = loc.replace("Login", "Customer");
            location.replace(locNew);
        }
    }

    //if user is not logged in 
    if (isLogged == false) {
        //run through the error messages
        errorValidation(id, idFound, nameFound);
        //then reload the screen once the alerts are clicked
        location.reload();
    }
}

function storeData(dataObject) {
    localStorage.setItem("liveschool", dataObject[i].LiveschoolPoints);
    localStorage.setItem("name", dataObject[i].Name);
    localStorage.setItem("comment1", dataObject[i].Comment1);
    localStorage.setItem("comment2", dataObject[i].Comment2);
    localStorage.setItem("comment3", dataObject[i].Comment3);
    localStorage.setItem("comment4", dataObject[i].Comment4);
    localStorage.setItem("comment5", dataObject[i].Comment5);
}

function errorValidation(id, idFound, nameFound) {
    let isItAllInt;
    //converting to values to ASCII
    for (i = 0; i < id.length; i++) {
        let intVersion = id.charCodeAt(i);
        //checking if it is an actual number through ASCII
        if (intVersion < 58 && intVersion >= 48) {
            isItAllInt = true;
        } else {
            isItAllInt = false;
            i = id.length;
        }
    }
    //checking length and if it's fully numeric
    if (id.length != 7 || isItAllInt == false) {
        alert("Please enter a 7-Digit ID: only numbers");
    //if a name or id was found, but they were not logged in, something was 
    //wrong with the input
    } else if (nameFound == true || idFound == true) {
        alert("The name and the ID do not match");
    } else {
        alert("Please enter a valid name and ID");
    }
}


