import { UserRoleEnum } from '@/types/enum';
import { IUser } from '@/types/type';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            default: 'googlepassword',
            select: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        uid: {
            type: String,
            required: true,
            unique: true,
        },
        profilePicture: String,
        role: {
            type: String,
            enum: Object.values(UserRoleEnum),
            default: UserRoleEnum.USER,
        },
    }, {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;