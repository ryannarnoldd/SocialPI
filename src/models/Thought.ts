import { Schema, Types, model, type Document } from 'mongoose';

interface Ithought extends Document {
    thoughtText: string,
    username: string,
    reactions: Schema.Types.ObjectId[]
}

interface Ireaction extends Document {
    reactionId: Schema.Types.ObjectId,
    username: string,
    reactionText: string,
}

const reactionsSchema = new Schema<Ireaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionText: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        }
    }
);

const thoughtSchema = new Schema<Ithought>(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        reactions: [
            reactionsSchema
        ]
    },
        { 
            toJSON: { getters: true }, 
            toObject: { getters: true },
});

thoughtSchema.virtual('reactionCount').get(function (this: Ithought) {
    return this.reactions?.length;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;