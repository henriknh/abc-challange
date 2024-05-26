import mongoose, { Schema } from 'mongoose'

export type SystemOfUnits = 'metric_system' | 'imperial_system' | 'us_imperial_system'

export interface IUser extends mongoose.Document {
  name: string
  email: string
  image: string
  emailVerified: boolean
  isDarkMode: boolean
  systemOfUnits: SystemOfUnits
  tokens: number
}

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  isDarkMode: { type: Boolean, default: false },
  systemOfUnits: { type: String, default: 'metric_system' },
  tokens: { type: Number, default: 0 },
})

export const MUser: mongoose.Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
