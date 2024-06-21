function photoContent() {

    var content = ` 
          <h4>My Photos</h4>
          <p>
            Here are Photo table. 
          </p>
        `;   
    var ele = document.createElement("div");
    ajax("webAPIs/listPhotoAPI.jsp", processPhotoData, ele);
    function processPhotoData (photoList) { 
        if(photoList.dbError.length>0){
            ele.innerHTML = photoList.dbError;
            return;
        }
                // now userList has been populated with data from the AJAX call to file users.json
        console.log("photo list (in processUserData) on next line - open triangle to see data");
        console.log(photoList); 

        // Create new object list where all properties are <td> elements
        var users = photoList.photoBlog;
        var newPhotoList = [];
        for (var i = 0; i < users.length; i++) {
            newPhotoList[i] = {};
            newPhotoList[i].photo_Topic = SortableTableUtils.makeText(users[i].photoTopic);
            newPhotoList[i].Image = SortableTableUtils.makeImage(users[i].photos, "10rem");
            newPhotoList[i].Photo_Price = SortableTableUtils.makeNumber(users[i].listPrice,true);
            newPhotoList[i].Web_ID = SortableTableUtils.makeNumber(users[i].webUserId,false);

        }

        ele.appendChild(MakeClickSortTable({title:"The Photo List", objList: newPhotoList, sortOrderPropName: "photo_Topic",sortIcon: "icons/sortUpDown16.png"}));

    }
    return ele;   
}