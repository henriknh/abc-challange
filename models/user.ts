import mongoose, { Schema } from 'mongoose'

export interface IUser extends mongoose.Document {
  name: string
  email: string
  image: string
  emailVerified: unknown
}

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
})

export const MUser: mongoose.Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
