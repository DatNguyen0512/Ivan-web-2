package model.blog;

import dbUtils.DbConn;
import dbUtils.FormatUtils;
import dbUtils.PrepStatement;
import dbUtils.ValidationUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


public class DbMods {

    public static StringData findById(DbConn dbc, String id) {

        StringData sd = new StringData();
        try {
            String sql = "SELECT photo_blog.web_user_id, photo_blog_id, photo_topic,time_line, list_price, photos, user_email "
                    + "FROM web_user, photo_blog WHERE web_user.web_user_id = photo_blog.web_user_id "
                    + "AND photo_blog_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                sd = new StringData();
                // plainInteger returns integer converted to string with no commas.
                
                sd.photoBlogId = FormatUtils.plainInteger(results.getObject("photo_blog_id"));
                sd.photoTopic = FormatUtils.formatString(results.getObject("photo_topic"));
                sd.photos = FormatUtils.formatString(results.getObject("photos"));
                sd.timeLine = FormatUtils.formatDate(results.getObject("time_line"));
                sd.listPrice = FormatUtils.formatDollar(results.getObject("list_price"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("photo_blog.web_user_id"));
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));
                }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in WebUserView.getUserById(): " + e.getMessage();
        }
        return sd;

    } // getUserById

    /*
    Returns a "StringData" object that is full of field level validation
    error messages (or it is full of all empty strings if inputData
    totally passed validation.  
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /* Useful to copy field names from StringData as a reference
    public String webUserId = "";
    public String userEmail = "";
    public String userPassword = "";
    public String userPassword2 = "";
    public String birthday = "";
    public String membershipFee = "";
    public String userRoleId = "";   // Foreign Key
    public String userRoleType = ""; // getting it from joined user_role table.
         */
        
        // Validation
        errorMsgs.photoTopic = ValidationUtils.stringValidationMsg(inputData.photoTopic, 45, true);

        errorMsgs.photos = ValidationUtils.stringValidationMsg(inputData.photos, 300, false);

        errorMsgs.timeLine = ValidationUtils.dateValidationMsg(inputData.timeLine, false);
        errorMsgs.listPrice = ValidationUtils.decimalValidationMsg(inputData.listPrice, false);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);
        //errorMsgs.userEmail = ValidationUtils.stringValidationMsg(inputData.userEmail, 45, true);
        return errorMsgs;
    } // validate 

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql;
            sql = "INSERT INTO photo_blog (photo_topic, photos, time_line, list_price, web_user_id) "
                    + "values (?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.photoTopic); // string type is simple
            pStatement.setString(2, inputData.photos);
            pStatement.setDate(3, ValidationUtils.dateConversion(inputData.timeLine));
            pStatement.setBigDecimal(4, ValidationUtils.decimalConversion(inputData.listPrice));
            pStatement.setInt(5, ValidationUtils.integerConversion(inputData.webUserId));
            

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That email address is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert

    public static StringData update(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            String sql = "UPDATE photo_blog SET photo_topic=?, photos=?,time_line=?, list_price=?, " 
                    + "web_user_id=? WHERE photo_blog_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.photoTopic); // string type is simple
            pStatement.setString(2, inputData.photos);
            pStatement.setDate(3, ValidationUtils.dateConversion(inputData.timeLine));
            pStatement.setBigDecimal(4, ValidationUtils.decimalConversion(inputData.listPrice));
            pStatement.setInt(5, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.photoBlogId));
            

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That topic is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update
    
    public static String delete(String userId, DbConn dbc) {

        if (userId == null) {
            return "Error in model.blog.DbMods.delete: cannot delete photo record because 'userId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM photo_blog WHERE photo_blog_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, userId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "This record was already deleted. ";
            } else if (numRowsDeleted > 1) {
                result = "The database is currently unavailable. Please try later or contact support";
            }

        } catch (Exception e) {
            result = "Oops! You can not delete this record. PLease contact support ";
        }

        return result;
    }

} // class
