import { createAction } from "@ngrx/store";
import { UserModel } from "src/app/shared/models";

export const userLogin = createAction(
	"[User Auth] Login"
)

export const userLogout = createAction(
	"[User Auth] Logout"
)