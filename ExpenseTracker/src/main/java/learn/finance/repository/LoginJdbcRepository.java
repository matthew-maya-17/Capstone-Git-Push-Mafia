package learn.finance.repository;

import learn.finance.model.Login;
import learn.finance.repository.mappers.LoginMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class LoginJdbcRepository implements LoginRepository{

    private final JdbcTemplate jdbcTemplate;

    public LoginJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public Login findByUsername(String userName) {
        final String sql = "SELECT login_id, user_id, user_name, password, role_id, disabled "
                + "FROM login "
                + "WHERE user_name = ?;";

        return jdbcTemplate.query(sql, new LoginMapper(), userName)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public Login create(Login user) {
        final String sql = "INSERT INTO login (login_id, user_id, user_name, password, role_id) values (?, ?, ?, ?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, user.getLoginId());
            ps.setInt(2, user.getUserId());
            ps.setString(3, user.getUsername());
            ps.setString(4, user.getPassword());
            ps.setInt(5, user.getRoleId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setLoginId(keyHolder.getKey().intValue());

        return user;
    }

    @Override
    @Transactional
    public void update(Login user) {
        final String sql = "UPDATE login SET user_id = ?, user_name = ?, password = ?, role_id = ?, disabled = ?"
                + "WHERE login_id = ?";

        jdbcTemplate.update(sql, user.getUserId(), user.getUsername(), user.getPassword(),
                user.getRoleId(), user.isDisabled(), user.getLoginId());
    }
}
