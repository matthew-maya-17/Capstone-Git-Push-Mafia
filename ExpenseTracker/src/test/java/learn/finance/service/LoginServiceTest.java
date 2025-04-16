package learn.finance.service;

import learn.finance.model.Login;
import learn.finance.model.User;
import learn.finance.repository.LoginRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import javax.validation.ValidationException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class LoginServiceTest {
    @Autowired
    LoginService service;

    @MockBean
    LoginRepository repository;

    @Test
    void findByUserName() {
        Login login = new Login();
        login.setUserId(2);
        login.setUsername("example@example.com");
        login.setPassword("P@ssw0rd!");
        login.setRoleId(2);
        login.setDisabled(false);

        when(repository.findByUsername("example@example.com")).thenReturn(login);

        UserDetails actual = service.loadUserByUsername("example@example.com");
        assertNotNull(actual);
    }

    @Test
    void shouldNotFindDisabledAccount() {
        Login login = new Login();
        login.setUserId(2);
        login.setUsername("example@example.com");
        login.setPassword("P@ssw0rd!");
        login.setRoleId(2);
        login.setDisabled(true);

        when(repository.findByUsername("example@example.com")).thenReturn(login);
        assertThrows(UsernameNotFoundException.class, () -> service.loadUserByUsername("example@example.com"));
    }

    @Test
    void shouldCreate()
    {
        Login login = new Login();
        login.setUserId(2);
        login.setUsername("example@example.com");
        login.setPassword("P@ssw0rd!");
        login.setRoleId(2);
        login.setDisabled(false);

        Login expected = new Login();
        expected.setUserId(2);
        expected.setUsername("example@example.com");
        expected.setPassword("P@ssw0rd!");
        expected.setRoleId(2);
        expected.setDisabled(false);

        when(repository.create(any(Login.class))).thenReturn(expected);

        Login result = service.create(login);

        assertNotNull(result);
    }

    @Test
    void shouldNotCreateNoUserName() {
        Login login = new Login();
        login.setUserId(2);

        login.setPassword("P@ssw0rd!");
        login.setRoleId(2);
        login.setDisabled(false);

        assertThrows(ValidationException.class, () -> service.create(login));


    }

    @Test
    void shouldNotCreateBlankUserName() {
        Login login = new Login();
        login.setUserId(2);
        login.setUsername("");
        login.setPassword("P@ssw0rd!");
        login.setRoleId(2);
        login.setDisabled(false);

        assertThrows(ValidationException.class, () -> service.create(login));
    }

    @Test
    void shouldNotAddNoPassword() {
        Login login = new Login();
        login.setUserId(2);
        login.setUsername("example@example.com");
        login.setRoleId(2);
        login.setDisabled(false);

        assertThrows(ValidationException.class, () -> service.create(login));
    }

    @Test
    void shouldNotAddInvalidPassword() {
        Login login = new Login();
        login.setUserId(2);
        login.setUsername("example@example.com");
        login.setPassword("test");
        login.setRoleId(2);
        login.setDisabled(false);

        assertThrows(ValidationException.class, () -> service.create(login));
    }

}