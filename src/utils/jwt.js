import jwt from "jsonwebtoken";

const createToken = (id, email, secret) => {
  return jwt.sign({ id, email }, secret, { expiresIn: "1h" });
};

const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.log("error verifyiing token", error);
    return null;
  }
};

export { createToken, verifyToken };
