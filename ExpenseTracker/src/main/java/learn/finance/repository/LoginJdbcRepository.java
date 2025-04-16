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
        // First insert login
        final String sql = "INSERT INTO login (user_id, user_name, password, role_id, disabled) " +
                "VALUES (?, ?, ?, ?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, user.getUserId());
            ps.setString(2, user.getUsername());
            ps.setString(3, user.getPassword());
            ps.setInt(4, user.getRoleId());
            ps.setBoolean(5, user.isDisabled());
            return ps;
        }, keyHolder);

        user.setLoginId(keyHolder.getKey().intValue());

        // Then handle roles if needed
        if (user.getRoles() != null && !user.getRoles().isEmpty()) {
            updateRoles(user);
        }

        return user;
    }

    @Override
    @Transactional
    public void update(Login user) {
        final String sql = "UPDATE login SET user_id = ?, user_name = ?, password = ?, role_id = ?, disabled = ?"
                + " WHERE login_id = ?;";
        updateRoles(user);

        jdbcTemplate.update(sql, user.getUserId(), user.getUsername(), user.getPassword(),
                user.getRoleId(), user.isDisabled(), user.getLoginId());
    }

    private List<String> getRolesByUsername(String username) {
        // Use the exact column name that exists in your database
        final String sql = "SELECT r.name FROM role r " +
                "INNER JOIN login l ON r.role_id = l.role_id " +
                "WHERE l.user_name = ?;"; // Changed user_name to username

        return jdbcTemplate.query(sql,
                (rs, rowId) -> rs.getString("name"), // Make sure this matches your column
                username);
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
