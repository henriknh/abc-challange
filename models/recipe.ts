import { IUser } from './user'
import mongoose, { Schema } from 'mongoose'

export interface IFoodAllergies extends mongoose.Document {
  peanuts: boolean
  tree_nuts: boolean
  milk: boolean
  eggs: boolean
  wheat: boolean
  shellfish: boolean
}

export const foodAllergiesSchema = new Schema<IFoodAllergies>({
  peanuts: { type: Boolean, required: true },
  tree_nuts: { type: Boolean, required: true },
  milk: { type: Boolean, required: true },
  eggs: { type: Boolean, required: true },
  wheat: { type: Boolean, required: true },
  shellfish: { type: Boolean, required: true },
})

export interface INutrientsTable extends mongoose.Document {
  calories: number
  total_fat: number
  saturated_fat: number
  cholesterol: number
  sodium: number
  total_carbohydrates: number
  dietary_fiber: number
  total_sugars: number
  protein: number
}

export const nutrientsTableSchema = new Schema<INutrientsTable>({
  calories: { type: Number, required: true },
  total_fat: { type: Number, required: true },
  saturated_fat: { type: Number, required: true },
  cholesterol: { type: Number, required: true },
  sodium: { type: Number, required: true },
  total_carbohydrates: { type: Number, required: true },
  dietary_fiber: { type: Number, required: true },
  total_sugars: { type: Number, required: true },
  protein: { type: Number, required: true },
})

export interface IFoodPreferences extends mongoose.Document {
  vegetarian: boolean
  vegan: boolean
  gluten_free: boolean
  pescatarian: boolean
}

export const foodPreferencesSchema = new Schema<IFoodPreferences>({
  vegetarian: { type: Boolean, required: true },
  vegan: { type: Boolean, required: true },
  gluten_free: { type: Boolean, required: true },
  pescatarian: { type: Boolean, required: true },
})

export interface IUnit extends mongoose.Document {
  value?: number
  maxValue?: number
  unit?: string
}

export const unitSchema = new Schema<IUnit>({
  value: { type: Number },
  maxValue: { type: Number },
  unit: { type: String },
})

export interface IUnitSystems extends mongoose.Document {
  metric_unit: IUnit
  imperial_unit: IUnit
}

export const unitSystemsSchema = new Schema<IUnitSystems>({
  metric_unit: {type: unitSchema, required: true},
  imperial_unit: {type: unitSchema, required: true},
})

export interface IIngredient extends mongoose.Document {
  name: string
  unit: IUnitSystems
}

export const ingredientSchema = new Schema<IIngredient>({
  name: { type: String, required: true },
  unit: {type: unitSystemsSchema, required: true},
})

export interface IIngredientSection extends mongoose.Document {
  title: string
  ingredients: IIngredient[]
}

export const ingredientSectionSchema = new Schema<IIngredientSection>({
  title: { type: String, required: true },
  ingredients: { type: [ingredientSchema], required: true },
})

export interface IStep extends mongoose.Document {
  description: string
  time: number
  isTimer: boolean
}

export const stepSchema = new Schema<IStep>({
  description: { type: String, required: true },
  time: { type: Number, required: true },
  isTimer: { type: Boolean, required: true },
})

export interface IRecipe extends mongoose.Document {
  context: string
  user: IUser
  title: string
  total_cooking_time: number
  portions: number
  description: string
  mealType:
    | 'breakfast'
    | 'lunch'
    | 'starter'
    | 'dinner'
    | 'desert'
    | 'snack'
    | 'drink'
  difficuly: 'easy' | 'medium' | 'hard'
  food_allergies: IFoodAllergies
  food_preferences: IFoodPreferences
  nutrients_table: INutrientsTable
  ingredient_sections: IIngredientSection[]
  steps: IStep[]
}

const recipeSchema = new Schema<IRecipe>({
  context: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  total_cooking_time: { type: Number, required: true },
  portions: { type: Number, required: true },
  food_allergies: { type: foodAllergiesSchema, required: true },
  food_preferences: { type: foodPreferencesSchema, required: true },
  nutrients_table: { type: nutrientsTableSchema, required: true },
  ingredient_sections: { type: [ingredientSectionSchema], required: true },
  steps: { type: [stepSchema], required: true },
})

recipeSchema.index({ title: 'text' })

export const MRecipe: mongoose.Model<IRecipe> =
  mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', recipeSchema)
