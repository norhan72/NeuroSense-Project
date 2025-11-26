import { createContext } from 'react';
import { IUserData } from './userTypes';

export interface UserDataContextType {
	userData: IUserData;
	setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
	resetUserData: () => void;
}

export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);
