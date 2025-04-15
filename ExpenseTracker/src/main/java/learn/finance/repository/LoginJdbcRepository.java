package learn.finance.repository;

import learn.finance.model.Login;
import learn.finance.repository.mappers.LoginMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class LoginJdbcRepository implements LoginRepository{

    private final JdbcTemplate jdbcTemplate;

    public LoginJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Login findLoginByUserId(int userId) {
        final String sql = "SELECT login_id, user_id, user_name, password, is_admin, disabled FROM login " +
                "WHERE user_id = ?;";

        return jdbcTemplate.query(sql, new LoginMapper(), userId).stream()
                .findAny().orElse(null);
    }
}
