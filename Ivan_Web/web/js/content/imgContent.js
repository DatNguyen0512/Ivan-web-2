function imgContent() {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
      <h4>My Photos</h4>
        <img src="pics_users/dog.jpg" alt="Husky" height="500" width="300">
	<br>
	<br>
      <p>
        Here are some Photo contents . 
      </p>
    `;

    var ele = document.createElement("div");
    ele.innerHTML = content;

    var empContainer = document.createElement("div");
    ele.appendChild(empContainer);
    
    var img1 = MakeImg({name:"Dawn",price: 16, src: "pics_users/dawn.jfif"});
    empContainer.appendChild(img1);

    var img2 = MakeImg({name:"Sun Set",price: 16, src: "pics_users/sunset.jpg"});
    empContainer.appendChild(img2);
    
    var img3 = MakeImg({});
    empContainer.appendChild(img3);

    return ele;
}