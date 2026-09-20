# API d'Authentification - User Service

## Endpoints d'Authentification

### 1. Inscription (Sign Up)

**Endpoint:** `POST /api/auth/signup`

**Description:** Crée un nouveau compte utilisateur

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Réponse (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer",
  "user": {
    "id": 1,
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean@example.com",
    "createdAt": "2025-12-07T20:00:00Z"
  }
}
```

**Erreurs possibles:**
- `400 Bad Request` - Email déjà utilisé ou mots de passe non correspondants
- `400 Bad Request` - Données de validation invalides

---

### 2. Connexion (Sign In)

**Endpoint:** `POST /api/auth/signin`

**Description:** Authentifie un utilisateur existant

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "jean@example.com",
  "password": "password123"
}
```

**Réponse (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer",
  "user": {
    "id": 1,
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean@example.com",
    "createdAt": "2025-12-07T20:00:00Z"
  }
}
```

**Erreurs possibles:**
- `404 Not Found` - Utilisateur non trouvé
- `400 Bad Request` - Email ou mot de passe incorrect

---

## Utilisation du Token JWT

Une fois l'authentification réussie, utilisez le token retourné dans les requêtes ultérieures :

**Headers:**
```
Authorization: Bearer <token>
```

**Exemple:**
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9..." \
     http://localhost:8081/api/users
```

---

## Configuration JWT

Les paramètres JWT sont configurés dans `application.properties`:

```properties
jwt.secret=MySecretKeyForJWTTokenGeneration1234567890123456789012345678901234567890
jwt.expiration=86400000  # 24 heures en millisecondes
```

---

## Endpoints Utilisateur (User Management)

### Récupérer tous les utilisateurs

**Endpoint:** `GET /api/users`

**Réponse (200 OK):**
```json
[
  {
    "id": 1,
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean@example.com",
    "createdAt": "2025-12-07T20:00:00Z"
  }
]
```

---

### Récupérer un utilisateur par ID

**Endpoint:** `GET /api/users/{id}`

**Réponse (200 OK):**
```json
{
  "id": 1,
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean@example.com",
  "createdAt": "2025-12-07T20:00:00Z"
}
```

---

### Créer un nouvel utilisateur (sans authentification)

**Endpoint:** `POST /api/users`

**Body:**
```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean@example.com"
}
```

**Réponse (201 Created):**
```json
{
  "id": 1,
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean@example.com",
  "createdAt": "2025-12-07T20:00:00Z"
}
```

---

### Mettre à jour un utilisateur

**Endpoint:** `PUT /api/users/{id}`

**Body:**
```json
{
  "firstName": "Jean-Paul",
  "lastName": "Dupont"
}
```

**Réponse (200 OK):**
```json
{
  "id": 1,
  "firstName": "Jean-Paul",
  "lastName": "Dupont",
  "email": "jean@example.com",
  "createdAt": "2025-12-07T20:00:00Z"
}
```

---

### Supprimer un utilisateur

**Endpoint:** `DELETE /api/users/{id}`

**Réponse (204 No Content)**

---

## Validation des Données

### SignUp Request
- **firstName**: Non vide, requis
- **lastName**: Non vide, requis
- **email**: Email valide, requis
- **password**: Minimum 6 caractères, requis
- **confirmPassword**: Doit correspondre à password, requis

### SignIn Request
- **email**: Email valide, requis
- **password**: Non vide, requis

---

## Codes d'Erreur HTTP

| Code | Description |
|------|-------------|
| 200  | Succès |
| 201  | Ressource créée |
| 204  | Pas de contenu (suppression réussie) |
| 400  | Requête invalide |
| 404  | Ressource non trouvée |
| 500  | Erreur serveur |

---

## Exemple d'Utilisation Complète

```bash
# 1. Inscription
curl -X POST http://localhost:8081/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Réponse:
# {
#   "token": "eyJhbGciOiJIUzUxMiJ9...",
#   "tokenType": "Bearer",
#   "user": {...}
# }

# 2. Connexion
curl -X POST http://localhost:8081/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean@example.com",
    "password": "password123"
  }'

# 3. Utiliser le token pour accéder aux ressources protégées
curl -X GET http://localhost:8081/api/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9..."
```

