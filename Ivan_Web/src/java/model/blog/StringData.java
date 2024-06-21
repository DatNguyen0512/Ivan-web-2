package model.blog;

import dbUtils.FormatUtils;
import java.sql.ResultSet;
/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData {

    public String photoBlogId ="";
    public String photoTopic = "";
    public String webUserId = "";// getting it from joined user_role table.
    public String photos = "";
    public String timeLine = "";
    public String listPrice = "";// getting it from joined user_role table.
    public String userEmail ="";
    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }


    public int getCharacterCount() {
        String s = this.photoBlogId +  this.photoTopic + this.webUserId +  this.photos + this.timeLine
                + this.listPrice + this.userEmail ;
        return s.length();
    }

    public String toString() {
        return "Photo Blog Id:" + this.photoBlogId
                + ", Photo topic: " + this.photoTopic
                + ", Web User ID: " + this.webUserId
                + ", Image: " + this.photos
                + ", timeline: " + this.timeLine
                + ", list price: " + this.listPrice
                + ", email: " + this.userEmail;
    }
}
