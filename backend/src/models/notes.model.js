import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, //It is a practice to remove extra spaces
    },
    content: {
        type: String, // stores rich text (HTML or stringified JSON)
        required: true,
    },
    createdBy: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        socialLink: {
            type: String,
            validate: {
                validator: (v) => /^https?:\/\/.+/.test(v),
                message: (props) => `${props.value} is not a valid URL!`,
            },
        },
    },
    likes: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true, // adds createdAt & updatedAt
});

// Index for searching notes quickly
noteSchema.index({ title: "text", "createdBy.name": 1 });

const Note = mongoose.model("Note", noteSchema);
export default Note;
