import { useState, useEffect } from "react";
import ResizableHandle from "./ResizableHandle";

interface ResizablePaneProps {
  minSize: number;
  initialSize: number;
  maxSize?: number;
  grow?: boolean;
  isVertical: boolean;
  bgColor: string;
  children?: React.ReactNode;
}


function ResizablePane({
    minSize,
    initialSize,
    maxSize,
    grow,
    isVertical,
    bgColor,
    children,
  }: ResizablePaneProps) {
    const [size, setSize] = useState(initialSize);
    const [isResizing, setIsResizing] = useState(false);
  
    const dimension = isVertical ? "height" : "width";
  
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing) return;
  
        const movement = isVertical ? e.movementY : e.movementX;
        let newSize = size + movement;
  
        newSize = Math.max(minSize || 0, Math.min(maxSize || Infinity, newSize));
        setSize(newSize);
      };
  
      const handleMouseUp = () => setIsResizing(false);
  
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [size, isResizing, minSize, maxSize, isVertical]);
  
    const handleMouseDown = () => setIsResizing(true);
  
    return (
      <div
        className={`relative ${bgColor} ${grow ? "grow" : ""} shrink-0`}
        style={{ [dimension]: `${size}px` }}
      >
        {children}
        {!grow && (
          <ResizableHandle
            isResizing={isResizing}
            isVertical={isVertical}
            handleMouseDown={handleMouseDown}
          />
        )}
      </div>
    );
  }

export default ResizablePane;
