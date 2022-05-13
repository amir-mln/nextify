import AuthForm from "components/auth-form/index";
import { LAYOUT_TYPES } from "layouts/constants";

function Signup() {
  return <AuthForm mode="signup" />;
}

Signup.layoutType = LAYOUT_TYPES.FULL_PAGE;

export default Signup;
