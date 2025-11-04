import { Schema, model, Document } from 'mongoose';

interface IPatient extends Document {
    name: string;
    age: number;
    symptoms: string[];
    medicalHistory: string[];
}

const patientSchema = new Schema<IPatient>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    symptoms: { type: [String], required: true },
    medicalHistory: { type: [String], required: false }
});

const Patient = model<IPatient>('Patient', patientSchema);

export { Patient, IPatient };