export interface CourseType {
    id: string;
    _id: string;
    title: string;
    user: string;
    description: string;
    isCreated: boolean;
    currentChapter?: string;
    isFinished: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    chapters: ChapterType[];
    flexibleContent: boolean;
    flexibleContents: FlexibleContent[];
    status: number;
    pinned: boolean;
    coverImage: string;
    streak: string;
  
    // Course structure & metadata
    thumbnail?: string;
    category?: string;
    tags?: string[];
    difficulty:
    | "beginner"
    | "intermediate"
    | "advanced";
    estimatedDuration?: number; // in minutes
    publishedAt?: Date;
    deletedAt?: Date;
    courseType: "flexible" | "standard";
    hasBeenOpendToday: boolean;
    isCompleted: boolean;
  }
  
  export interface FlexibleContent {
    title: string;
    description: string;
    content: string;
    isCreated: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface getSingleCouresResponseType {
    message: string;
    data: CourseType;
  }
  
  export interface getAllCourseResponseType {
    data: CourseType[];
  }
  
  export interface Module {
    id: string;
    title: string;
    description: string;
    order: number;
    lessons: Lesson[];
  }
  
  export interface Lesson {
    id: string;
    title: string;
    content: string;
    duration: number; // in minutes
    order: number;
    type: "video" | "text" | "quiz" | "assignment";
  }
  
  export interface CourseFormData {
    title: string;
    description: string;
    category: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    duration: string;
    maxStudents: string;
    price: string;
  }
  
  export interface FlashCardType {
    id: string;
    question: string;
    answer: string;
    category?: string;
    type?: string
  }
  export interface GetAllCourseFlashCardResponseType {
    message: string;
    data: FlashCardItemDataType[]
  }
  
  export interface FlashCardItemDataType {
    _id: string;
    courseId: string;
    userId: string;
    flashcards: FlashCardType[];
    createdAt: Date;
    updatedAt: Date;
    id: string;
  }
  
  export interface QuizResponse {
    message: string;
    data: QuizResponseItemType[]
  }
  
  export interface QuizResponseItemType {
    id: string;
    _id: string;
    course: string;
    scores: number[];
    questions: QuizQuestionType[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface QuizQuestionType {
    id: string;
    _id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }
  
  export interface LessonType {
    id: string;
    _id: string;
    chapter: string;
    course: string;
    title: string;
    description?: string;
    estimatedTimeMins?: number;
    sections: {
      heading: string;
      content: string;
    }[];
    examples?: string[];
    content: string;
    isCompleted: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    icon: 'active' | 'locked' | 'completed';
    isActive: boolean;
  }
  
  export interface ChapterType {
    id: string;
    level: number;
    course: string;
    title: string;
    description?: string;
    lessons: LessonType[];
    isCompleted: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    isCompletd: boolean;
    isActive: boolean;
    checkpoints?: CheckpointType[];
  
    // Virtuals
    lessonCount: number;
  }
  
  export interface CheckpointType {
    _id: string;
    id: string;
    user: string;
    course: string;
    chapter: string;
    lesson: string;
    triggerAfterLessonOrder: number;
    type: "quiz" | "flashcard" | "tips";
    status: "completed" | "not_completed";
    flashcard?: string;
    quiz?: string;
    tips?:string;
    completedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface FlashcardQuestionType {
    question: string;
    answer: string;
    category: string;
  }
  
  export interface QuizQuestionType {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: number ;
    explanation: string;
  }
  
  export interface QuizCourseType {
    _id: string;
    title: string;
    chaptersCount: number;
    completionPercentage: number;
    id: string;
  }
  
  export interface QuizUserType {
    _id: string;
    email: string;
    id: string;
  }
  
  export interface QuizType {
    _id: string;
    course: QuizCourseType;
    user: QuizUserType;
    questions: QuizQuestionType[];
    scores: number[];
    checkpoint: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  export interface FlashcardType {
    _id: string;
    id: string;
    courseId: string;
    userId: string;
    flashcards: FlashcardQuestionType[];
    quiz: QuizType;
    checkpoint: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CheckpointWithFlashcardType extends Omit<CheckpointType, 'flashcard'> {
    flashcard?: FlashcardType;
  }
  
  export interface GetCheckpointResponseType {
    message: string;
    data: CheckpointWithFlashcardType;
  }
  
  export interface courseStatsResponseType {
    chapters: number,
    lessons: number,
  }

export interface CourseListResponseType {
  data: {
    courses: CourseListItem[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }
}