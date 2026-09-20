package org.example.profileservice.web;

import org.example.profileservice.model.Profile;
import org.example.profileservice.repository.ProfileRepository;
import org.example.profileservice.security.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileRepository repository;
    private final JwtProvider jwtProvider;

    public ProfileController(ProfileRepository repository, JwtProvider jwtProvider) {
        this.repository = repository;
        this.jwtProvider = jwtProvider;
    }

    private Long requireUserId(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Missing token");
        }
        String token = authorization.substring(7);
        Long userId = jwtProvider.getUserIdFromToken(token);
        if (userId == null) throw new IllegalArgumentException("Invalid token");
        return userId;
    }

    @GetMapping
    public ResponseEntity<Profile> getProfile(@RequestHeader(value = "Authorization", required = false) String auth) {
        try {
            Long userId = requireUserId(auth);
            Optional<Profile> p = repository.findById(userId);
            return ResponseEntity.ok(p.orElseGet(() -> {
                Profile empty = new Profile();
                empty.setUserId(userId);
                return empty;
            }));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping
    public ResponseEntity<Profile> upsertProfile(@RequestHeader(value = "Authorization", required = false) String auth,
                                                 @RequestBody Profile payload) {
        try {
            Long userId = requireUserId(auth);
            payload.setUserId(userId);
            if (!StringUtils.hasText(payload.getEmail())) {
                // derive email from token if needed
                String token = auth.substring(7);
                try { payload.setEmail(jwtProvider.getUserEmailFromToken(token)); } catch (Exception ignored) {}
            }
            Profile saved = repository.save(payload);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage(@RequestHeader(value = "Authorization", required = false) String auth,
                                         @RequestParam("profileImage") MultipartFile file) {
        try {
            Long userId = requireUserId(auth);
            Profile profile = repository.findById(userId).orElseGet(() -> {
                Profile p = new Profile();
                p.setUserId(userId);
                return p;
            });
            String contentType = file.getContentType();
            if (contentType == null) contentType = "image/png";
            String base64;
            try {
                base64 = Base64.getEncoder().encodeToString(file.getBytes());
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid image");
            }
            String dataUrl = "data:" + contentType + ";base64," + base64;
            profile.setProfileImage(dataUrl);
            repository.save(profile);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
