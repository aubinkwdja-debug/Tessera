# Security Specification for Tessera Digital

## Data Invariants
1. **User Identity Isolation**: Every piece of data (settings, favorites) is strictly partitioned by the `userId`. Access is only granted if `request.auth.uid == userId`.
2. **Temporal Integrity**: All timestamp fields (`updatedAt`, `addedAt`) must be strictly validated against `request.time`.
3. **Schema Compliance**: All documents must match the types and required fields defined in the `UserProfile` and `Favorite` entities.

## The Dirty Dozen (Denied Payloads)

| Payload Description | Target Path | Reason for Denial |
|---------------------|-------------|-------------------|
| Create profile with fake auth | `/users/attacker` | `auth.uid` mismatch |
| Read victim's favorites | `/users/victim/favorites/123` | Security rules block cross-user reads |
| Update `isDarkMode` as unsigned user | `/users/me` | `isSignedIn()` check fails |
| Favorite with 1MB string as ID | `/users/me/favorites/long-junk-id...` | `isValidId()` limits ID size |
| Profile update with shadow field `isVerified: true` | `/users/me` | `affectedKeys().hasOnly()` blocks ghost fields |
| Create favorite with client-side timestamp | `/users/me/favorites/fav1` | `addedAt` must match `request.time` |
| Self-assigning `role: admin` | `/users/me` | Admin roles are not allowed/validated |
| Deleting victim's settings | `/users/victim` | `auth.uid` mismatch |
| Mass listing all users | `/users/` | `allow list` requires specific `userId` logic |
| Favorite missing `prayerId` | `/users/me/favorites/fav1` | Schema validation fails |
| Profile update with junk `language: 'invalid'` | `/users/me` | Enum validation in rule |
| Bypassing `addedAt` on update | `/users/me/favorites/fav1` | `addedAt` must be immutable |

## Test Runner (Logic)
The `firestore.rules.test.ts` (conceptual) will verify that `request.auth.uid` must match the `{userId}` path parameter for all operations.
