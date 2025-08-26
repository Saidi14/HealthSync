package healthsync.service;

import healthsync.domain.Profile;
import healthsync.repository.ProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService implements IProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Override
    @Transactional
    public Profile create(Profile profile) {
        if (profile == null) {
            throw new IllegalArgumentException("Profile data is null");
        }
        return profileRepository.save(profile);
    }

    @Override
    public Profile read(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("Profile ID is null or empty");
        }
        return profileRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Profile with ID " + id + " not found"));
    }

    @Override
    @Transactional
    public Profile update(Profile profile) {
        if (profile.getId() == null || profile.getId().trim().isEmpty()) {
            throw new IllegalArgumentException("Missing profile ID");
        }
        if (!profileRepository.existsById(profile.getId())) {
            throw new EntityNotFoundException("Profile with ID " + profile.getId() + " not found");
        }
        return profileRepository.save(profile);
    }

    @Override
    @Transactional
    public boolean delete(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("Profile ID is null or empty");
        }
        if (!profileRepository.existsById(id)) {
            return false;
        }
        profileRepository.deleteById(id);
        return true;
    }

    @Override
    public List<Profile> getAll() {
        return profileRepository.findAll();
    }
}
