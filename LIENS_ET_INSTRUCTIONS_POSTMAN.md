# 🔗 LIENS ET INSTRUCTIONS - TESTER SUR POSTMAN

## 📍 CHEMINS DES FICHIERS

Tous les fichiers se trouvent dans :
```
C:\Users\Bjane\IdeaProjects\ForsaTech\
```

### Fichiers à utiliser pour Postman :

1. **Collection Postman** (À importer en priorité)
   ```
   C:\Users\Bjane\IdeaProjects\ForsaTech\user-service\ForsaTech_Auth_API.postman_collection.json
   ```

2. **Environnement Postman** (Optionnel)
   ```
   C:\Users\Bjane\IdeaProjects\ForsaTech\user-service\ForsaTech_Environment.postman_environment.json
   ```

3. **Guide Complet**
   ```
   C:\Users\Bjane\IdeaProjects\ForsaTech\POSTMAN_TEST_GUIDE_FR.md
   ```

4. **Exemples JSON**
   ```
   C:\Users\Bjane\IdeaProjects\ForsaTech\POSTMAN_JSON_EXAMPLES_FR.md
   ```

---

## 🚀 ÉTAPES POUR COMMENCER

### ✅ Étape 1: Télécharger Postman
- Aller sur : https://www.postman.com/downloads/
- Télécharger et installer

### ✅ Étape 2: Importer la collection
1. Ouvrir **Postman**
2. Cliquer sur **File** (en haut à gauche)
3. Sélectionner **Import**
4. Cliquer sur **Upload Files**
5. Sélectionner : `ForsaTech_Auth_API.postman_collection.json`
6. Cliquer sur **Import**

### ✅ Étape 3: Vérifier la configuration
1. En haut à droite, sélectionner l'environnement
2. Vérifier que `base_url` = `http://localhost:8081`
3. ✅ Prêt !

---

## 📱 UTILISATION RAPIDE

### Test 1: INSCRIPTION
```
URL: http://localhost:8081/api/auth/signup
Méthode: POST

Body (JSON):
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean.dupont@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

Résultat attendu: 201 Created ✅
```

### Test 2: CONNEXION
```
URL: http://localhost:8081/api/auth/signin
Méthode: POST

Body (JSON):
{
  "email": "jean.dupont@example.com",
  "password": "password123"
}

Résultat attendu: 200 OK + Token ✅
```

### Test 3: ACCÉDER AUX UTILISATEURS
```
URL: http://localhost:8081/api/users
Méthode: GET

Headers:
Authorization: Bearer {{auth_token}}

Résultat attendu: 200 OK + Liste des utilisateurs ✅
```

---

## 🔑 INFORMATIONS D'IDENTIFICATION

### Service
- **Adresse**: http://localhost:8081
- **Port**: 8081
- **Status**: ✅ En cours d'exécution

### Endpoints Disponibles
- `POST /api/auth/signup` - Inscription
- `POST /api/auth/signin` - Connexion
- `GET /api/users` - Tous les utilisateurs
- `GET /api/users/{id}` - Un utilisateur
- `POST /api/users` - Créer utilisateur
- `PUT /api/users/{id}` - Mettre à jour
- `DELETE /api/users/{id}` - Supprimer

---

## 🧪 SCÉNARIO DE TEST COMPLET

### Étape 1: Ouvrir Postman
- Lancer Postman

### Étape 2: Accéder à la collection importée
- Cliquer sur **Collections** (à gauche)
- Chercher **ForsaTech - Authentication & Users API**
- Cliquer dessus

### Étape 3: Tester Sign Up
- Cliquer sur **Authentication**
- Cliquer sur **Sign Up - Créer un compte**
- Dans le **Body**, copier un exemple de `POSTMAN_JSON_EXAMPLES_FR.md`
- Cliquer sur **SEND**
- ✅ Vérifier Status 201

