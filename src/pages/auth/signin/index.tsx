import AuthForm from "components/auth-form/index";
import { LAYOUT_TYPES } from "layouts/constants";

function Signin() {
  return <AuthForm mode="signin" />;
}

Signin.layoutType = LAYOUT_TYPES.FULL_PAGE;

export default Signin;
