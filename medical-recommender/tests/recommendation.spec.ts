import { RecommendationController } from '../src/api/controllers/recommendationController';

describe('RecommendationController', () => {
    let controller: RecommendationController;

    beforeEach(() => {
        controller = new RecommendationController();
    });

    it('should return recommendations based on symptoms', async () => {
        const symptoms = ['fever', 'cough'];
        const expectedRecommendations = ['Flu', 'COVID-19'];

        const recommendations = await controller.getRecommendations(symptoms);

        expect(recommendations).toEqual(expectedRecommendations);
    });

    it('should handle empty symptoms array', async () => {
        const symptoms: string[] = [];
        const expectedRecommendations: string[] = [];

        const recommendations = await controller.getRecommendations(symptoms);

        expect(recommendations).toEqual(expectedRecommendations);
    });

    it('should return an error for invalid symptoms', async () => {
        const symptoms = ['invalidSymptom'];

        await expect(controller.getRecommendations(symptoms)).rejects.toThrow('Invalid symptoms provided');
    });
});