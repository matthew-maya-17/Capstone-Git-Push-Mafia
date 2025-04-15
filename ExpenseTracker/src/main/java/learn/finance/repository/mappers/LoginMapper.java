package learn.finance.repository.mappers;

import learn.finance.model.Login;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginMapper implements RowMapper<Login> {

    @Override
    public Login mapRow(ResultSet resultSet, int i) throws SQLException {
        Login login = new Login();
        login.setLoginId(resultSet.getInt("login_id"));
        login.setUserId(resultSet.getInt("user_id"));
        login.setUsername(resultSet.getString("user_name"));
        login.setPassword(resultSet.getString("password"));
        login.setAdmin(resultSet.getBoolean("is_admin"));
        login.setDisabled(resultSet.getBoolean("disabled"));
        return login;
    }
}
