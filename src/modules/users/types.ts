export type UserStatus = "Active" | "Inactive" | "Pending";

export interface UserListItem {
  id: string;
  fullName: string;
  email: string;
  dateJoined: string;
  lastLogin: string | null;
  status: UserStatus;
  country: string | null;
}

export interface UsersPaginationState {
  page: number;
  perPage: number;
  total: number;
}
