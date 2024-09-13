const tokenService = require("../services/tokenService.js");

/**
 * Middleware to ensure the request is authenticated.
 */
const requireAuth = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ error: "Unauthorized. No token is found" });
    }

    const accessToken = authorizationHeader.split(" ")[1];

    const isValid = tokenService.validateAccessToken(accessToken);

    if (!isValid) {
      return res.status(401).json({ error: "Unauthorized. Token is invalid" });
    }

    next();
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ error: error?.message || "Internal Server Error" });
  }
};

module.exports = { requireAuth };
