const tokenService = require("../services/tokenService.js");
const authService = require("../services/authService.js");

class AuthController {
  async signup(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.signup(email, password);

      if (result.error) {
        return res.status(400).json(result);
      }

      setRefreshTokenCookie(res, result.refreshToken);

      return res.status(201).json({
        message: "Student signed up successfully",
        accessToken: result.accessToken,
      });
    } catch (error) {
      res.status(error?.status || 500).send({ error: error?.message || error });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      if (result.error) {
        return res.status(401).json(result);
      }

      setRefreshTokenCookie(res, result.refreshToken);

      return res.status(200).json({
        message: "Student logged in successfully",
        accessToken: result.accessToken,
      });
    } catch (error) {
      res.status(error?.status || 500).send({ error: error?.message || error });
    }
  }

  async logout(req, res) {
    try {
      await authService.logout(req.cookies.refreshToken);

      res.clearCookie("refreshToken");

      return res.status(200).json({
        message: "Student logged out successfully",
      });
    } catch (error) {
      res.status(error?.status || 500).send({ error: error?.message || error });
    }
  }

  /**
   * Refreshes tokens using the provided refresh token in cookies.
   */
  async refresh(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;

      // If no refresh token is found, redirect to the login page.
      if (!refreshToken) {
        return res.status(401).json({ error: "No refresh token provided" });
      }

      const result = await tokenService.refresh(refreshToken);
      if (result.error) {
        return res.status(401).json(result);
      }

      setRefreshTokenCookie(res, result.tokens.refreshToken);

      return res.status(200).json({
        message: "Tokens refreshed successfully",
        accessToken: result.tokens.accessToken,
        studentId: result.studentId,
      });
    } catch (error) {
      res.status(error?.status || 500).send({ error: error?.message || error });
    }
  }
}

/**
 * Sets  refresh token as HTTP-only cookies.
 * @param {object} res - The HTTP response object.
 * @param {string} refreshToken - The refresh token to set as a cookie.
 * @returns {void}
 */
function setRefreshTokenCookie(res, refreshToken) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // Cookie is not accessible via JavaScript.
    maxAge: process.env.REFRESH_TOKEN_AGE_SECONDS * 1000, // Cookie expiry time in milliseconds.
  });
}

module.exports = new AuthController();
