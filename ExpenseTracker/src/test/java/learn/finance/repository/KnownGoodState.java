package learn.finance.repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class KnownGoodState {

    @Autowired
    JdbcTemplate jdbcTemplate;

    boolean hasSetup = false;

    void set() {
        jdbcTemplate.update("call set_known_good_state();");
        hasSetup = true;
    }

    public boolean isSetup() {
        return hasSetup;
    }

    public void setSetup(boolean hasSetup) {
        this.hasSetup = hasSetup;
    }
}
