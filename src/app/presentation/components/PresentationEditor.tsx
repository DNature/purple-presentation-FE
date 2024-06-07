"use client";

import { Page } from "@/store/types";
import React from "react";
import { usePresentation } from "@/store/PresentationContext";
import { PageEditor } from "./PageEditor";
import { addPage, deletePage } from "../[id]/action";

export const PresentationEditor: React.FC = ({}) => {
  const { state, dispatch } = usePresentation();

  const handleAddPage = async () => {
    const response = await addPage({
      pageNumber: state.pages && state.pages.length + 1,
      presentationId: state.presentation?.id,
    });
    dispatch({
      type: "ADD_PAGE",
      payload: {
        id: response.id,
        contents: [],
      },
    });
  };

  const handleSelectPage = (page: Page) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  };

  const handleRemovePage = async (pageId: string) => {
    await deletePage(pageId);
    dispatch({ type: "REMOVE_PAGE", payload: pageId });
  };

  const shouldDisable = state.pages && state.pages.length <= 1;
  return (
    <div>
      <button className="btn my-4" onClick={handleAddPage}>
        Add Page
      </button>
      <div className="grid gap-4 grid-cols-5">
        <div className="col-span-1">
          {state.pages?.map((page, idx) => (
            <ul key={page.id}>
              <li
                className={`p-4 mb-4 border cursor-pointer ${page.id === state.currentPage?.id ? "bg-gray-200" : ""}`}
                onClick={() => handleSelectPage(page)}
              >
                <h3>Page {idx + 1}</h3>
                <button
                  className={`bg-red-600 my-2 text-xs text-white p-2 rounded ${shouldDisable ? "cursor-not-allowed opacity-40" : ""}`}
                  disabled={shouldDisable}
                  onClick={() => handleRemovePage(page.id)}
                >
                  Remove Page
                </button>
              </li>
            </ul>
          ))}
        </div>
        <PageEditor />
      </div>
    </div>
  );
};
