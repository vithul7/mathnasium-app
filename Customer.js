let loc = location.pathname;
let locNew;
//getting the data from HTML
let studentData = getDataFromLocalStorage()

//setting Data in HTML using document.getElemenyByID
setDataInHTML(studentData);

const logOutButton = document.getElementById("login-form-submit");

//logging out when log out button is clicked
logOut();

function getDataFromLocalStorage() {
    let studentData = {
        liveschoolPoints: localStorage.getItem("liveschool"),
        theName: localStorage.getItem("name"),
        comment1: localStorage.getItem("comment1"),
        comment2: localStorage.getItem("comment2"),
        comment3: localStorage.getItem("comment3"),
        comment4: localStorage.getItem("comment4"),
        comment5: localStorage.getItem("comment5")
    };
    return studentData;
}

function setDataInHTML(studentData) {
    document.getElementById("liveschool").innerHTML = studentData.liveschoolPoints;
    document.getElementById("name").innerHTML = "Hi " + studentData.theName + "!";
    document.getElementById("comment1").innerHTML = "Comment 1: " + studentData.comment1;
    document.getElementById("comment2").innerHTML = "Comment 2: " + studentData.comment2;
    document.getElementById("comment3").innerHTML = "Comment 3: " + studentData.comment3;
    document.getElementById("comment4").innerHTML = "Comment 4: " + studentData.comment4;
    document.getElementById("comment5").innerHTML = "Comment 5: " + studentData.comment5;
}

function logOut() {
    if (logOutButton) {
        //once login button is clicked
        logOutButton.addEventListener("click", (e) => {
            e.preventDefault();
            loggedOut = true;
            locNew = loc.replace("Customer", "Login");
            location.replace(locNew)


                .catch(function (err) {
                    console.log('fetch error ', err);
                });


        });
    }
}

