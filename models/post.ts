import mongoose, { Schema } from 'mongoose'

export interface IPost extends mongoose.Document {
  letter: string
  date: Date
  claire?: string
  henrik?: string
}

export const postSchema = new Schema<IPost>({
  letter: { type: String, required: true },
  date: { type: Date, required: true },
  claire: { type: String },
  henrik: { type: String },
})

export const MPost: mongoose.Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);
