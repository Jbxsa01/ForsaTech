package org.example.profileservice.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.profileservice.model.Resume;
import org.example.profileservice.repository.ResumeRepository;
import org.example.profileservice.security.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeRepository repository;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    public ResumeController(ResumeRepository repository, JwtProvider jwtProvider, ObjectMapper objectMapper) {
        this.repository = repository;
        this.jwtProvider = jwtProvider;
        this.objectMapper = objectMapper;
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

    public static class ResumeFormRequest {
        public String firstName;
        public String lastName;
        public String email;
        public String phone;
        public String address;
        public String summary;
        public List<ExperienceItem> experience;
        public List<EducationItem> education;
        public String skills;
        public String languages;

        public static class ExperienceItem {
            public String company;
            public String position;
            public String duration;
            public String description;
        }

        public static class EducationItem {
            public String school;
            public String degree;
            public String duration;
            public String description;
        }
    }

    @PostMapping
    public ResponseEntity<?> createResumeFromForm(@RequestHeader(value = "Authorization", required = false) String auth,
                                                   @RequestBody ResumeFormRequest request) {
        try {
            Long userId = requireUserId(auth);
            Resume resume = new Resume();
            resume.setUserId(userId);
            resume.setFirstName(request.firstName);
            resume.setLastName(request.lastName);
            resume.setEmail(request.email);
            resume.setPhone(request.phone);
            resume.setAddress(request.address);
            resume.setSummary(request.summary);
            resume.setSkills(request.skills);
            resume.setLanguages(request.languages);

            // Convert arrays to JSON strings
            if (request.experience != null) {
                resume.setExperienceJson(objectMapper.writeValueAsString(request.experience));
            }
            if (request.education != null) {
                resume.setEducationJson(objectMapper.writeValueAsString(request.education));
            }

            Resume saved = repository.save(resume);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadResume(@RequestHeader(value = "Authorization", required = false) String auth,
                                          @RequestParam("resume") MultipartFile file) {
        try {
            Long userId = requireUserId(auth);
            Resume resume = new Resume();
            resume.setUserId(userId);
            resume.setFileName(file.getOriginalFilename());
            resume.setFileType(file.getContentType());

            try {
                String base64 = Base64.getEncoder().encodeToString(file.getBytes());
                resume.setFileData(base64);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Invalid file"));
            }

            Resume saved = repository.save(resume);
            return ResponseEntity.ok(Map.of("id", saved.getId(), "fileName", saved.getFileName()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getResumes(@RequestHeader(value = "Authorization", required = false) String auth) {
        try {
            Long userId = requireUserId(auth);
            List<Resume> resumes = repository.findByUserId(userId);
            return ResponseEntity.ok(resumes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/latest")
    public ResponseEntity<?> getLatestResume(@RequestHeader(value = "Authorization", required = false) String auth) {
        try {
            Long userId = requireUserId(auth);
            return repository.findFirstByUserIdOrderByIdDesc(userId)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }
}
