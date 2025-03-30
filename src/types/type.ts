import { UserRoleEnum } from "./enum";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: typeof UserRoleEnum[keyof typeof UserRoleEnum];
    isVerified: boolean;
    profilePicture?: string;
    uid: string;
    createdAt: Date;
    updatedAt: Date;
}