const express = require('express')
const cors = require('cors')
const verifyKeycloakToken = require('./keycloak-verify');
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

// Middleware to verify the token before processing requests
app.use(async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      console.log("authHeader",authHeader);
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      console.log("token",token);
      const decodedToken = await verifyKeycloakToken(token);
  
      // Token verification successful, set the user identity
      req.user = decodedToken; // You can access user information in route handlers using req.user
  
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  });

app.get('/', (req, res) => {
  console.log("Headers: ", req.user.resource_access.myClient);
  const userId = req.user.sub;
  const username = req.user.name;

  // Process the request as needed
  // ...

  res.json({ userId, username });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})