export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    createdAt?: Date;
    updatedAt?: Date;
    lastLogin?: Date;
    isDeleted?: boolean;
    deletedAt?: Date;
    otpCode?: string;
    verifyOtp?: string;
    verificationToken?: string;
    phoneNumber?: string;
    isBlocked?: boolean;
    blockedAt?: Date;
    isOnBoarded: boolean;
    isVerified: boolean;
    otpCodeExpiry?: Date;
    isTwoFactorAuthEnabled?: boolean;
    twoFactorAuthCode?: string;
    twoFactorAuthCodeExpiry?: Date;
    image?: string;
    id?: string;
    ageBracket?: string;
    language?: string;
    country?: string;
    skillLevel?: "beginner" | "intermediate" | "professional" | "expert";
    learningStyle?: "visual" | "concept-first" | "mixed";
    personalized: boolean;
    extraQuestions?: boolean;
    isCreatingCourse?: boolean;
}