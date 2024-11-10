import _delete from "./delete.action.js";
import signin from "./signin.action.js";
import signup from "./signup.action.js";
import update from "./update.action.js";

const authService = {
  signup,
  signin,
  update,
  delete: _delete,
};

export default authService;
