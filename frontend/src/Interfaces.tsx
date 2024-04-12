export interface IComment {
    pk: number;
    author: string;
    text: string;
    time_create: string;
}

export interface INewsItem {
    pk?: number;
    title?: string;
    text?: string;
    author?: string;
    rating?: number;
    time_create?: Date;
    time_update?: Date;
  }