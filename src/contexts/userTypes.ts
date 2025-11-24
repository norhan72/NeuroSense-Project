interface ITestResult {
	score: number;
	label_en: number;
	label_ar: number;
}

interface IResultsData {
	vision?: ITestResult;
	speech?: ITestResult;
	motion?: ITestResult;
	survey?: ITestResult;
}

export interface IUserData {
	name: string;
	age?: number | null;
	gender?: 'male' | 'female' | 'other' | string;
	symptoms: string;
	medicalHistory: string;
	results?: IResultsData;
}

export const defaultUserData: IUserData = {
	name: '',
	age: null,
	gender: undefined,
	symptoms: '',
	medicalHistory: '',
	results: { vision: null, motion: null, speech: null, survey: null },
};
