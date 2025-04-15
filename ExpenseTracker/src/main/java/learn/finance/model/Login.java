package learn.finance.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class Login extends User {
    private int loginId;
    private int userId;
    private String userName;
    private String password;
    private int roleId;
    private boolean disabled;
    private static final String AUTHORITY_PREFIX = "ROLE_";
    private List<String> roles = new ArrayList<>();

    // No-arg constructor for JSON deserialization
    public Login() {
        super("default", "default", true, true, true, true,
                convertRolesToAuthorities(List.of("USER")));
        this.roles = List.of("USER");
    }

    // Main constructor
    public Login(int loginId, int userId, String userName, String password,
                 int roleId, boolean disabled, List<String> roles) {
        super(userName,
                password,
                !disabled,  // enabled
                true,       // account non-expired
                true,       // credentials non-expired
                true,       // account non-locked
                convertRolesToAuthorities(roles != null ? roles : List.of("USER")));
        this.loginId = loginId;
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.roleId = roleId;
        this.disabled = disabled;
        this.roles = roles != null ? roles : List.of("USER");
    }

    public static List<GrantedAuthority> convertRolesToAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>(roles.size());
        for (String role : roles) {
            Assert.isTrue(!role.startsWith(AUTHORITY_PREFIX),
                    () -> String.format(
                            "%s cannot start with %s (it is automatically added)",
                            role, AUTHORITY_PREFIX));
            authorities.add(new SimpleGrantedAuthority(AUTHORITY_PREFIX + role));
        }
        return authorities;
    }

    public static List<String> convertAuthoritiesToRoles(Collection<GrantedAuthority> authorities) {
        return authorities.stream()
                .map(a -> a.getAuthority().substring(AUTHORITY_PREFIX.length()))
                .collect(Collectors.toList());
    }

    // Getters and setters remain unchanged
    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

    public int getLoginId() {
        return loginId;
    }

    public void setLoginId(int loginId) {
        this.loginId = loginId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles != null ? roles : List.of("USER");
    }

    public String getUsername() {
        return userName;
    }

    public void setUsername(String username) {
        this.userName = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }
}