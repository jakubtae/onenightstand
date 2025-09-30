import { categoryList } from "@/lib/categoriesList";
import mongoose, { Schema, Document } from "mongoose";

export interface MaterialContent extends Document {
  title: string; // Title of the material
  description: string; // Short description
  category: (typeof categoryList)[number]; // Type of material
  fileUrl: string; // Link to PDF / resource file
  thumbnailUrl: string; // Optional preview image/icon
  isCompleted: boolean; // Has the user finished/checked off this material
  pinned: boolean; // Optional: user pinned for quick access
}

const materialContent = new Schema<MaterialContent>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: categoryList,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  pinned: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default mongoose.models.materialContent ||
  mongoose.model("materialContent", materialContent);
