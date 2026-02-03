import { IUser } from "./user";

// export interface courseStore {
//   setIsCourseSidebarOpen: (isOpen: boolean) => void;
//   setSubCourseTab: (tab: "chat" | "quiz" | "flashcard" | "notes") => void;
// }

export interface mainStore {
  isLearningSidebarOpen: boolean;
  setIsLearningSidebarOpen: (isOpen: boolean) => void;
  isWaitlistOpen: boolean;
  setIsWaitlistOpen: (action: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
  setLogout: (logout: () => void) => void;
}
