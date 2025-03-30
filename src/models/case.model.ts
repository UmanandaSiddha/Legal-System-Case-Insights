import { CaseFileStatusEnum } from "@/types/enum";
import { ICaseFile } from "@/types/type";
import mongoose from "mongoose";

const CorrectionSchema = new mongoose.Schema({
    field: {
        type: String,
        required: true
    },
    original: {
        type: String
    },
    corrected: {
        type: String
    },
    correctedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    correctedAt: {
        type: Date, 
        default: Date.now
    },
});

const InsightMetaSchema = new mongoose.Schema({
    label: String,
    value: String,
}, { _id: false });

const CaseFileSchema = new mongoose.Schema<ICaseFile>(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        public: {
            type: Boolean,
            default: false
        },
        rawText: String,
        status: {
            type: String,
            enum: Object.values(CaseFileStatusEnum),
            required: true
        },
        files: [String],
        judgment: String,
        hearings: [String],
        insights: {
            summary: String,
            suspects: [String],
            witnesses: [String],
            location: String,
            dates: [String],
            incidents: [String],
            legalCodes: [String],
            status: String,
            metaData: [InsightMetaSchema],
        },
        corrections: [CorrectionSchema],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    }, {
        timestamps: true
    }
);

const CaseFile = mongoose.models.CaseFile || mongoose.model('CaseFile', CaseFileSchema);
export default CaseFile;