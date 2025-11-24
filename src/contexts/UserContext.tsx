import { useEffect, useState, ReactNode } from 'react';
import { IUserData, defaultUserData } from './userTypes';
import { UserDataContext } from './internalUserContext';

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
	const [userData, setUserData] = useState<IUserData>(() => {
		try {
			const raw = localStorage.getItem('userData');
			return raw ? (JSON.parse(raw) as IUserData) : defaultUserData;
		} catch (e) {
			return defaultUserData;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem('userData', JSON.stringify(userData));
		} catch (e) {
			// ignore localStorage failures (e.g., private mode)
		}
	}, [userData]);

	const resetUserData = () => setUserData(defaultUserData);

	return (
		<UserDataContext.Provider value={{ userData, setUserData, resetUserData }}>{children}</UserDataContext.Provider>
	);
};
