type UserRoleType = "ADMIN" | "USER";

interface IUser {
	email: string | null;
	role: UserRoleType;
	id: string;
	username: string;
	displayName: string;
	phoneNumber: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

interface IUserRes {
	message: string;
	user: IUser | null;
}

export type { UserRoleType, IUser, IUserRes };
