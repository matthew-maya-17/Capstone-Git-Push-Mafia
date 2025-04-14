package learn.finance.repository;


import learn.finance.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class UserJdbcRepositoryTest {
@Autowired
UserJdbcRepository repository;
@Autowired
KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<User> users = repository.findAll();
        assertFalse(users.isEmpty());
        assertEquals(3, users.size());
    }

    @Test
    void shouldAddUser() {
        User user = new User();
        user.setFirstName("Billy");
        user.setLastName("Bob");
       User addedUser = repository.addUser(user);
        assertNotNull(addedUser);
        assertEquals("Billy", addedUser.getFirstName());
    }

    @Test
    void shouldUpdateUser() {
        List<User> users = repository.findAll();
        User user = users.get(0);
        user.setLastName("lastName");
        assertTrue(repository.updateUser(user));

    }

    @Test
    void shouldDelete() {
        User user = new User();
        user.setFirstName("Billy");
        user.setLastName("Bob");
        User addedUser = repository.addUser(user);
        assertTrue(repository.deleteUser(addedUser.getUserId()));
    }



}