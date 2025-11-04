export interface Patient {
    id: string;
    name: string;
    age: number;
    symptoms: string[];
    medicalHistory: string[];
}

export interface Recommendation {
    diagnosis: string;
    tests: string[];
    treatment: string;
}