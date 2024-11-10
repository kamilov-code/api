import comparePassword from "./compare.action.js";
import encodePassword from "./encode.action.js";

const passwordService = {
  encode: encodePassword,
  compare: comparePassword,
};

export default passwordService;
