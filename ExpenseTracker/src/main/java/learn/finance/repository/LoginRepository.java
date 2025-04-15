package learn.finance.repository;

import learn.finance.model.Login;

public interface LoginRepository {
    Login findByUsername(String userName);
    Login create(Login userName);
    void update(Login user);
}
