import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnimal extends Document {
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: 'Male' | 'Female' | 'Unknown';
  location: string;
  imageUrl: string;
  status: 'Healthy' | 'Needs Attention' | 'Critical';
  createdAt: Date;
  updatedAt: Date;
}

const AnimalSchema = new Schema<IAnimal>(
  {
    name: {
      type: String,
      required: [true, 'Animal name is required'],
      trim: true,
    },
    species: {
      type: String,
      required: [true, 'Species is required'],
      trim: true,
    },
    breed: {
      type: String,
      default: '',
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: 0,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Unknown'],
      default: 'Unknown',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Healthy', 'Needs Attention', 'Critical'],
      default: 'Healthy',
    },
  },
  {
    timestamps: true,
  }
);

const Animal: Model<IAnimal> =
  mongoose.models.Animal || mongoose.model<IAnimal>('Animal', AnimalSchema);

export default Animal;
