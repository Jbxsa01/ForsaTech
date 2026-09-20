package org.example.userservice.service;

import org.example.userservice.dto.SignInRequest;
import org.example.userservice.dto.SignUpRequest;
import org.example.userservice.dto.AuthResponse;

public interface AuthService {
    AuthResponse signUp(SignUpRequest request);
    AuthResponse signIn(SignInRequest request);
}

