function homeContent () {

// ` this is a "back tick". You can use it to define multi-line strings in JavaScript.
// 
// NetBeans menu option "Source - Format" will not work with the text inside of a 
// String, so you have to do this indentation manually with the editor. 

var content = `

            <h3>Home</h3>
            <img src="pics_users/photographer.jfif" alt="Husky" height="500" width="300">
            <br>
            <a href="https://www.IvanPandL.com/">Visit IvanPandL.com!</a>
        <p>
        This website is about my personal hobby of photography. The database of website is about the review contents and photos that I took before and in the future. The home page of this website will navigate you to the review contents and newest information that I will update normally. 
        The blog link will navigate you to collection of photos
        <\p>
        <p>
        This can be an interesting website that people can discover more about my work and life as well as giving them an example of how to do a good photo for new photographer.
        <\p>
    
    
    `;
        var ele = document.createElement("div");
        ele.innerHTML = content;
        return ele;
        }