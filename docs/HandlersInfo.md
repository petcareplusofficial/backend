# Handlers

## We will use the middleware pattern for all the handlers

it works by creating a basic function initially like its done below
it initializes the logoutusers function which takes (services). (services) is the parameter we will get and will contain what we need to work within this api endpoint.
but we can put as many parameters as we want. And these parameters can be passed inside the second function which is inside the first function.
we return the second function that has what the handler needs to have (req, res) to create an
api endpoint.

the purpose of having a function that returns a handler is to embed parameters that are needed for the handler to work because we know that inside the router for the requests we need to have a function that takes (req, res ) as parameters. and this returns that function.

you can ask why i cant just create a function that takes (res, req, services)
but that doesnt work because handlers only take req and res as parameters thus we need this extra function to pass the services parameter.

```js
const LogoutUser = (services) => {
  return async (req, res) => {
    const token = req.headers.authorization;
    await services.redis.del(token);
    res.json({
      message: "Logged out",
    });
  };
};
```
