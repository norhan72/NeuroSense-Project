import { Request, Response } from 'express';
import { DiagnosisService } from '../services/diagnosisService';
import { LabRecommendationService } from '../services/labRecommendationService';
import { Patient } from '../models/patient';

export class RecommendationController {
    private diagnosisService: DiagnosisService;
    private labRecommendationService: LabRecommendationService;

    constructor() {
        this.diagnosisService = new DiagnosisService();
        this.labRecommendationService = new LabRecommendationService();
    }

    public getRecommendations = async (req: Request, res: Response): Promise<void> => {
        try {
            const patientData: Patient = req.body;
            const diagnosis = await this.diagnosisService.analyzeSymptoms(patientData.symptoms);
            const labTests = await this.labRecommendationService.getLabRecommendations(diagnosis);

            res.status(200).json({
                diagnosis,
                labTests,
                recommendations: this.generateRecommendations(diagnosis)
            });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while processing the request.' });
        }
    };

    private generateRecommendations(diagnosis: string): string[] {
        const recommendations: string[] = [];
        // Add logic to generate recommendations based on the diagnosis
        if (diagnosis === 'Flu') {
            recommendations.push('Rest and hydrate', 'Consider antiviral medication');
        } else if (diagnosis === 'Diabetes') {
            recommendations.push('Monitor blood sugar levels', 'Consult a dietitian');
        }
        // Add more conditions as needed
        return recommendations;
    }
}