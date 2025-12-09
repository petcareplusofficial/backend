const AuthMiddleware = (services) => {
  return async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized api call, no api key present",
      });
    }
    // console.log(token);
    // console.log(await services.redis.keys("*"));
    let loggedUser = await services.redis.get(token);
    if (!loggedUser) {
      return res.status(401).json({
        message:
          "Unauthorized api call, token doesnt exist or user has logged out",
      });
    }
    // console.log("middleware", loggedUser);
    req.user = JSON.parse(loggedUser);
    req.user.token = token;
    next();
  };
};
export { AuthMiddleware };
