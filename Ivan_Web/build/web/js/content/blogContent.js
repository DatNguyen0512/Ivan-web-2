function blogContent() {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
      <h4>My Blog - Module 4- Database </h4>
      <p>
        Database: Photo_Receipt: Including photo id number, price, date and time.
      </p>
      <p>
        My Web Development Experience:
        I am starting this semester as a senior and am expected to graduate this May. This is one of my first classes to learn about Web Development.
        I choose this class because it helps me to develop my web designer and application career. Before that, I have very little experience with databases and any other languages that relate to Web Development. This is considered my first class on this new journey. 
        I haven't had any internships or anything yet but I'm trying to get a back-end development job after I graduate.
      </p>
      <p>
        HomePage Homework: I found it was easy to work on html platform with specific formation every website. The attribute and feature codes are easy to use to design the webpage.
        The hard thing is how to make a smooth webpage under different conditions.
        This homework is valuable because it helps me to set the first step on designing webpage.  
      </p>
        <p>
        JS UI Homework: I found it was easy to work on adjusting style and files base on what I learn from homework 1.
        The hard thing is not sure about "use strict" when there is no example of not using it and using it. 
        This homework is valuable because it helps me to work on homepage with multi links and files.  
      </p>
      <p>
        Homework 3: I found it was easy after I finished most of the part in Lab. The instructions of HW and Lab are the same.
        The hard thing is to make img show " unkown img" when there is no img input.
        This homework is valuable because its helps me to learn about using object to make multiple contents. 
      </p>
       <p>
        Homework 4: 
        Database experience: My database experience is bad because I am currently taking a database class. I have practiced many commands and tables that
        are used to different situation. This is an interesting experience that I can preapre for my own project about photo's blog.
        <br>
        I found it was easy that all commands is stated out in tutorial and basic concept web page. 
        The hard thing is to apply correct keys for designing table step.
        This homework is valuable because its helps me to transfer idea to real data that can be used in the future. 
        <br>
        <br>
        Click <a target="_blank" href='docs/Nguyen_database.pdf'>Database Document</a> to see my database document.
        </p>
        <p>
        Homework 5: 
        Server side database access code you may have written: I have done a sudoku game with client-server project before in my software development class. I was a group 
        project, and I was charged for client-server connection in Java. I have to created a port number to connect client server, and other feature to transfer data to server and back to client side.
        <br>
        I found it was easy that the lab is helpful to understand the concept of database and webAPI. 
        The hard thing is to get the data from sqlworkbench to website.
        This homework is valuable because it helps me to understand the relationship between datatbase and web.
        <br>
        <br>
        Click <a target="_blank" href="docs/WebAPI_errors.pdf">here</a> to see my Web API error document 
        </p>
        <p>
        Tutorial Option:
        <br>
         I found it was easy that all the effects is attached with provided code that I can directly use to the poc.html
         The hard thing is to combine them together to make it works.
         It is confusing because most of the code structure come from "How to" page. The percentation of my contribution is small comparing to the complete component work. 
        </p>
        <br>
        Homework 6
        <br>
         I found it was easy that most of the code was in the sample code from lab.
         The hard thing is to combine them together to make it works.
         It is confusing because of rerun the index file. It will show the previous index instead of the current index. I have to clear the cache to make it display.
         I  have learn the sort table and how to use the data from database to apply to the html page. 
          <br>
        Homework 7
        <br>
         I found it was easy that most of the code was from lab7 a and b
         The hard thing is to combine them together in account.js
         It is confusing because of rerun the interface is not show up profile after getting it from logon 
         I  have learn how to use IIFE and REST in js.
        </p>
        Homework 8
        <br>
         I found it was easy that there is a sample code for otherdb
         The hard thing create insert interface and make it working
         It is confusing because the DbMods in model.other seems confusing.
         I  have learn how to use insert.
        </p>
    
        Homework 9
        <br>
         I found it was easy that there is a sample code for otherdb
         The hard thing is making sure everything works as expected
         It is confusing because get roles API used DataStringList and get ID API used DataString
         I  have learn how to use update.
         <br>
        Click <a target="_blank" href='docs/Nguyen_database.pdf'>Database Document</a> to see my database document.
        </p>
    
        Homework 10
        <br>
         I found it was easy that there is a sample code 
         The hard thing is making sure everything works as expected
         It is confusing because the delete error message for foreign key is hard to understand why. 
         I  have learn how to use delete.
         <br>
        Click <a target="_blank" href='docs/Nguyen_database.pdf'>Database Document</a> to see my database document.
        </p>
    
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele;    
}