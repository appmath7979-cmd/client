import type { AuthSignInType, AuthSignUpType } from "#/types/auth.type";

const authValueDefaultConstant = {
	signInDefaultValue: {
		username: "",
		password: "",
	} as AuthSignInType,
	signUpDefaultValue: {
		username: "",
		password: "",
		displayName: "",
		email: "",
		confirmPassword: "",
	} as AuthSignUpType,
};

export { authValueDefaultConstant };
