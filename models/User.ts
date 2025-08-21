import bcrypt from 'bcryptjs';
import mongoose, {Schema, models, model} from 'mongoose';

export interface IUser {
    email: string;
    password: string;
    _id: mongoose.Types.ObjectId;
    createdAt?: Date;
    updateAt?: Date;
}

const userSchema = new Schema<IUser>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true}

}, {timestamps: true})


userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    };

    next()
})


const User = models?.User || model<IUser>('User', userSchema)

export default User;