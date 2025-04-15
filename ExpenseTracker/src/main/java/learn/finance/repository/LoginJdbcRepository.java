package learn.finance.repository;

import learn.finance.model.Login;
import learn.finance.repository.mappers.LoginMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Collection;
import java.util.List;

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
        List<String> roles = getRolesByUsername(userName);

        return jdbcTemplate.query(sql, new LoginMapper(roles), userName)
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
        updateRoles(user);

        jdbcTemplate.update(sql, user.getUserId(), user.getUsername(), user.getPassword(),
                user.getRoleId(), user.isDisabled(), user.getLoginId());
    }

    private List<String> getRolesByUsername(String username) {
        final String sql = "SELECT r.name from role r " +
                "INNER JOIN login l " +
                "ON r.role_id = l.role_id " +
                "WHERE user_name = ?;";
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("user_name"), username);
    }

    private void updateRoles(Login login) {


        Collection<GrantedAuthority> authorities = login.getAuthorities();

        if (authorities == null) {
            return;
        }

        for (String role : Login.convertAuthoritiesToRoles(authorities)) {
            String sql = "UPDATE login "
                    + "SET role_id = ? " +
                    "WHERE user_name = ?;";
            jdbcTemplate.update(sql, login.getRoleId(), login.getUsername());
        }
    }

}
