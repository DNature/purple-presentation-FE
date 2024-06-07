"use client";

import { Content, ContentType } from "@/store/types";
import React from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { usePresentation } from "@/store/PresentationContext";
import { deleteContent, saveContent } from "../[id]/action";

export const PageEditor: React.FC = ({}) => {
  const { state, dispatch } = usePresentation();
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const handleAddContent = (type: ContentType) => {
    dispatch({ type: "ADD_CONTENT", payload: type });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (!state.currentContent || !reader.result) return;
        dispatch({
          type: "SET_CURRENT_CONTENT",
          payload: {
            ...state.currentContent,
            data: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    contentId: string,
  ) => {
    dispatch({
      type: "SET_CURRENT_CONTENT_BY_ID",
      payload: contentId,
    });
    if (!state.currentContent) return;
    dispatch({
      type: "SET_CURRENT_CONTENT",
      payload: {
        ...state.currentContent,
        data: event.target.value,
      },
    });
  };

  const handleRemoveContent = async (content: Content) => {
    await deleteContent(content.id);
    dispatch({ type: "REMOVE_CONTENT", payload: content });
  };

  const handleSaveContent = () => {
    if (!state.currentPage) return;

    state.currentPage.contents.forEach(async (content) => {
      await saveContent({
        ...content,
        pageId: state.currentPage?.id,
      });
    });
  };

  const setCurrentContent = (contentId: string) => {
    dispatch({
      type: "SET_CURRENT_CONTENT_BY_ID",
      payload: contentId,
    });
  };

  return (
    <>
      {state.currentPage?.id && (
        <div className="col-span-4 px-4 overflow-scroll">
          <div className="flex gap-4 mb-4">
            <button
              className="btn"
              onClick={() => handleAddContent(ContentType.Text)}
            >
              Add Text Content
            </button>
            <button
              className="btn"
              onClick={() => handleAddContent(ContentType.Image)}
            >
              Add Image Content
            </button>
            <button
              className="btn"
              onClick={() => handleAddContent(ContentType.Video)}
            >
              Add Video Content
            </button>
            <button className="btn ml-auto" onClick={handleSaveContent}>
              Save content
            </button>
          </div>
          <div className="relative min-h-[700px] border-2">
            <DndContext
              sensors={sensors}
              onDragEnd={({ delta }) => {
                if (!state.currentContent) return;
                dispatch({
                  type: "SET_CURRENT_CONTENT",
                  payload: {
                    ...state.currentContent,
                    x: state.currentContent.x + delta.x,
                    y: state.currentContent.y + delta.y,
                  },
                });
              }}
            >
              {state.currentPage.contents.map((content) => (
                <div key={content.id}>
                  {content.type === ContentType.Text && (
                    <Draggable
                      handleRemoveContent={() => handleRemoveContent(content)}
                      id={content.id}
                      top={content.y}
                      left={content.x}
                      setCurrentContent={() => setCurrentContent(content.id)}
                    >
                      <textarea
                        defaultValue={content.data}
                        onChange={(event) => {
                          handleTextChange(event, content.id);
                        }}
                        className="w-full text-center"
                      />
                    </Draggable>
                  )}
                  {content.type === ContentType.Image && (
                    <>
                      {content.data ? (
                        <Draggable
                          handleRemoveContent={() =>
                            handleRemoveContent(content)
                          }
                          id={content.id}
                          top={content.y}
                          left={content.x}
                          setCurrentContent={() =>
                            setCurrentContent(content.id)
                          }
                        >
                          <img
                            src={content.data}
                            alt="content"
                            className="w-full"
                          />
                        </Draggable>
                      ) : (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      )}
                    </>
                  )}
                  {content.type === ContentType.Video && (
                    <>
                      {content.data ? (
                        <Draggable
                          handleRemoveContent={() =>
                            handleRemoveContent(content)
                          }
                          id={content.id}
                          top={content.y}
                          left={content.x}
                          setCurrentContent={() =>
                            setCurrentContent(content.id)
                          }
                        >
                          <video controls className="w-full">
                            <source src={content.data} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </Draggable>
                      ) : (
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleFileChange}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </DndContext>
          </div>
        </div>
      )}
    </>
  );
};
