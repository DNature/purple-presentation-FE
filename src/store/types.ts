export interface Presentation {
  id: string;
  title: string;
  pages: Page[];
}

export interface Page {
  id: string;
  contents: Content[];
}

export interface Content {
  id: string;
  type: ContentType;
  data: string; // Assuming data is a URL for images and videos, and text for text content
  x: number;
  y: number;
}

export enum ContentType {
  Text = "text",
  Image = "image",
  Video = "video",
}
