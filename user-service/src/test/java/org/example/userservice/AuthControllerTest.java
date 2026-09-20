package org.example.userservice;

import org.example.userservice.dto.SignUpRequest;
import org.example.userservice.dto.SignInRequest;
import org.example.userservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {
        userRepository.deleteAll();
    }

    @Test
    public void testSignUp() throws Exception {
        SignUpRequest request = new SignUpRequest(
                "Jean",
                "Dupont",
                "jean@example.com",
                "password123",
                "password123"
        );

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.user.email").value("jean@example.com"));
    }

    @Test
    public void testSignIn() throws Exception {
        // D'abord créer un utilisateur
        SignUpRequest signUpRequest = new SignUpRequest(
                "Jean",
                "Dupont",
                "jean@example.com",
                "password123",
                "password123"
        );

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signUpRequest)))
                .andExpect(status().isCreated());

        // Puis le connecter
        SignInRequest signInRequest = new SignInRequest(
                "jean@example.com",
                "password123"
        );

        mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signInRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.user.email").value("jean@example.com"));
    }

    @Test
    public void testSignUpWithMismatchedPasswords() throws Exception {
        SignUpRequest request = new SignUpRequest(
                "Jean",
                "Dupont",
                "jean@example.com",
                "password123",
                "password456"
        );

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }
}

