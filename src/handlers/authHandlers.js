import { User } from "../internal/db/user.js";
import { createToken } from "../utils/jwt.js";

/*Function Name: RegisterUser
Parameters:
Function description: Creates a new user in the database
Return value:
*/
const RegisterUser = () => {
  return async (req, res) => {
    let profileImage = null;
    if (req.file) {
      profileImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const { email, password, name, location } = req.body;
    console.log(req.body);
    const user = new User(email, password, name, location, profileImage);
    await user.save();
    res.status(201).json({ message: `user created` });
  };
};

/*Function Name: LoginUser
Parameters: services
Function description: validates user and returns token
Return value: returns message and token in json object
*/
const LoginUser = (services) => {
  return async (req, res) => {
    const { email, password } = req.body;
    const user = new User(email, password, "", "");
    // console.log(user);
    const loggedUser = await user.login();
    // console.log(loggedUser);
    const token = createToken(
      loggedUser._id.toString(),
      loggedUser.email,
      services.credentials.secret,
    );
    await services.redis.set(
      token,
      JSON.stringify({
        id: loggedUser._id.toString(),
        email: loggedUser.email,
      }),
      { EX: 60 * 60 * 24 },
    );
    // the 60 * 60 * 24 i have used means
    // 60 seconds * 60 minutes * 24 hours it means it lastss a day
    // EX automatically deletes the token after the day is over
    res.json({
      message: "Logged in",
      token: token,
    });
  };
};

/*Function Name: LogoutUser
Parameters: services
Function description: logs out the user by deleting the token from Redis
Return value:
*/
const LogoutUser = (services) => {
  return async (req, res) => {
    const token = req.headers.authorization;
    await services.redis.del(token);
    res.json({
      message: "Logged out",
    });
  };
};

export { RegisterUser, LoginUser, LogoutUser };
