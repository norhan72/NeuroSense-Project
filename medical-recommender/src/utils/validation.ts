export const validatePatientData = (data) => {
    const { name, age, symptoms } = data;

    if (!name || typeof name !== 'string') {
        return { valid: false, message: 'Name is required and must be a string.' };
    }

    if (!age || typeof age !== 'number' || age <= 0) {
        return { valid: false, message: 'Age is required and must be a positive number.' };
    }

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
        return { valid: false, message: 'Symptoms are required and must be a non-empty array.' };
    }

    return { valid: true, message: 'Validation successful.' };
};

export const validateRecommendationRequest = (request) => {
    const { patientId } = request;

    if (!patientId || typeof patientId !== 'string') {
        return { valid: false, message: 'Patient ID is required and must be a string.' };
    }

    return { valid: true, message: 'Validation successful.' };
};