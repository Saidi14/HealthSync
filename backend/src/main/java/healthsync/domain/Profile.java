package healthsync.domain;

import jakarta.persistence.*;
import healthsync.domain.enums.ActivityLevel;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @Column(nullable = false)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String surname;

    @Column(nullable = false)
    private long height; // in cm

    @Column(nullable = false)
    private long weight; // in kg

    @Column(nullable = false)
    private long goal; // Could represent goal weight or other numeric goal

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityLevel activityLevel;

    @Column(nullable = false)
    private long dailyCalorieGoal; // in kcal

    // Public no-arg constructor
    public Profile() {}

    private Profile(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.surname = builder.surname;
        this.height = builder.height;
        this.weight = builder.weight;
        this.goal = builder.goal;
        this.activityLevel = builder.activityLevel;
        this.dailyCalorieGoal = builder.dailyCalorieGoal;
    }

    public static class Builder {
        private String id;
        private String name;
        private String surname;
        private long height;
        private long weight;
        private long goal;
        private ActivityLevel activityLevel;
        private long dailyCalorieGoal;

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder surname(String surname) {
            this.surname = surname;
            return this;
        }

        public Builder height(long height) {
            this.height = height;
            return this;
        }

        public Builder weight(long weight) {
            this.weight = weight;
            return this;
        }

        public Builder goal(long goal) {
            this.goal = goal;
            return this;
        }

        public Builder activityLevel(ActivityLevel activityLevel) {
            this.activityLevel = activityLevel;
            return this;
        }

        public Builder dailyCalorieGoal(long dailyCalorieGoal) {
            this.dailyCalorieGoal = dailyCalorieGoal;
            return this;
        }

        public Profile build() {
            return new Profile(this);
        }
    }

    public Profile copy() {
        return new Builder()
                .id(this.id)
                .name(this.name)
                .surname(this.surname)
                .height(this.height)
                .weight(this.weight)
                .goal(this.goal)
                .activityLevel(this.activityLevel)
                .dailyCalorieGoal(this.dailyCalorieGoal)
                .build();
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSurname() { return surname; }
    public void setSurname(String surname) { this.surname = surname; }
    public long getHeight() { return height; }
    public void setHeight(long height) { this.height = height; }
    public long getWeight() { return weight; }
    public void setWeight(long weight) { this.weight = weight; }
    public long getGoal() { return goal; }
    public void setGoal(long goal) { this.goal = goal; }
    public ActivityLevel getActivityLevel() { return activityLevel; }
    public void setActivityLevel(ActivityLevel activityLevel) { this.activityLevel = activityLevel; }
    public long getDailyCalorieGoal() { return dailyCalorieGoal; }
    public void setDailyCalorieGoal(long dailyCalorieGoal) { this.dailyCalorieGoal = dailyCalorieGoal; }
}
