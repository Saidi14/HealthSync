package healthsync.service;

import healthsync.domain.Profile;
import healthsync.service.IService;
import java.util.List;

public interface IProfileService extends IService<Profile, String> {
    List<Profile> getAll();
}
