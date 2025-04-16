package learn.finance.repository;

import learn.finance.model.Login;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class LoginJdbcRepositoryTest {

    @Autowired
    LoginJdbcRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindLoginByUserName(){
        Login login = repository.findByUsername("kbox799@gmail.com");
        assertNotNull(login);
    }

    @Test
    void shouldCreate() {
        Login login = new Login();
        login.setUserId(2);
        login.setUsername("example@example.com");
        login.setPassword("$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa");
        login.setRoleId(2);
        login.setDisabled(false);
        Login addedLogin = repository.create(login);
        assertNotNull(addedLogin);
        assertEquals("example@example.com", addedLogin.getUsername());
    }

    @Test
    void shouldUpdate() {
        Login login = repository.findByUsername("mmaya@gmail.com");
        login.setUsername("example@example.com");
        repository.update(login);
        assertNotNull(repository.findByUsername("example@example.com"));

    }

}