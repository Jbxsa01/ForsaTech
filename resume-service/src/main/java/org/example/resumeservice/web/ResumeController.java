package org.example.resumeservice.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.resumeservice.model.Resume;
import org.example.resumeservice.repository.ResumeRepository;
import org.example.resumeservice.security.JwtProvider;
import org.example.resumeservice.service.ResumeProfileSyncService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeRepository repository;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;
    private final ResumeProfileSyncService syncService;

    public ResumeController(ResumeRepository repository, JwtProvider jwtProvider, 
                           ObjectMapper objectMapper, ResumeProfileSyncService syncService) {
        this.repository = repository;
        this.jwtProvider = jwtProvider;
        this.objectMapper = objectMapper;
        this.syncService = syncService;
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

            try {
                resume.setExperienceJson(objectMapper.writeValueAsString(request.experience));
                resume.setEducationJson(objectMapper.writeValueAsString(request.education));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON data");
            }

            Resume saved = repository.save(resume);
            syncService.syncResumeToProfile(auth, saved);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
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
                resume.setFileData(Base64.getEncoder().encodeToString(file.getBytes()));
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to read file");
            }

            Resume saved = repository.save(resume);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getUserResumes(@RequestHeader(value = "Authorization", required = false) String auth) {
        try {
            Long userId = requireUserId(auth);
            List<Resume> resumes = repository.findByUserId(userId);
            return ResponseEntity.ok(resumes);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/latest")
    public ResponseEntity<?> getLatestResume(@RequestHeader(value = "Authorization", required = false) String auth) {
        try {
            Long userId = requireUserId(auth);
            Optional<Resume> resume = repository.findFirstByUserIdOrderByIdDesc(userId);
            if (resume.isPresent()) {
                return ResponseEntity.ok(resume.get());
            }
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getResume(@RequestHeader(value = "Authorization", required = false) String auth,
                                      @PathVariable Long id) {
        try {
            Long userId = requireUserId(auth);
            Optional<Resume> resume = repository.findById(id);
            if (resume.isPresent() && resume.get().getUserId().equals(userId)) {
                return ResponseEntity.ok(resume.get());
            }
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateResume(@RequestHeader(value = "Authorization", required = false) String auth,
                                         @PathVariable Long id,
                                         @RequestBody ResumeFormRequest request) {
        try {
            Long userId = requireUserId(auth);
            Optional<Resume> existing = repository.findById(id);
            
            if (existing.isEmpty() || !existing.get().getUserId().equals(userId)) {
                return ResponseEntity.notFound().build();
            }

            Resume resume = existing.get();
            resume.setFirstName(request.firstName);
            resume.setLastName(request.lastName);
            resume.setEmail(request.email);
            resume.setPhone(request.phone);
            resume.setAddress(request.address);
            resume.setSummary(request.summary);
            resume.setSkills(request.skills);
            resume.setLanguages(request.languages);

            try {
                resume.setExperienceJson(objectMapper.writeValueAsString(request.experience));
                resume.setEducationJson(objectMapper.writeValueAsString(request.education));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON data");
            }

            Resume saved = repository.save(resume);
            syncService.syncResumeToProfile(auth, saved);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResume(@RequestHeader(value = "Authorization", required = false) String auth,
                                         @PathVariable Long id) {
        try {
            Long userId = requireUserId(auth);
            Optional<Resume> resume = repository.findById(id);
            
            if (resume.isEmpty() || !resume.get().getUserId().equals(userId)) {
                return ResponseEntity.notFound().build();
            }

            repository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/profile-data")
    public ResponseEntity<?> getProfileData(@RequestHeader(value = "Authorization", required = false) String auth) {
        try {
            requireUserId(auth);
            Map<String, Object> profileData = syncService.getProfileData(auth);
            return ResponseEntity.ok(profileData);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
