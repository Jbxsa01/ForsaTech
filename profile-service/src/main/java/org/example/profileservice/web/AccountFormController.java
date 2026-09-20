package org.example.profileservice.web;

import org.example.profileservice.client.UserClient;
import org.example.profileservice.model.Profile;
import org.example.profileservice.repository.ProfileRepository;
import org.example.profileservice.security.JwtProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
public class AccountFormController {

    private final ProfileRepository repository;
    private final JwtProvider jwtProvider;
    private final UserClient userClient;

    public AccountFormController(ProfileRepository repository, JwtProvider jwtProvider, UserClient userClient) {
        this.repository = repository;
        this.jwtProvider = jwtProvider;
        this.userClient = userClient;
    }

    public static class AccountForm {
        public String firstName;
        public String lastName;
        public String email;
        public String phone;
        public String location;
        public String dateOfBirth;
        public String bio;
        public String currentPosition;
        public String company;
        public String experience;
        public String website;
        public String linkedin;
        public String github;
    }

    @PostMapping("/form")
    public ResponseEntity<?> saveForm(@RequestHeader(value = "Authorization", required = false) String auth,
                                      @RequestBody AccountForm form) {
        try {
            if (auth == null || !auth.startsWith("Bearer ")) {
                return ResponseEntity.status(401).build();
            }
            String token = auth.substring(7);
            Long userId = jwtProvider.getUserIdFromToken(token);
            String emailFromToken = jwtProvider.getUserEmailFromToken(token);

            // Update basic user info via user-service
            UserClient.UpdateUserRequest req = new UserClient.UpdateUserRequest();
            req.firstName = form.firstName;
            req.lastName = form.lastName;
            req.email = StringUtils.hasText(form.email) ? form.email : emailFromToken;
            req.phone = form.phone;
            userClient.updateUser(userId, req);

            // Upsert profile with extended fields
            Profile profile = repository.findById(userId).orElseGet(() -> {
                Profile p = new Profile();
                p.setUserId(userId);
                return p;
            });
            profile.setFirstName(form.firstName);
            profile.setLastName(form.lastName);
            profile.setEmail(req.email);
            profile.setPhone(form.phone);
            profile.setLocation(form.location);
            profile.setDateOfBirth(form.dateOfBirth);
            profile.setBio(form.bio);
            profile.setCurrentPosition(form.currentPosition);
            profile.setCompany(form.company);
            profile.setExperience(form.experience);
            profile.setWebsite(form.website);
            profile.setLinkedin(form.linkedin);
            profile.setGithub(form.github);
            repository.save(profile);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
