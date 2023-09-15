import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    username: string;
    created: true | false;
}

const UserSchema = new Schema<User>({
    username: { type: String, required: true, unique: true },
})

export default mongoose.models.User || mongoose.model<User>('User', UserSchema)