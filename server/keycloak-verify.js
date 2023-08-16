// keycloak-verify.js
const jwt = require('jsonwebtoken');

// Define the Keycloak public key (provided by Keycloak server)
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/+jwB4IVLx9+WJBKtjsw4d4XDK7WcbgGMVuu5MKFO1r2Wsr2huzl0oI17CP3ITCKETWKmWLVh+EykvhVgXgac3vpDqO6iy9olmbI/ptHZ+iuwt7VTKzvWGxlQ6XKLEaGVi4qs0PdrYjjLd2dP83KDb0gF9A9zjqyeK8konbcEqaYr0pbQwcm3iHe9Ry9Rla7CBjueL4SdOVrrx9R7xK3RjaE7ElvQxFnfFZlBrCR6V11RwdacI6wUaTSvPbrewVLudjBPuJBmvS4bjIaBBqn28dYIF/Cqy6NZxP3k620REz16czEyy+jqUS7rq6guuRX/AJgwy0iEWkcisoJPuriwIDAQAB
-----END PUBLIC KEY-----`;

// Function to verify the Keycloak token
function verifyKeycloakToken(token) {
  return new Promise((resolve, reject) => {
    console.log("Verifying Keycloak token");
    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
    console.log("Verifying Keycloak token1");

      if (err) {
    console.log("Verifying Keycloak token2");

        // Token verification failed
        reject(err);
      } else {
        // Token verification successful
        resolve(decoded);
      }
    });
  });
}

module.exports = verifyKeycloakToken;
