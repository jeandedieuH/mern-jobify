import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }

  throw new Error("JWT_SECRET is not defined");
};

const getJwtExpiresIn = () => {
  const expiresIn = process.env.JWT_EXPIRES_IN || process.env.JWT_EXPIRE;

  if (typeof expiresIn === "string" && expiresIn.trim()) {
    return expiresIn.trim();
  }

  return "7d";
};

export const createJWT = (payload) => {
  const token = jwt.sign(payload, getJwtSecret(), {
    expiresIn: getJwtExpiresIn(),
  });
  return token;
};

export const verifyJWT = (token) => {
  return jwt.verify(token, getJwtSecret());
};
