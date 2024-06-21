function registerContent() {
    
    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
      <h4>Registration Page -- Coming Soon</h4>
      <p>
        The registration page will be implemented very soon... 
      </p>
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele;    
}

