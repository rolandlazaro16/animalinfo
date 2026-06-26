import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IFeedback extends Document {
  animalId: Types.ObjectId;
  animalName: string;
  category: 'Health' | 'Behavior' | 'Nutrition' | 'Habitat' | 'General';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  title: string;
  description: string;
  reporterName: string;
  reporterEmail: string;
  status: 'Open' | 'In Review' | 'Resolved' | 'Closed';
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    animalId: {
      type: Schema.Types.ObjectId,
      ref: 'Animal',
      required: [true, 'Animal reference is required'],
    },
    animalName: {
      type: String,
      required: [true, 'Animal name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Health', 'Behavior', 'Nutrition', 'Habitat', 'General'],
      required: [true, 'Category is required'],
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      required: [true, 'Severity is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title must be 200 characters or less'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    reporterName: {
      type: String,
      required: [true, 'Reporter name is required'],
      trim: true,
    },
    reporterEmail: {
      type: String,
      required: [true, 'Reporter email is required'],
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['Open', 'In Review', 'Resolved', 'Closed'],
      default: 'Open',
    },
  },
  {
    timestamps: true,
  }
);

FeedbackSchema.index({ animalId: 1 });
FeedbackSchema.index({ category: 1 });
FeedbackSchema.index({ severity: 1 });
FeedbackSchema.index({ status: 1 });
FeedbackSchema.index({ createdAt: -1 });

const Feedback: Model<IFeedback> =
  mongoose.models.Feedback ||
  mongoose.model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;
