export interface IPostDescription {
    heading: string;
    content: string;
}
export interface IPost {
    author: string;
    category: string;
    createdAt: string;
    comments: string[];
    description: IPostDescription[];
    likes: number;
    photos: string[];
    title: string;
    updatedAt: string;
    __v: number;
    _id: string;
}
