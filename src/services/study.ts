const STORAGE_KEY = 'study_manager_data';

export interface StudySession {
	id: string;
	subject: string;
	date: string;
	duration: number;
	content: string;
}

export interface StudyData {
	categories: string[];
	sessions: StudySession[];
}

export const getStudyData = (): StudyData => {
	const data = localStorage.getItem(STORAGE_KEY);
	if (data) return JSON.parse(data);
	return {
		categories: ['Toán', 'Văn', 'Anh', 'Khoa học', 'Công nghệ'],
		sessions: [],
	};
};

export const saveStudyData = (data: StudyData) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
