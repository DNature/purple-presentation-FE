"use client";

import React, { PropsWithChildren } from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableProps extends PropsWithChildren {
  handleRemoveContent(): void;
  id: string;
  top?: number;
  left?: number;
}

export const Draggable: React.FC<DraggableProps> = ({
  handleRemoveContent,
  children,
  id,
  top,
  left,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
    top,
    left,
  };

  return (
    <div
      className="w-[100px] absolute h-[100px] p-2 bg-gray-300 "
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className="relative">
        <button {...listeners}>drag me</button>
        <button
          className="absolute top-0 right-0"
          onClick={handleRemoveContent}
        >
          &#128465;
        </button>

        {children}
      </div>
    </div>
  );
};
