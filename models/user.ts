import mongoose, { Schema } from 'mongoose'

export interface IUser extends mongoose.Document {
  name: string
  email: string
  image: string
  emailVerified: boolean
  isMetric: boolean
  tokens: number
}

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  isMetric: { type: Boolean, default: true },
  tokens: { type: Number, default: 0 },
})

export const MUser: mongoose.Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
