package learn.finance.repository;

import learn.finance.model.Login;

public interface LoginRepository {
    Login findLoginByUserId(int userId);
}
