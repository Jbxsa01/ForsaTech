package org.example.userservice.service;

import org.example.userservice.dto.CreateUserRequest;
import org.example.userservice.dto.UpdateUserRequest;
import org.example.userservice.dto.UserDto;

import java.util.List;

public interface UserService {
    /**
     * Récupère tous les utilisateurs
     * @return liste de tous les utilisateurs
     */
    List<UserDto> findAll();

    /**
     * Récupère un utilisateur par son ID
     * @param id l'ID de l'utilisateur
     * @return le DTO de l'utilisateur
     * @throws org.example.userservice.exception.ResourceNotFoundException si l'utilisateur n'existe pas
     */
    UserDto findById(Long id);

    /**
     * Crée un nouvel utilisateur
     * @param request la requête de création contenant firstName, lastName, email
     * @return le DTO de l'utilisateur créé
     */
    UserDto create(CreateUserRequest request);

    /**
     * Met à jour un utilisateur existant
     * @param id l'ID de l'utilisateur à mettre à jour
     * @param request la requête de mise à jour
     * @return le DTO de l'utilisateur mis à jour
     * @throws org.example.userservice.exception.ResourceNotFoundException si l'utilisateur n'existe pas
     */
    UserDto update(Long id, UpdateUserRequest request);

    /**
     * Supprime un utilisateur
     * @param id l'ID de l'utilisateur à supprimer
     * @throws org.example.userservice.exception.ResourceNotFoundException si l'utilisateur n'existe pas
     */
    void delete(Long id);
}

