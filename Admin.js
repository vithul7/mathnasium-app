document.getElementById("mainHolder").style.display = "none";
let loc = location.pathname;
let locNew;
//boolean checking if user is logged in
let isFound = false;
const search = {
    studentInfo: document.getElementById("entry"),
    goButton: document.getElementById("go-button"),
    logOutButton: document.getElementById("login-form-submit")
}

if(search.studentInfo && search.goButton && search.logOutButton) {
    //once login button is clicked
    search.goButton.addEventListener("click", (e) => {
        e.preventDefault();
        //assigning the user input to variables
        const id = search.studentInfo.id.value;
        //reading the spreadsheet using fetch API
        fetch('https://sheetdb.io/api/v1/a7g9pzfs5517z')
            .then(function (response) {
                response.json()
                    .then(function (dataObject) {
                        searchAndDisplayData(dataObject, id);
                    });

            })
            .catch(function (err) {
                console.log('fetch error ', err);
            });




    })

    // if(search.logOutButton) {
        //once login button is clicked
        search.logOutButton.addEventListener("click", (e) => {
            e.preventDefault();
                locNew = loc.replace("Admin", "Login");
                location.replace(locNew)
    
                .catch(function (err) {
                    console.log('fetch error ', err);
                });
    
        })
    // }
    
}
function searchAndDisplayData(dataObject, id) {
    isFound = false;
    //checking if the id or the name is found in the spreadsheet for this row
    for (i = 0; i < dataObject.length; i++) {

        //if the user enters correct credentials
        if (id === dataObject[i].Id) {
            isFound = true;
            //store data in HTML IDs
            storeData(dataObject);
            //showing text
            document.getElementById("mainHolder").style.display = "block";
        }
    }
    //if user is not logged in 
    if (isFound == false) {
        //run through the error messages
        errorValidation(id);

    }
}

function storeData(dataObject) {
    document.getElementById("liveschool").innerHTML = dataObject[i].LiveschoolPoints;
    document.getElementById("name").innerHTML = "Name: " + dataObject[i].Name;
    document.getElementById("comment1").innerHTML = "Comment 1: " + dataObject[i].Comment1;
    document.getElementById("comment2").innerHTML = "Comment 2: " + dataObject[i].Comment2;
    document.getElementById("comment3").innerHTML = "Comment 3: " + dataObject[i].Comment3;
    document.getElementById("comment4").innerHTML = "Comment 4: " + dataObject[i].Comment4;
    document.getElementById("comment5").innerHTML = "Comment 5: " + dataObject[i].Comment5;
}

function errorValidation(id) {
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
    } else {
        alert("ID not found in database");
    }
}




