package learn.finance.repository;

import learn.finance.model.User;

import java.util.List;

public interface UserRepository {
    List<User> findAll();
    User findById(int userId);
    User addUser(User user);
    boolean deleteUser(int userId);
    boolean updateUser(User user);
}
