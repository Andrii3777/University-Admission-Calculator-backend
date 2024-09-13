const { requireAuth } = require("../../middlewares/authMiddleware");
const tokenService = require("../../services/tokenService");

jest.mock("../../services/tokenService");

describe("Auth Middleware", () => {
  // Helper function to create mock request objects with authorization headers
  const mockRequest = (accessToken) => ({
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
  });

  // Helper function to create mock response objects
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.redirect = jest.fn().mockReturnValue(res);
    res.locals = {};
    return res;
  };

  const mockNext = jest.fn();

  afterEach(() => {
    // Clear all mock calls after each test
    jest.clearAllMocks();
  });

  describe("requireAuth", () => {
    it("should respond with 401 if authorization header is missing", async () => {
      const req = mockRequest(null); // No access token
      const res = mockResponse();

      await requireAuth(req, res, mockNext);

      // Verify that a 401 status is returned if authorization header is missing
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: "Unauthorized. No token is found",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should respond with 401 if access token is invalid", async () => {
      const req = mockRequest("invalidToken");
      const res = mockResponse();
      tokenService.validateAccessToken.mockReturnValue(false);

      await requireAuth(req, res, mockNext);

      // Verify that a 401 status is returned if the access token is invalid
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: "Unauthorized. Token is invalid",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call next if access token is valid", async () => {
      const req = mockRequest("validToken");
      const res = mockResponse();
      tokenService.validateAccessToken.mockReturnValue(true);

      await requireAuth(req, res, mockNext);

      // Verify that next() is called if the access token is valid
      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it("should handle errors and respond with a 500 status", async () => {
      const req = mockRequest("validToken");
      const res = mockResponse();
      tokenService.validateAccessToken.mockImplementation(() => {
        throw new Error("Test Error");
      });

      await requireAuth(req, res, mockNext);

      // Verify that a 500 status is returned and error message is sent if an error occurs
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Test Error" });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
