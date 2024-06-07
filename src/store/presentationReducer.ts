import { Content, ContentType, Page, Presentation } from "./types";
import { UniqueIdentifier } from "@dnd-kit/core";

interface PresentationState {
  presentations: Presentation[];
  presentation?: Presentation;
  pages?: Page[];
  currentPage?: Page;
  currentContent?: Content;
}

export type Action =
  | { type: "SET_PRESENTATIONS"; payload: Presentation[] }
  | { type: "ADD_PRESENTATION"; payload: Presentation }
  | { type: "SET_PRESENTATION"; payload: Presentation }
  | { type: "SET_PAGES"; payload: Page[] }
  | { type: "ADD_PAGE"; payload: Page }
  | { type: "REMOVE_PAGE"; payload: Page["id"] }
  | { type: "SET_CURRENT_PAGE"; payload: Page | undefined }
  | { type: "ADD_CONTENT"; payload: ContentType }
  | { type: "REMOVE_CONTENT"; payload: Content }
  | { type: "SET_CURRENT_CONTENT"; payload: Content }
  | { type: "SET_CURRENT_CONTENT_BY_ID"; payload: UniqueIdentifier };

export const presentationReducer = (
  state: PresentationState,
  action: Action,
): PresentationState => {
  switch (action.type) {
    case "SET_PRESENTATION":
      return { ...state, presentation: action.payload };
    case "SET_PAGES":
      return {
        ...state,
        pages: action.payload,
        currentPage: action.payload?.[0],
      };

    case "ADD_PAGE":
      if (!state.pages)
        return {
          ...state,
          pages: [action.payload],
          currentPage: action.payload,
        };

      return {
        ...state,
        pages: [...state.pages, action.payload],
        currentPage: action.payload,
      };
    case "REMOVE_PAGE":
      const remainingPages = state.pages?.filter(
        (page) => page.id !== action.payload,
      );
      return {
        ...state,
        pages: remainingPages,
        currentPage: remainingPages?.[0],
      };

    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };

    case "ADD_CONTENT":
      const newContent: Content = {
        id: `${Date.now()}`,
        type: action.payload,
        data: "",
        x: 0,
        y: 0,
      };
      if (!state.currentPage) return state;

      return {
        ...state,
        currentContent: newContent,
        currentPage: {
          ...state.currentPage,
          contents: [...state.currentPage.contents, newContent],
        },
      };

    case "REMOVE_CONTENT":
      if (!state.currentPage) return state;
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          contents: state.currentPage.contents.filter(
            (content) => content.id !== action.payload.id,
          ),
        },
      };

    case "SET_CURRENT_CONTENT":
      if (!state.currentPage) return state;
      return {
        ...state,
        currentContent: action.payload,
        currentPage: {
          ...state.currentPage,
          contents:
            state.currentPage?.contents.map((content) =>
              content.id === action.payload.id ? action.payload : content,
            ) ?? [],
        },
      };

    case "SET_CURRENT_CONTENT_BY_ID":
      const content = state.currentPage?.contents.find(
        (content) => content.id === action.payload,
      );
      if (!content) return state;
      return {
        ...state,
        currentContent: content,
      };

    case "SET_PRESENTATIONS":
      return { ...state, presentations: action.payload };
    case "ADD_PRESENTATION":
      return {
        ...state,
        presentations: [...state.presentations, action.payload],
      };
    default:
      return state;
  }
};
