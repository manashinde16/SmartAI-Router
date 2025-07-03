import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests / minute
  keyGenerator: (req) => {
    // If Clerk is present, use user‑id, else fall back to IP
    return req.headers["x-clerk-user-id"] || req.ip;
  },
  standardHeaders: true,
  legacyHeaders: false,
});
