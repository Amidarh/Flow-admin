export interface AdminListItem {
  id: string;
  username: string;
  email: string;
  addedAt: string;
}

export interface AdminDetails {
  id: string;
  username: string;
  email: string;
  addedAt: string;
  lastActive?: string;
}
