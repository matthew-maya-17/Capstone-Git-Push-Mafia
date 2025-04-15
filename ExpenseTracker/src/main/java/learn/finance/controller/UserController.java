package learn.finance.controller;

import learn.finance.exception.ErrorResponse;
import learn.finance.model.User;
import learn.finance.service.Result;
import learn.finance.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> findAll(){
        return service.findAll();
    }

    @PostMapping
    public ResponseEntity<Object> addUser(@RequestBody User user){
        Result<User> result = service.addUser(user);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Object> update(@PathVariable int userId, @RequestBody User user) {
        if (userId != user.getUserId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<User> result = service.updateUser(user);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteById(@PathVariable int userId) {
        if (service.deleteUser(userId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
