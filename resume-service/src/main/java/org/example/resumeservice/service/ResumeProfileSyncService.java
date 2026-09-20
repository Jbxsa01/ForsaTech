package org.example.resumeservice.service;

import org.example.resumeservice.client.ProfileClient;
import org.example.resumeservice.client.UserClient;
import org.example.resumeservice.model.Resume;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ResumeProfileSyncService {

    private final ProfileClient profileClient;
    private final UserClient userClient;

    public ResumeProfileSyncService(ProfileClient profileClient, UserClient userClient) {
        this.profileClient = profileClient;
        this.userClient = userClient;
    }

    /**
     * Synchronise les données du CV avec le profil utilisateur
     */
    public void syncResumeToProfile(String authorization, Resume resume) {
        try {
            Map<String, Object> profileData = new HashMap<>();
            
            // Informations personnelles
            if (resume.getFirstName() != null) profileData.put("firstName", resume.getFirstName());
            if (resume.getLastName() != null) profileData.put("lastName", resume.getLastName());
            if (resume.getEmail() != null) profileData.put("email", resume.getEmail());
            if (resume.getPhone() != null) profileData.put("phone", resume.getPhone());
            if (resume.getAddress() != null) profileData.put("address", resume.getAddress());
            
            // Informations CV
            if (resume.getSummary() != null) profileData.put("summary", resume.getSummary());
            if (resume.getExperienceJson() != null) profileData.put("experienceJson", resume.getExperienceJson());
            if (resume.getEducationJson() != null) profileData.put("educationJson", resume.getEducationJson());
            if (resume.getSkills() != null) profileData.put("skills", resume.getSkills());
            if (resume.getLanguages() != null) profileData.put("languages", resume.getLanguages());

            // Appel au profile-service pour mettre à jour
            profileClient.updateProfile(authorization, profileData);
            
        } catch (Exception e) {
            // Log l'erreur mais ne fait pas échouer l'opération principale
            System.err.println("Erreur lors de la synchronisation avec le profil : " + e.getMessage());
        }
    }

    /**
     * Récupère les données du profil pour préremplir un CV
     */
    public Map<String, Object> getProfileData(String authorization) {
        try {
            return profileClient.getProfile(authorization);
        } catch (Exception e) {
            System.err.println("Erreur lors de la récupération du profil : " + e.getMessage());
            return new HashMap<>();
        }
    }

    /**
     * Récupère les informations utilisateur depuis user-service
     */
    public Map<String, Object> getUserData(String authorization) {
        try {
            return userClient.getCurrentUser(authorization);
        } catch (Exception e) {
            System.err.println("Erreur lors de la récupération de l'utilisateur : " + e.getMessage());
            return new HashMap<>();
        }
    }

    /**
     * Enrichit le CV avec les données utilisateur si nécessaire
     */
    public void enrichResumeWithUserData(String authorization, Resume resume) {
        try {
            // Si le CV n'a pas d'email, on récupère celui du user
            if (resume.getEmail() == null || resume.getEmail().isEmpty()) {
                Map<String, Object> userData = getUserData(authorization);
                if (userData.containsKey("email")) {
                    resume.setEmail((String) userData.get("email"));
                }
            }
        } catch (Exception e) {
            System.err.println("Erreur lors de l'enrichissement du CV : " + e.getMessage());
        }
    }
}
