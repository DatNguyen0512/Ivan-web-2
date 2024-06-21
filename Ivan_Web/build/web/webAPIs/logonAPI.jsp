<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="com.google.gson.*" %>
<%@page language="java" import="dbUtils.*" %>


<%
    StringData sd = new StringData(); // all fields now set to ""
    
    String email = request.getParameter("email");
    String password = request.getParameter("password");
    if ((email == null) || (password == null)) {
        sd.errorMsg = "Cannot search because of the following error: email and password must be supplied";
    } else {
        DbConn dbc = new DbConn();
        sd.errorMsg = dbc.getErr(); 
        if (sd.errorMsg.length() == 0) { 
            System.out.println("*** Ready to call logonFInd");
            sd = DbMods.logonFind(dbc, email, password);  
            if(sd.errorMsg.length()==0){
                session.setAttribute("user", sd); // write object to JSP session object

            }else{
                sd.errorMsg +=" You have been logged off!";
                session.invalidate();
            }
        }
        dbc.close(); 
    }
    Gson gson = new Gson();
    out.print(gson.toJson(sd));
              

    
/*  Note: 
    Because all of our Web APIs are invoked by our ajax (JavaScript) function 
    which expects to find the JSON of a valid object written on the page, we 
    must always write the JSON of some java object to the page, no matter what. 
    
    In this example, we really didnt need to write anything to the page, but 
    we just showed on the page what we were writing to the JSP implicit session object.
    */
%>