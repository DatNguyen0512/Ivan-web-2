/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var account = {};

(function ( ) { // This is an IIFE immediately invoking function execution
    account.logon = function ( ) { // public method of global object
     // build user interface (a div with labels, text boxes, and logon button which makes an ajax call)
     // Here’s how to build a password style text box showing dots instead of characters…
        var divLogon = document.createElement("div");
        divLogon.classList.add("find");

        var emailSpan = document.createElement('span');
        emailSpan.innerHTML = "Email: ";
        divLogon.appendChild(emailSpan);

        var emailInput = document.createElement("input");
        emailInput.setAttribute("type", "email"); // so it shows dots not characters
        divLogon.appendChild(emailInput);

       var passwordSpan = document.createElement('span');
        passwordSpan.innerHTML = "and password: ";
        divLogon.appendChild(passwordSpan);

        var passwordInput = document.createElement("input");
        passwordInput.setAttribute("type", "password"); // so it shows dots not characters
        divLogon.appendChild(passwordInput);
        // Note: for this lab activity, you may want to comment out setting the input type to password, 
        // but you will certainly want to apply input type=password to the password text box 
        // when you implement your own log on code.

        var findButton = document.createElement("button");
        findButton.innerHTML = "Find";
        divLogon.appendChild(findButton);

        var msgDiv = document.createElement("div");
        divLogon.appendChild(msgDiv);

        findButton.onclick = function () {

            // You have to encodeURI user input before putting into a URL for an AJAX call.
            // Otherwise, your URL may be refused (for ssecurity reasons) by the web server.
            var url = "webAPIs/logonAPI.jsp?email=" + encodeURI(emailInput.value) +
                  "&password=" + encodeURI(passwordInput.value);     

            console.log("onclick function will make AJAX call with url: " + url);
            ajax(url, processLogon, msgDiv);

            function processLogon(obj) {
                var msg = "";
                console.log("Successfully called the profile. Next line shows the returned object.");
                console.log(obj);
                if (obj.errorMsg.length > 0) {
                    msg += "<strong>Error: " + obj.errorMsg + "</strong>";
                } else {
                    msg += "<strong>Welcome Web User " + obj.webUserId + "</strong>";
                    msg += "<br/> Birthday: " + obj.birthday;
                    msg += "<br/> MembershipFee: " + obj.membershipFee;
                    msg += "<br/> User Role: " + obj.userRoleId + " " + obj.userRoleType;
                    msg += "<p> <img src ='" + obj.image + "'></p>";
                }
                msgDiv.innerHTML = msg;
            }
        };  // onclick function

        return divLogon;
    };
    
    
    function buildProfile (userObj) { // NOW PRIVATE, can be called by any of the account functions…
        var msg = "";
        if (userObj.errorMsg.length > 0) {
            msg += "<strong>Error: " + userObj.errorMsg + "</strong>";
        } else {
            msg += "<strong>Welcome Web User " + userObj.webUserId + "</strong>";
            msg += "<br/> Birthday: " + userObj.birthday;
            msg += "<br/> MembershipFee: " + userObj.membershipFee;
            msg += "<br/> User Role: " + userObj.userRoleId + " " + userObj.userRoleType;
            msg += "<p> <img src ='" + userObj.image + "'> </p>";
        }
        return msg;
    };
    
    
    account.getProfile = function ( ) {
     // create a div, invoke Get Profile API, fill div w/ error msg or web user info, return the div.
        var divGetProfile = document.createElement("div");
        divGetProfile.classList.add("find");
        var msgDiv = document.createElement("div");
        divGetProfile.appendChild(msgDiv);
        ajax("webAPIs/getProfileAPI.jsp", processGetProfile,msgDiv);
        function processGetProfile(obj) {
            console.log("Successfully called the profile. Next line shows the returned object.");
            console.log(obj);
            var msg = buildProfile(obj);
            msgDiv.innerHTML = msg;
        }
        return divGetProfile;
    };
    
    
    account.logoff = function ( ) {
     // create a div, invoke logoff API, fill div with “logged off” message, return the div. 
        var divLogoff = document.createElement("div");
        divLogoff.classList.add("find");
        var msgDiv = document.createElement("div");
        divLogoff.appendChild(msgDiv);
        ajax("webAPIs/logoffAPI.jsp", processLogoff,msgDiv);
        function processLogoff(obj) {
            console.log("odject has been log off.");
            console.log(obj);
            var msg = buildProfile(obj);
            msgDiv.innerHTML = msg;
        }
        return divLogoff;
    };
} ( ) ); // invoke the IIFE


