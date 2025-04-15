package learn.finance.service;

import learn.finance.model.User;
import learn.finance.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class UserServiceTest {

    @Autowired
    UserService service;

    @MockBean
    UserRepository repository;

    @Test
    void findAll() {
        User user1 = new User();
        user1.setUserId(1);
        user1.setFirstName("Kyle");
        user1.setLastName("Box");

        User user2 = new User();
        user2.setUserId(2);
        user2.setFirstName("Matthew");
        user2.setLastName("Maya");

        List<User> users = Arrays.asList(user1,user2);

        when(repository.findAll()).thenReturn(users);
        List<User> actual = service.findAll();
        assertEquals(users, actual);
    }

    @Test
    void addUser() {
        User user = new User();
        user.setFirstName("Joey");
        user.setLastName("Tsui");

        User expected = new User();
        expected.setUserId(1);
        expected.setFirstName("Joey");
        expected.setLastName("Tsui");

        when(repository.addUser(user)).thenReturn(expected);
        Result<User> result = service.addUser(user);
        assertEquals(ResultType.SUCCESS, result.getType());
        assertEquals(expected, result.getPayload());
    }

    @Test
    void shouldNotAddUserWthNullFirstName(){
        User user = new User();
        user.setFirstName(null);
        user.setLastName("Tsui");

        Result<User> result = service.addUser(user);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddUserWthNullLastName(){
        User user = new User();
        user.setFirstName("Joey");
        user.setLastName(null);

        Result<User> result = service.addUser(user);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddUserWthFirstNameLessThanOne(){
        User user = new User();
        user.setFirstName("");
        user.setLastName("Tsui");

        Result<User> result = service.addUser(user);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotAddUserWthLastNameLessThanOne(){
        User user = new User();
        user.setFirstName("Joey");
        user.setLastName("");

        Result<User> result = service.addUser(user);
        assertEquals(ResultType.INVALID, result.getType());
    }


    @Test
    void updateUser() {
        User user = new User();
        user.setUserId(1);
        user.setFirstName("Joey");
        user.setLastName("Tsui");

        when(repository.updateUser(user)).thenReturn(true);
        Result<User> result = service.updateUser(user);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotUpdateUserWithNullFirstName(){
        User user = new User();
        user.setUserId(1);
        user.setFirstName(null);
        user.setLastName("Tsui");

        Result<User> result = service.updateUser(user);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotUpdateUserWithNullLastName(){
        User user = new User();
        user.setUserId(1);
        user.setFirstName("Joey");
        user.setLastName(null);

        Result<User> result = service.updateUser(user);
        assertEquals(ResultType.INVALID, result.getType());
    }


    @Test
    void shouldNotUpdateUserWithLessThanOneFirstName(){
        User user = new User();
        user.setUserId(1);
        user.setFirstName("");
        user.setLastName("Tsui");

        Result<User> result = service.updateUser(user);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldNotUpdateUserWithLessThanOneLastName(){
        User user = new User();
        user.setUserId(1);
        user.setFirstName("Joey");
        user.setLastName("");

        Result<User> result = service.updateUser(user);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void deleteUser() {
        when(repository.deleteUser(1)).thenReturn(true);
        assertTrue(service.deleteUser(1));
    }
}