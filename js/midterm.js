var users = [];
var i = 0;
window.onload = ("DOMContentLoaded", function () {
    "use strict";
    document.querySelector("#loadBtn")
        .addEventListener("click", function () {
            document.querySelector("#loadBtn")
                .className = "btn disabled"; //Load button is disabled after fetching JSON data
            document.querySelector("#loadBtn")
                .removeEventListener("click"); //click event listener is removed from Load button after fetching JSON data
            var req = new XMLHttpRequest();
            req.open("GET", "users.json");
            req.onload = function () {
                if (req.status === 200) {
                    users = JSON.parse(req.responseText); //Parse JSON response into JavaScript object
                    document.querySelector("#showBtn")
                        .className = "btn enabled"; //After fetching data, enable the Show first button by changing CSS class
                    document.querySelector("#showBtn")
                        .addEventListener("click", sidebar); //After fetching data, bind click event handler to Show first button
                }
            };
            req.send();
        });

    var fetch = function (maindata) {
        var mainout = document.createElement("div");
        var photo = document.createElement("img");
        photo.src = maindata.image;
        mainout.appendChild(photo);
        var fullnames = document.createElement("h2");
        fullnames.innerText = names(maindata);
        var emaillink = document.createElement("a");
        emaillink.href = "mailto:" + maindata.email;
        emaillink.innerText = maindata.email;
        mainout.appendChild(fullnames);
        mainout.appendChild(emaillink);
        return mainout.innerHTML;
    };

    var reCent = function (data2) {
        var out = document.createElement("div");
        var emaillink = document.createElement("img");
        emaillink.src = data2.thumbnail;
        out.appendChild(emaillink);
        var photo = document.createElement("a");
        photo.innerText = names(data2);
        photo.href = "mailto:" + data2.email;
        out.appendChild(photo);
        return out;
    };

    var sidebar = function () {
        document.querySelector("#output1")
            .innerHTML = fetch(users[i]); //Clicking show first retrieves and displays first element of JSON data. Each subsequent click fetches the next element from the data and displays it.
        i++;

        if (i > 0) {
            document.querySelector("#showBtn")
                .innerText = "Show Next"; //After clicking 'Show first' the button text changes to "Show Next"
        }

        if (users[i - 2]) {
            if (document.querySelectorAll(".oldData")
                .length >= 3) //Right side contains no more than three recent users.
            {
                document.querySelector("#output2")
                    .removeChild(document.querySelector(".oldData"));
            }
            var photo = document.createElement("div");
            photo.className = "oldData";
            photo.appendChild(reCent(users[i - 2]));
            document.querySelector("#output2")
                .appendChild(photo);
        }
    };

    var names = function (data3) {

        var first = data3.firstName.substring(0, 1)
            .toUpperCase() + data3.lastName.substring(1);
        var last = data3.lastName.substring(0, 1)
            .toUpperCase() + data3.lastName.substring(1);
        return first + " " + last;
    };


});