### Étape 4: Tester Sign In
- Cliquer sur **Sign In - Se connecter**
- Dans le **Body**, utiliser le même email/password
- Cliquer sur **SEND**
- ✅ Vérifier Status 200 et token reçu

### Étape 5: Tester Get All Users
- Cliquer sur **Users Management**
- Cliquer sur **Get All Users**
- Cliquer sur **SEND**
- ✅ Vérifier Status 200 et liste d'utilisateurs

---

## 📋 CHECKLIST

- [ ] Postman installé
- [ ] Collection importée
- [ ] Service lancé sur port 8081
- [ ] Test Sign Up réussi (201) ✅
- [ ] Test Sign In réussi (200) ✅
- [ ] Token reçu et sauvegardé ✅
- [ ] Test Get Users réussi (200) ✅

---

## ⚠️ AVANT DE COMMENCER

**Vérifier que le service est lancé:**
```
Le service doit tourner sur: http://localhost:8081
```

**Si le service n'est pas lancé:**
```
1. Ouvrir un terminal
2. Aller dans: C:\Users\Bjane\IdeaProjects\ForsaTech\user-service
3. Lancer: java -jar target\user-service-0.0.1-SNAPSHOT.jar
4. Attendre le message "Started UserServiceApplication"
```

---

## 💡 ASTUCES POSTMAN

### 🔄 Sauvegarde Automatique du Token
- Quand vous faites Sign In, le token est **automatiquement sauvegardé**
- Vous n'avez rien à faire manuellement
- Le token est utilisé dans les requêtes suivantes avec `{{auth_token}}`

### 📝 Ajouter des requêtes personnalisées
1. Cliquer sur **+** à côté des onglets
2. Entrer l'URL: `http://localhost:8081/api/...`
3. Sélectionner la méthode (GET, POST, etc)
4. Ajouter les headers si nécessaire
5. Ajouter le body (JSON)

### 💾 Sauvegarder les requêtes
- Postman sauvegarde automatiquement
- Vous pouvez aussi cliquer sur **Save** en haut à droite

---

## 🆘 PROBLÈMES COURANTS

| Problème | Solution |
|----------|----------|
| "Cannot connect to localhost:8081" | Démarrer le service sur le port 8081 |
| "401 Unauthorized" | Faire une connexion d'abord pour obtenir le token |
| "Email already exists" | Utiliser un email différent chaque fois |
| Collection introuvable | Vérifier qu'elle est bien importée dans Collections |
| Token vide | Faire un Sign In pour l'obtenir |

---

## 📚 DOCUMENTS DE RÉFÉRENCE

Consultez ces fichiers pour plus de détails:

1. **POSTMAN_TEST_GUIDE_FR.md**
   - Guide complet avec explications
   - Tous les endpoints détaillés
   - Dépannage avancé

2. **POSTMAN_JSON_EXAMPLES_FR.md**
   - Exemples prêts à copier-coller
   - Réponses attendues
   - Astuces de test

3. **AUTH_API.md** (dans user-service)
   - Documentation technique complète
   - Format des réponses
   - Codes d'erreur

---

## 🎯 OBJECTIF FINAL

✅ Inscrire un nouvel utilisateur
✅ Vous connecter avec cet utilisateur
✅ Récupérer les données de votre profil
✅ Tester les autres endpoints

**Une fois tout réussi = API opérationnelle ! 🚀**

---

## 📞 SUPPORT

Si vous avez des questions :
1. Consulter les fichiers README et guides
2. Vérifier que le service est lancé
3. Vérifier les credentials (email/password)
4. Vérifier le format JSON

---

## ✨ PROCHAINES ÉTAPES

Une fois les tests Postman réussis:
- Intégrer l'API dans votre frontend
- Utiliser les tokens pour sécuriser les requêtes
- Implémenter le logout
- Ajouter la gestion des erreurs côté client

**Bonne chance avec vos tests ! 🎉**

