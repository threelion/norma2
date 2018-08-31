import { UserRole } from '../enums/user-role.enum';

export interface User {
	username: string;
	id_token: string;
	role: string | UserRole;
}
