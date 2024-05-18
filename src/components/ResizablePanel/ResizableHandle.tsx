interface ResizableHandleProps {
  isResizing: boolean;
  isVertical: boolean;
  handleMouseDown: () => void;
}

function ResizableHandle({ isResizing, isVertical, handleMouseDown }: ResizableHandleProps) {
    const positionHandleStyle = isVertical
      ? "h-1 left-0 right-0 bottom-0 cursor-row-resize"
      : "w-1 top-0 bottom-0 right-0 cursor-col-resize";
  
    return (
      <div
        className={`absolute ${positionHandleStyle} bg-blue-300 hover:bg-blue-600 ${
          isResizing ? "bg-blue-600" : ""
        }`}
        onMouseDown={handleMouseDown}
      />
    );
  }

export default ResizableHandle;
