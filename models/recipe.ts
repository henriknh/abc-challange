import mongoose, { Schema } from 'mongoose'
import { IUser, userSchema } from './user'

export interface IUnit extends mongoose.Document {
  value: number
  unit: string
}

export const unitSchema = new Schema<IUnit>({
  value: { type: Number, required: true },
  unit: { type: String, required: true },
})

export interface IUnitSystems extends mongoose.Document {
  metric_unit: IUnit
  imperial_unit: IUnit
}

export const unitSystemsSchema = new Schema<IUnitSystems>({
  metric_unit: unitSchema,
  imperial_unit: unitSchema,
})

export interface IIngredient extends mongoose.Document {
  name: string
  unit: IUnitSystems
}

export const ingredientSchema = new Schema<IIngredient>({
  name: { type: String, required: true },
  unit: unitSystemsSchema,
})

export interface IStep extends mongoose.Document {
  description: string
  time: number
}

export const stepSchema = new Schema<IStep>({
  description: { type: String, required: true },
  time: { type: Number, required: true },
})

export interface IRecipe extends mongoose.Document {
  context: string
  user: IUser
  title: string
  description: string
  total_cooking_time: number
  portions: number
  ingredients: IIngredient[]
  steps: IStep[]
}

const recipeSchema = new Schema<IRecipe>({
  context: { type: String, required: true },
  user: {type: mongoose.Types.ObjectId, ref: "User"},
  title: { type: String, required: true },
  description: { type: String, required: true },
  total_cooking_time: { type: Number, required: true },
  portions: { type: Number, required: true },
  ingredients: [ingredientSchema],
  steps: [stepSchema],
})

export const MRecipe: mongoose.Model<IRecipe> = mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', recipeSchema);
