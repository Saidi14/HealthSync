package healthsync.domain;

import healthsync.domain.enums.ActivityLevel;
import healthsync.util.Helper;

import java.util.Objects;

public class ProfileFactory {
    public static UserProfile createProfile(
            String id,
            String name,
            String surname,
            long height,
            long weight,
            long goal,
            ActivityLevel activityLevel,
            long dailyCalorieGoal
    ) {
        if (Helper.isNullOrEmpty(id) || 
            Helper.isNullOrEmpty(name) || 
            Helper.isNullOrEmpty(surname) || 
            height <= 0 || 
            weight <= 0 || 
            activityLevel == null) {
            return null;
        }

        return new UserProfile.Builder()
                .id(id)
                .name(name)
                .surname(surname)
                .height(height)
                .weight(weight)
                .goal(goal)
                .activityLevel(activityLevel)
                .dailyCalorieGoal(dailyCalorieGoal)
                .build();
    }

    public static UserProfile createProfile(
            String name,
            String surname,
            long height,
            long weight,
            long goal,
            ActivityLevel activityLevel,
            long dailyCalorieGoal
    ) {
        return createProfile(
                Helper.generateId(),
                name,
                surname,
                height,
                weight,
                goal,
                activityLevel,
                dailyCalorieGoal
        );
    }
}