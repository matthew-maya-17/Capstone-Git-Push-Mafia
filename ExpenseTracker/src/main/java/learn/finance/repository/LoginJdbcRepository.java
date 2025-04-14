package learn.finance.repository;

import learn.finance.model.Login;
import org.springframework.jdbc.core.JdbcTemplate;

public class LoginJdbcRepository implements LoginRepository{

    private final JdbcTemplate jdbcTemplate;

    public LoginJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Login findLoginByUserId(int userId) {
        return null;
    }
}
