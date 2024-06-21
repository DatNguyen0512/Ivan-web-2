<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // must pass in the same name you used when you set the object into the session 
    // (from some other Web API JSP page.
    // Must type cast the plain old object that is extracted from the session.
    StringData sd = (StringData) session.getAttribute("user");

    if (sd != null) {
        //sd.errorMsg = "Welcome!";
    } else {
        sd = new StringData();
        sd.errorMsg = "You aren't logged in, profile is denied to extract.";
    }

    Gson gson = new Gson();
    out.print(gson.toJson(sd));

   /*  Note: 
    Because all of our Web APIs are invoked by our ajax (JavaScript) function 
    which expects to find the JSON of a valid object written on the page, we 
    must always write the JSON of some java object to the page, no matter what. 
    
    In thie example, we actually need to write to the page, to let the client side 
    know (the JS code that called us using AJAX) what was extracted from the JSP 
    implicit session object.
     */
%>