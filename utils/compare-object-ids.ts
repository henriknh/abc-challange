import mongoose, { Document, ObjectId } from 'mongoose'

export default function compareObjectIds(
  object1: mongoose.Types.ObjectId | Document<unknown, {}, any> & any & Required<{ _id: unknown; }>,
  object2: mongoose.Types.ObjectId | Document<unknown, {}, any> & any & Required<{ _id: unknown; }>
): boolean {
  return object1.equals(object2)
}
