import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;


/* для всіх таблиць код майже аналогічний*/
public class to CSV {
    public static void main(String[] args) {

        String username = "";
        String password = "";


        final String connectionUrl =
                "jdbc:sqlserver://kmaserver.database.windows.net:1433;"
                        + "database=youtube;"
                        + "user=" + username + ";"
                        + "password=" + password + ";"
                        + "encrypt=true;"
                        + "trustServerCertificate=false;"
                        + "hostNameInCertificate=*.database.windows.net;"
                        + "loginTimeout=30;";


        String sqlQuery = "SELECT * FROM Comment";

        try (Connection connection = DriverManager.getConnection(connectionUrl);
             PreparedStatement statement = connection.prepareStatement(sqlQuery);
             ResultSet resultSet = statement.executeQuery()) {

            exportResultSetToCSV(resultSet, "Comment.csv");

        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }

    private static void exportResultSetToCSV(ResultSet resultSet, String fileName) throws SQLException, IOException {
        try (PrintWriter writer = new PrintWriter(new FileWriter(fileName))) {
            int columnCount = resultSet.getMetaData().getColumnCount();

            for (int i = 1; i <= columnCount; i++) {
                writer.print(resultSet.getMetaData().getColumnName(i));
                if (i < columnCount) {
                    writer.print(",");
                }
            }
            writer.println();

            while (resultSet.next()) {
                for (int i = 1; i <= columnCount; i++) {
                    writer.print(resultSet.getString(i));
                    if (i < columnCount) {
                        writer.print(",");
                    }
                }
                writer.println();
            }
        }
    }
}
