import { Patient } from '../../models/patient';
import * as tf from '@tensorflow/tfjs';

class MedicalModel {
    private model: tf.LayersModel;

    constructor() {
        this.model = this.createModel();
    }

    private createModel(): tf.LayersModel {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [this.getInputShape()] }));
        model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
        model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
        return model;
    }

    private getInputShape(): number {
        // Define the input shape based on the patient data structure
        return 10; // Example: number of features in patient data
    }

    public async trainModel(data: Patient[], labels: number[]): Promise<void> {
        const xs = tf.tensor2d(data.map(d => this.extractFeatures(d)));
        const ys = tf.tensor2d(labels, [labels.length, 1]);
        await this.model.fit(xs, ys, { epochs: 100 });
    }

    private extractFeatures(patient: Patient): number[] {
        // Extract features from patient data for model input
        return [
            patient.age,
            ...patient.symptoms.map(symptom => this.symptomToFeature(sym)),
            // Add more features as needed
        ];
    }

    private symptomToFeature(symptom: string): number {
        // Convert symptom to a numerical feature
        return symptom.length; // Example: using length of symptom string as a feature
    }

    public async predict(patient: Patient): Promise<number> {
        const input = tf.tensor2d([this.extractFeatures(patient)]);
        const prediction = this.model.predict(input) as tf.Tensor;
        return prediction.dataSync()[0];
    }
}

export default new MedicalModel();