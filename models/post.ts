import mongoose, { Schema } from 'mongoose'

export interface IPost extends mongoose.Document {
  letter: string
  claireWord?: string
  claireText?: string
  henrikWord?: string
  henrikText?: string
}

export const postSchema = new Schema<IPost>({
  letter: { type: String, required: true },
  claireWord: { type: String },
  claireText: { type: String },
  henrikWord: { type: String },
  henrikText: { type: String },
})

export const MPost: mongoose.Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);
