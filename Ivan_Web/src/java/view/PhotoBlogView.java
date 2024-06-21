package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.blog.*;

// classes in my project
import dbUtils.*;

public class PhotoBlogView {

    public static StringDataList allUsersAPI(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT photo_blog_id, photo_topic, photos, "
                    + "list_price, time_line, photo_blog.web_user_id, user_email"
                    + " FROM web_user, photo_blog where web_user.web_user_id = photo_blog.web_user_id"
                    + " ORDER BY photo_blog_id";  // you always want to order by something, not just random order.
             // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {

                StringData sd = new StringData();

                // overloaded constructor sets all data members by extracting from resultSet.
                // plainInteger returns integer converted to string with no commas.
                
                sd.photoBlogId = FormatUtils.plainInteger(results.getObject("photo_blog_id"));
                sd.photoTopic = FormatUtils.formatString(results.getObject("photo_topic"));
                sd.listPrice = FormatUtils.formatDollar(results.getObject("list_price"));
                sd.timeLine = FormatUtils.formatDate(results.getObject("time_line"));
                sd.photos = FormatUtils.formatString(results.getObject("photos"));
                sd.webUserId= FormatUtils.plainInteger(results.getObject("photo_blog.web_user_id"));
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));
               // sd.membershipFee = FormatUtils.formatDollar(results.getObject("membership_fee"));
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in WebUserView.allUsersAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }

}
