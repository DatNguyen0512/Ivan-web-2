function MakeImg(params){    

    if (!params) {
        // alert("please check console for error message");
        throw "Error: MakeCarParamObj requires a parameter object";
    }
    var imgObj = document.createElement("div");
    
    
    imgObj.classList.add("img");  
    // This is what “links” your photo element to the styling that you provided in your car style sheet

    imgObj.name = params.name || "unknown name";
    var price = params.price || "unkown price";
    
    var imgInfo = document.createElement("div");
    imgObj.appendChild(imgInfo);
    
    var display = function ( ) {
        imgInfo.innerHTML = "IMG name: " + imgObj.name + "<br/> Price: " +
                formatCurrency(price) + "<br/>";
        
    };
    
    var addImg = document.createElement("img");
    addImg.src = params.src || "Unkown image";
    imgObj.appendChild(addImg);
    imgObj.appendChild(document.createElement("br")); 
    
    
    
    
    imgObj.setName = function (newName) {
        imgObj.name = newName;
        display();
    };
    
    imgObj.changePrice = function (changeRate) {
        var n = Number(changeRate);
        console.log("changing price by this rate " + n);
        price = price * (1 + n);
        display();
    };
    
    
    
    
    // change name of the image 
    var nameButton = document.createElement("button");
    nameButton.innerHTML = "Change name to: ";
    imgObj.appendChild(nameButton);

    var newNameInput = document.createElement("input");
    imgObj.appendChild(newNameInput);

    nameButton.onclick = function () {
        imgObj.setName(newNameInput.value);
    };

    imgObj.appendChild(document.createElement("br")); // new line
    // chang price of the image 
    var salaryButton = document.createElement("button");
    salaryButton.innerHTML = "Change price to: ";
    imgObj.appendChild(salaryButton);

    var newPriceInput = document.createElement("input");
    imgObj.appendChild(newPriceInput);

    salaryButton.onclick = function () {
        imgObj.changePrice(newPriceInput.value);
    };
    
    function formatCurrency(num) {
        if (isNaN(num)) {
            return num;
        } else {
            var numNum = parseFloat(num);
            return numNum.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
        }
    }
    var imgFooter = document.createElement("imgFooter");
    imgFooter.classList.add("imgFooter");
    imgFooter.des = "Please follow copy right rules when using photo";
    imgObj.appendChild(imgFooter);
    imgObj.appendChild(document.createElement("br"));
    
    display();
    return imgObj; 
}