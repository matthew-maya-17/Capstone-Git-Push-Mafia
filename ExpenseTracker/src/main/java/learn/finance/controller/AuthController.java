package learn.finance.controller;

import learn.finance.model.Login;
import learn.finance.security.JwtConverter;
import learn.finance.service.LoginService;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.ValidationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtConverter converter;
    private final LoginService service;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtConverter converter,
                          LoginService service) {
        this.authenticationManager = authenticationManager;
        this.converter = converter;
        this.service = service;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, String>> authenticate(@RequestBody Login loginRequest) {
        System.out.println("Auth attempt for: " + loginRequest.getUsername());

        try {
            // 1. Create authentication token
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    );

            // 2. Authenticate
            Authentication authentication = authenticationManager.authenticate(authToken);

            // 3. Get the full user details
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // 4. Load the complete Login entity to get userId
            Login authenticatedUser = (Login) userDetails;
            int userId = authenticatedUser.getUserId();

            System.out.println("Auth successful for user ID: " + userId);

            // 5. Generate JWT token with userId
            String jwtToken = converter.getTokenFromUser(userDetails, userId);

            // 6. Return response
            Map<String, String> response = new HashMap<>();
            response.put("jwt_token", jwtToken);
            response.put("user_id", String.valueOf(userId)); // Optionally return userId in response
            return ResponseEntity.ok(response);

        } catch (AuthenticationException ex) {
            System.out.println("Auth failed: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid Login login) {
        try {
            // Set default values if null
            if (login.getRoles() == null) {
                login.setRoles(List.of("USER"));
            }
            if (login.getRoleId() == 0) {
                login.setRoleId(1); // Default role ID
            }
            login.setDisabled(false); // New users are active by default

            Login result = service.create(login);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}
