package org.example.userservice.service.impl;

import org.example.userservice.dto.SignInRequest;
import org.example.userservice.dto.SignUpRequest;
import org.example.userservice.dto.AuthResponse;
import org.example.userservice.dto.UserDto;
import org.example.userservice.exception.ResourceNotFoundException;
import org.example.userservice.model.User;
import org.example.userservice.repository.UserRepository;
import org.example.userservice.security.JwtProvider;
import org.example.userservice.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public AuthResponse signUp(SignUpRequest request) {
        // Vérifier si l'utilisateur existe déjà
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Un utilisateur avec cet email existe déjà");
        }

        // Vérifier que les mots de passe correspondent
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Les mots de passe ne correspondent pas");
        }

        // Créer le nouvel utilisateur
        User user = new User(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword())
        );

        User savedUser = userRepository.save(user);

        // Générer le token JWT
        String token = jwtProvider.generateToken(savedUser.getId(), savedUser.getEmail());

        // Créer la réponse
        UserDto userDto = new UserDto(
                savedUser.getId(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getEmail(),
                savedUser.getCreatedAt()
        );

        return new AuthResponse(token, "Bearer", userDto);
    }

    @Override
    public AuthResponse signIn(SignInRequest request) {
        // Chercher l'utilisateur par email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec l'email: " + request.getEmail()));

        // Vérifier le mot de passe
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Email ou mot de passe incorrect");
        }

        // Générer le token JWT
        String token = jwtProvider.generateToken(user.getId(), user.getEmail());

        // Créer la réponse
        UserDto userDto = new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getCreatedAt()
        );

        return new AuthResponse(token, "Bearer", userDto);
    }
}

