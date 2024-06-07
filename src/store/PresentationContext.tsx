"use client";

import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import { Content, Page, Presentation } from "./types";
import { Action, presentationReducer } from "./presentationReducer";

interface PresentationState {
  presentations: Presentation[];
  presentation?: Presentation;
  pages?: Page[];
  currentPage?: Page;
  currentContent?: Content;
}

const initialState: PresentationState = {
  presentations: [],
};

const PresentationContext = createContext<{
  state: PresentationState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const PresentationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(presentationReducer, initialState);

  return (
    <PresentationContext.Provider value={{ state, dispatch }}>
      {children}
    </PresentationContext.Provider>
  );
};

export const usePresentation = () => useContext(PresentationContext);
