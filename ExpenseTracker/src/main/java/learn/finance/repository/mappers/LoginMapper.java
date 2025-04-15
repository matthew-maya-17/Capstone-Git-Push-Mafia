package learn.finance.repository.mappers;

import learn.finance.model.Login;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class LoginMapper implements RowMapper<Login> {

    private final List<String> roles;

    public LoginMapper(List<String> roles) {
        this.roles = roles;
    }


    @Override
    public Login mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Login (
                resultSet.getInt("login_id"),
                resultSet.getInt("user_id"),
                resultSet.getString("user_name"),
                resultSet.getString("password"),
                resultSet.getInt("role_id"),
                resultSet.getBoolean("disabled"),
                roles
        );
    }
}
