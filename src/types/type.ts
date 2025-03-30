import mongoose from "mongoose";
import { CaseFileStatusEnum, GroupRoleEnum, UserRoleEnum } from "./enum";

export interface IUser {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: typeof UserRoleEnum[keyof typeof UserRoleEnum];
    isVerified: boolean;
    profilePicture?: string;
    uid: string;
    caseFiles: mongoose.Schema.Types.ObjectId[];
    groups: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IChat {
    _id: mongoose.Schema.Types.ObjectId;
    author: mongoose.Schema.Types.ObjectId;
    message: string;
    response: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGroup {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    totalMembers: number;
    totalCaseFiles: number;
    password: string;
    members: IGroupMember[];
    caseFiles: mongoose.Schema.Types.ObjectId[];
    createdBy: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGroupMember {
    _id: string;
    user: mongoose.Schema.Types.ObjectId;
    role: typeof GroupRoleEnum[keyof typeof GroupRoleEnum];
    createdAt: Date;
    updatedAt: Date;
}

export interface ICaseFile {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    description?: string;
    public: boolean;
    rawText?: string;
    status: typeof CaseFileStatusEnum[keyof typeof CaseFileStatusEnum];
    files: string[];
    judgment?: string;
    hearings?: string[];
    insights: {
        summary?: string;
        suspects?: string[];
        witnesses?: string[];
        location?: string;
        dates?: string[];
        incidents?: string[];
        legalCodes?: string[];
        status?: string;
        metaData?: [
            {
                label: string;
                value: string;
            }
        ]
    };
    corrections: [
        {
            field?: string;
            original?: string;
            corrected?: string;
            correctedBy: mongoose.Schema.Types.ObjectId;
            correctedAt: Date;
        }
    ];
    createdBy: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}