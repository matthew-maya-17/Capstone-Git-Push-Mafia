package learn.finance.service;

import learn.finance.model.User;
import learn.finance.repository.UserJdbcRepository;
import learn.finance.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public User findById(int userId){
        return repository.findById(userId);
    }

    public Result<User> addUser(User user){
        Result<User> result = validate(user);

        if(!result.isSuccess()){
            return result;
        }

        if(user.getUserId() != 0){
            result.addMessage("User ID cannot be set for add operation", ResultType.INVALID);
        }

        user = repository.addUser(user);
        result.setPayload(user);
        return result;
    }

    public Result<User> updateUser(User user){
        Result<User> result = validate(user);

        if(!result.isSuccess()){
            return result;
        }

        if(user.getUserId() <= 0){
            result.addMessage("User ID must be set for update operation", ResultType.INVALID);
        }

        if(!repository.updateUser(user)){
            result.addMessage("User not found", ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteUser(int userId){
        return repository.deleteUser(userId);
    }

    private Result<User> validate(User user){
        Result<User> result = new Result<>();

        if(user == null){
            result.addMessage("User cannot be null", ResultType.INVALID);
            return result;
        }

        if(user.getFirstName() == null){
            result.addMessage("User firstName cannot be null", ResultType.INVALID);
            return result;
        }else if(user.getFirstName().length() > 50 || user.getFirstName().length() < 1){
            result.addMessage("User firstName cannot be less than 1 character or more than 50 characters", ResultType.INVALID);
            return result;
        }

        if(user.getLastName() == null){
            result.addMessage("User firstName cannot be null", ResultType.INVALID);
            return result;
        }else if(user.getLastName().length() > 50 || user.getLastName().length() < 1){
            result.addMessage("User lastName cannot be less than 1 character or more than 50 characters", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
