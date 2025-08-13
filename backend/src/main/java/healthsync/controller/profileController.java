package healthsync.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import healthsync.domain.Profile;
import healthsync.service.profile_service.IProfileService;

import java.util.List;

@RestController
@RequestMapping("/profiles")
@CrossOrigin(origins = "*")
public class ProfileController {

    private final IProfileService profileService;

    public ProfileController(IProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<Profile> create(@Valid @RequestBody Profile profile) {
        Profile created = profileService.create(profile);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> read(@PathVariable String id) {
        Profile profile = profileService.read(id);
        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<Profile> update(@Valid @RequestBody Profile profile) {
        Profile updated = profileService.update(profile);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean deleted = profileService.delete(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Profile>> getAll() {
        return ResponseEntity.ok(profileService.getAll());
    }
}
