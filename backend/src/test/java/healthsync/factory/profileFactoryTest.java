package healthsync.factory;

import healthsync.domain.UserProfile;
import healthsync.domain.ProfileFactory;
import healthsync.domain.enums.ActivityLevel;
import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ProfileFactoryTest {

    private static UserProfile p1 = ProfileFactory.createProfile(
            "1", 
            "Naqeebah", 
            "Khan", 
            175, 
            72, 
            68, 
            ActivityLevel.MODERATELY_ACTIVE, 
            2200
    );

    private static UserProfile p2 = ProfileFactory.createProfile(
            "2",
            "John",
            "Doe",
            180,
            80,
            75,
            ActivityLevel.VERY_ACTIVE,
            2500
    );

    private static UserProfile p3 = ProfileFactory.createProfile(
            "Jane",
            "Smith",
            165,
            60,
            55,
            ActivityLevel.LIGHTLY_ACTIVE,
            1800
    );

    @Test
    @Order(1)
    public void testCreateProfile1() {
        assertNotNull(p1);
        assertEquals("Naqeebah", p1.getName());
        assertEquals("Khan", p1.getSurname());
        assertEquals(175, p1.getHeight());
        assertEquals(ActivityLevel.MODERATELY_ACTIVE, p1.getActivityLevel());
        System.out.println(p1.toString());
    }

    @Test
    @Order(2)
    public void testCreateProfile2() {
        assertNotNull(p2);
        assertEquals("John", p2.getName());
        assertEquals(180, p2.getHeight());
        assertEquals(ActivityLevel.VERY_ACTIVE, p2.getActivityLevel());
        System.out.println(p2.toString());
    }

    @Test
    @Order(3)
    public void testCreateProfile3() {
        assertNotNull(p3);
        assertNotNull(p3.getId()); // Testing auto-generated ID
        assertEquals("Jane", p3.getName());
        assertEquals(165, p3.getHeight());
        System.out.println(p3.toString());
    }

    @Test
    @Order(4)
    public void testInvalidProfile() {
        UserProfile invalid = ProfileFactory.createProfile(
                null,
                null,
                null,
                0,
                0,
                0,
                null,
                0
        );
        assertNull(invalid);
    }
}