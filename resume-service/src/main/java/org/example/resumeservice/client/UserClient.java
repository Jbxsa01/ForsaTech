package org.example.resumeservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@FeignClient(name = "user-service")
public interface UserClient {
    
    @GetMapping("/api/users/{id}")
    Map<String, Object> getUserById(
        @RequestHeader("Authorization") String authorization,
        @PathVariable("id") Long id
    );
    
    @GetMapping("/api/users/me")
    Map<String, Object> getCurrentUser(@RequestHeader("Authorization") String authorization);
}
