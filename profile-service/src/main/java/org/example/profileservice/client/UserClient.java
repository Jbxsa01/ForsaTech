package org.example.profileservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service")
public interface UserClient {

    @PutMapping("/api/users/{id}")
    UserDto updateUser(@PathVariable("id") Long id, @RequestBody UpdateUserRequest request);

    class UserDto {
        public Long id;
        public String firstName;
        public String lastName;
        public String email;
        public String phone;
    }

    class UpdateUserRequest {
        public String firstName;
        public String lastName;
        public String email;
        public String phone;
    }
}
