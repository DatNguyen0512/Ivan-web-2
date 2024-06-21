function livePhotoContent() {


    function deleteUser (userId, td) {
        console.log("to delete photo "+userId);

        if (confirm("Do you really want to delete photo " + userId + "? ")) {

            // HERE YOU HAVE TO CALL THE DELETE API and the success function should run the 
            // following (delete the row that was clicked from the User Interface).

            // get the row of the cell that was clicked 
            var dataRow = td.parentNode;
            var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
            var dataTable = dataRow.parentNode;
            dataTable.deleteRow(rowIndex);
            alert("Note: this version of the sample code does NOT actually invoke the delete photo API " +
                    "so the row will reappear when you refresh the page.");
        }
    }
    
    // **************** ENTRY POINT *****************




    var contentDOM = document.createElement("div");
    contentDOM.classList.add("clickSort");
    ajax("webAPIs/listPhotoAPI.jsp", success, contentDOM);
    function success(obj) {

        console.log("listPhotoAPI.jsp AJAX successfully returned the following data");
        console.log(obj);

        // Remember: getting a successful ajax call does not mean you got data. 
        // There could have been a DB error (like DB unavailable). 
        if (obj.dbError.length > 0) {
            contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        }

        var heading = Utils.make({
            htmlTag: "h2",
            parent: contentDOM
        });
        Utils.make({// don't need reference to this span tag...
            htmlTag: "span",
            innerHTML: "Web Photos List ",
            parent: heading
        });
        var img = Utils.make({
            htmlTag: "img",
            parent: heading
        });
        img.src = "icons/insert.png";
        img.onclick = function () {
            // By changing the URL, you invoke the user insert. 
            window.location.hash = "#/photoInsert";
        };


        /* Property names in Web APIs for web_user data: "webUserId", "userEmail", "userPassword", "userPassword2", 
         * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */

        // create userList (new array of objects) to have only the desired properties of obj.webUserList. 
        // Add the properties in the order you want them to appear in the HTML table.  
        var photoList = [];
        for (var i = 0; i < obj.photoBlog.length; i++) { 
            photoList[i] = {}; // add new empty object to array

            photoList[i].Photo_Id = SortableTableUtils.makeNumber(obj.photoBlog[i].photoBlogId, false);

            photoList[i].User_Credentials = SortableTableUtils.makeText(obj.photoBlog[i].photoTopic +
                    "<span style='font-size:0.7rem'><br/>Test Logon with this PW:<br/></span>");
            photoList[i].User_Credentials.style.textAlign = "center";
            photoList[i].User_Credentials.style.lineHeight = "1.25rem";

            // last parameter true means add shadow to the image
            photoList[i]._Image = SortableTableUtils.makeImage(obj.photoBlog[i].photos, "5rem", true);
            var img = photoList[i]._Image.getElementsByTagName("img")[0];
            img.classList.add("shadow");

            photoList[i].TimeLine = SortableTableUtils.makeDate(obj.photoBlog[i].timeLine);
            photoList[i].ListPrice = SortableTableUtils.makeNumber(obj.photoBlog[i].listPrice, true);
            photoList[i].WebId = SortableTableUtils.makeText(obj.photoBlog[i].webUserId + "&nbsp;" +
                    obj.photoBlog[i].userEmail);
            
            photoList[i]._Update = SortableTableUtils.makeLink(
                    "<img src='icons/update.png' style='width:1rem' />", // innerHTML of link
                    '#/photoUpdate/' + obj.photoBlog[i].photoBlogId             // href of link
                    );
            // Remove this once you are done debugging...
            photoList[i].Error_Msg = SortableTableUtils.makeText(obj.photoBlog[i].errorMsg);
            
            photoList[i]._Delete = SortableTableUtils.makeImage("icons/delete.png", '1rem');
            // freeze the blogid
            const userId=obj.photoBlog[i].photoBlogId;
            photoList[i]._Delete.onclick = function () {
                deleteUser(userId,this);
            };


        }

        console.log("heading in livePhotoContent on next line");
        console.log(heading);

        //function MakeClickSortTable(objList, sortOrderPropName, sortIcon) {
        var photoTable = MakeClickSortTable({
            headingDOM: heading,
            objList: photoList,
            sortOrderPropName: "Photo_Id",
            sortIcon: "icons/sortUpDown16.png"
        });

        contentDOM.appendChild(photoTable);
    } // end of function success

    return contentDOM;
} // liveUserContent