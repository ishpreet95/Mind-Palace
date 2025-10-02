const admin = require("firebase-admin");
const db = require("../firebase/config");
require("dotenv").config();

const router = require("express").Router();

// Middleware to verify Firebase ID token
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

// Verify token and get/create user
router.route("/verify").post(verifyFirebaseToken, async (req, res) => {
  try {
    const { uid, email, name, picture, email_verified } = req.user;

    const userDoc = db.collection("users").doc(uid);
    const doc = await userDoc.get();

    if (!doc.exists) {
      const newUser = {
        email,
        name,
        picture,
        email_verified,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
      };
      await userDoc.set(newUser);
      return res.status(201).json({ uid, ...newUser });
    } else {
      return res.status(200).json({ uid, ...doc.data() });
    }
  } catch (error) {
    console.error("Error creating/fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get current user (protected route)
router.route("/user").get(verifyFirebaseToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const userDoc = db.collection("users").doc(uid);
    const doc = await userDoc.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ uid, ...doc.data() });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/health-check").get((req, res) => {
  res.sendStatus(200);
});

module.exports = router;
