package learn.finance.repository;

import learn.finance.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

public class UserJdbcRepository implements UserRepository{
    private final JdbcTemplate jdbcTemplate;

    public UserJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> findAll() {
        final String sql = "select user_id, first_name, last_name from user;";
        return jdbcTemplate.query(sql, new UserMapper());
    }

    @Override
    public User addUser(User user) {
       final String sql = "insert into user (first_name, last_name) " +
               "values (?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getFirstName);
            ps.setString(2, user.getLastName);
            return ps;
        }, keyHolder);

        if(rowAffected <= 0){
            return null;
        }

        user.setUserId(keyHolder.getKey().intValue());
        return user;
    }

    @Override
    public boolean deleteUser(int userId) {
        jdbcTemplate.update("delete from login where user_id = ?;", userId);
        return jdbcTemplate.update("delete from user where user_id = ?;", userId) > 0;
    }

    @Override
    public boolean updateUser(User user) {
        final String sql = "update user set " +
                "first_name = ?, " +
                "last_name = ? " +
                "where user_id = ?;";
        return jdbcTemplate.update(sql,
                user.getFirstName(),
                user.getLastName(),
                user.getUserId() > 0);
    }
}
