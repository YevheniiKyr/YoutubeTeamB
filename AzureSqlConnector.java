
import java.sql.*;

public class AzureSqlConnector {

    public static void main(String[] args) throws SQLException {

        // Update the username and password with your own credentials
        String username = "*";
        String password = "*"; // Please use a secure method to store and access the password.

        // Construct the connection URL
        final String connectionUrl =
                "jdbc:sqlserver://kmaserver.database.windows.net:1433;"
                        + "database=youtube;"
                        + "user=" + username + ";"
                        + "password=" + password + ";"
                        + "encrypt=true;"
                        + "trustServerCertificate=false;"
                        + "hostNameInCertificate=*.database.windows.net;"
                        + "loginTimeout=30;";

       final String createChannel = "CREATE TABLE Channel (" +
                "id VARCHAR(255) PRIMARY KEY," +
                "title VARCHAR(255)," +
                "description_channel TEXT," +
                "customURL VARCHAR(255)," +
                "publishedAt DATETIME," +
                "defaultLanguage VARCHAR(255)," +
                "country VARCHAR(255)," +
                "viewCount BIGINT," +
                "subscriberCount INT," +
                "videoCount INT" +
                ");";

       final String showTables= "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'";

        // SQL statement for creating the 'Video' table
        final   String createVideoTableSql = "CREATE TABLE Video (" +
                "id VARCHAR(255) PRIMARY KEY," +
                "publishedAt DATETIME," +
                "channelId VARCHAR(255)," +
                "channelTitle VARCHAR(255)," +
                "title VARCHAR(255)," +
                "description_video TEXT," +
                "duration VARCHAR(255)," +
                "definition_video VARCHAR(255)," +
                "defaultAudioLanguage VARCHAR(30)," +
                "viewCount BIGINT," +
                "likeCount INT," +
                "dislikeCount INT," +
                "favoriteCount INT," +
                "commentCount INT," +
                "recordingDate DATETIME," +
                "speechText TEXT," +
                "FOREIGN KEY (channelId) REFERENCES Channel(id) ON DELETE CASCADE" +
                ");";

        // SQL statement for creating the 'Comment' table
        final String createCommentTableSql = "CREATE TABLE Comment (" +
                "id VARCHAR(255) PRIMARY KEY," +
                "textDisplay TEXT," +
                "likeCount INT," +
                "publishedAt DATETIME," +
                "updatedAt DATETIME," +
                "parentId VARCHAR(255)," +
                "videoId VARCHAR(255)," +
                "FOREIGN KEY (parentId) REFERENCES Comment(id) ON DELETE NO ACTION," +
                "FOREIGN KEY (videoId) REFERENCES Video(id) ON DELETE CASCADE" +
                ");";


        // Load SQL Server JDBC driver and establish connection.
        System.out.print("Connecting to SQL Server ... ");
        try (Connection connection = DriverManager.getConnection(connectionUrl)) {
            System.out.println("Done.");
            Statement statement = connection.createStatement();

            ResultSet resultSet = statement.executeQuery(showTables);

            // Iterate through the result set and print each table name
           while (resultSet.next()) {
                String tableName = resultSet.getString("TABLE_NAME");
               System.out.println(tableName);
            }
            //System.out.println("Table 'Channel' created successfully");
            // Execute the statement
           // statement.execute(createCommentTableSql);
           // System.out.println("Table 'Video' created successfully");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
    }
}
