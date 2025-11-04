import { Diagnosis } from '../types';
import { getDiagnosis } from './diagnosisService';

export const recommendLabTests = (symptoms: string[]): string[] => {
    const diagnosis: Diagnosis | null = getDiagnosis(symptoms);
    
    if (!diagnosis) {
        return ['No specific lab tests recommended. Please consult a healthcare professional.'];
    }

    const labTests: string[] = [];

    switch (diagnosis.name) {
        case 'Diabetes':
            labTests.push('Fasting Blood Sugar Test', 'HbA1c Test');
            break;
        case 'Hypertension':
            labTests.push('Basic Metabolic Panel', 'Lipid Profile');
            break;
        case 'Anemia':
            labTests.push('Complete Blood Count (CBC)', 'Iron Studies');
            break;
        case 'Infection':
            labTests.push('Complete Blood Count (CBC)', 'Urinalysis', 'Culture Tests');
            break;
        // Add more cases as needed for different diagnoses
        default:
            labTests.push('Consult a healthcare professional for lab test recommendations.');
            break;
    }

    return labTests;
};