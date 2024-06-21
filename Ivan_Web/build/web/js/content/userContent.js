//"use strict";
function userContent() {
    var content = ` 
          <h4>My Photos</h4>
          <p>
            Here are user table. 
          </p>
        `;   
    var ele = document.createElement("div");
    ajax("webAPIs/listUsersAPI.jsp", processUserData, ele);
    function processUserData (userList) { 
        if(userList.dbError.length>0){
            ele.innerHTML = userList.dbError;
            return;
        }
                // now userList has been populated with data from the AJAX call to file users.json
        console.log("user list (in processUserData) on next line - open triangle to see data");
        console.log(userList); 

        // Create new object list where all properties are <td> elements
        var users = userList.webUserList;
        var newUserList = [];
        for (var i = 0; i < users.length; i++) {
            newUserList[i] = {};
            newUserList[i].User_Email = SortableTableUtils.makeText(users[i].userEmail);
            newUserList[i].Image = SortableTableUtils.makeImage(users[i].image, "10rem");
            newUserList[i].Membership_Fee = SortableTableUtils.makeNumber(users[i].membershipFee,true);
            newUserList[i].User_Role = SortableTableUtils.makeText(users[i].userRoleType);
        }

        ele.appendChild(MakeClickSortTable({title: "The CIS Club", objList: newUserList, sortOrderPropName: "User_Email",sortIcon: "icons/sortUpDown16.png"}));

    }
    return ele;
  
}