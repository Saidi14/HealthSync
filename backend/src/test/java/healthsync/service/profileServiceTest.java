package healthsync.service;

import healthsync.domain.Profile;
import healthsync.domain.enums.ActivityLevel;
import healthsync.repository.ProfileRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.annotation.Order;

import jakarta.transaction.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Transactional
class ProfileServiceTest {

    @Autowired
    private IProfileService service;

    @Autowired
    private ProfileRepository repository;

    private static Profile profile;

    @BeforeAll
    public static void setUp() {
        profile = new Profile.Builder()
                .id("p-001")
                .name("John")
                .surname("Doe")
                .height(180)
                .weight(80)
                .goal(75)
                .activityLevel(ActivityLevel.MODERATE)
                .dailyCalorieGoal(2500)
                .build();
    }

    @Test
    @Order(1)
    void create() {
        Profile created = service.create(profile);
        assertNotNull(created);
        assertEquals(profile.getId(), created.getId());
        System.out.println("Created Profile: " + created);
        profile = created;
    }

    @Test
    @Order(2)
    void read() {
        Profile read = service.read(profile.getId());
        assertNotNull(read);
        assertEquals(profile.getId(), read.getId());
        System.out.println("Read Profile: " + read);
    }

    @Test
    @Order(3)
    void update() {
        Profile updatedProfile = new Profile.Builder()
                .id(profile.getId())
                .name("Johnathan")
                .surname(profile.getSurname())
                .height(profile.getHeight())
                .weight(profile.getWeight())
                .goal(profile.getGoal())
                .activityLevel(profile.getActivityLevel())
                .dailyCalorieGoal(profile.getDailyCalorieGoal())
                .build();

        Profile updated = service.update(updatedProfile);
        assertNotNull(updated);
        assertEquals("Johnathan", updated.getName());
        System.out.println("Updated Profile: " + updated);
        profile = updated;
    }

    @Test
    @Order(4)
    void delete() {
        assertTrue(service.delete(profile.getId()));
        assertThrows(Exception.class, () -> service.read(profile.getId()));
        System.out.println("Deleted Profile ID: " + profile.getId());
    }

    @Test
    @Order(5)
    void getAll() {
        List<Profile> profiles = service.getAll();
        assertNotNull(profiles);
        assertTrue(profiles.size() >= 0);
        System.out.println("All Profiles: " + profiles);
    }
}
