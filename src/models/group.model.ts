import { GroupRoleEnum } from '@/types/enum';
import { IGroup, IGroupMember } from '@/types/type';
import mongoose from 'mongoose';

const GroupMemberSchema = new mongoose.Schema<IGroupMember>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: Object.values(GroupRoleEnum),
            required: true
        },
    }, {
        timestamps: true
    }
);

const GroupSchema = new mongoose.Schema<IGroup>(
    {
        name: {
            type: String,
            required: true
        },
        totalMembers: {
            type: Number,
            default: 0
        },
        totalCaseFiles: {
            type: Number,
            default: 0
        },
        password: {
            type: String,
            required: true
        },
        members: [GroupMemberSchema],
        caseFiles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CaseFile'
            }
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Group = mongoose.models.Group || mongoose.model('Group', GroupSchema);
export default Group;