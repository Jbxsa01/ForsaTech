package org.example.resumeservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@FeignClient(name = "profile-service")
public interface ProfileClient {
    
    @PutMapping("/api/profile")
    Map<String, Object> updateProfile(
        @RequestHeader("Authorization") String authorization,
        @RequestBody Map<String, Object> profileData
    );

    @GetMapping("/api/profile")
    Map<String, Object> getProfile(@RequestHeader("Authorization") String authorization);
}
