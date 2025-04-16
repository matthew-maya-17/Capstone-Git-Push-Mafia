package learn.finance.service;

import learn.finance.repository.LoginRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import learn.finance.model.Login;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.List;

@Service
public class LoginService implements UserDetailsService {

    private final LoginRepository repository;
    private final PasswordEncoder encoder;

    public LoginService(LoginRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Login login = repository.findByUsername(username);

        if(login == null || login.isDisabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return login;
    }

    public Login create(Login login) {
        validate(login.getUsername());
        validatePassword(login.getPassword());

//        List<String> roles = login.getRoles() != null ? login.getRoles() : List.of("USER");
        List<String> roles;

        if (login.getRoles() != null) {
            roles = login.getRoles();
        } else {
            if (login.getRoleId() == 1) {
                roles = List.of("ROLE_USER");
            } else if (login.getRoleId() == 2) {
                roles = List.of("ROLE_ADMIN");
            } else {
                roles = List.of("ROLE_USER");
            }
        }
        login.setPassword(encoder.encode(login.getPassword()));
        return repository.create(new Login(0, login.getUserId(), login.getUsername(),
                login.getPassword(), login.getRoleId(), false, roles));
    }

    private void validate(String username){
        if(username == null || username.isBlank()){
            throw new ValidationException("username is required");
        }

        if (username.length() > 50) {
            throw new ValidationException("username must be less than 50 characters");
        }
    }

    private void validatePassword(String password){
        if(password == null || password.length() < 8){
            throw new ValidationException("Password cannot be null or less than 8 characters");
        }

        int digits = 0;
        int letters = 0;
        int others = 0;

        for(char c : password.toCharArray()){
            if(Character.isDigit(c)){
                digits++;
            } else if(Character.isLetter(c)){
                letters++;
            }else{
                others++;
            }
        }

        if(digits == 0 || letters == 0 || others == 0){
            throw new ValidationException("Password must contain a letter, digit, and non-digit/non-letter.");
        }
    }



}
