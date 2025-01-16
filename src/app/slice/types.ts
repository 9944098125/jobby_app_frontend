/* --- STATE --- */
export interface GlobalState {
  user: any;
  token: string | null;
  editFeed: {
    _id: string;
    owner: {
      userId: string;
      profilePicture: string;
      name: string;
    };
    title: string;
    description: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
  } | null;
}
