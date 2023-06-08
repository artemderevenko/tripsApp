import React, { useEffect } from "react";
import { useLatest } from "./useLatest";

export const useOutsideClick = (
  elementRef: React.RefObject<Element>,
  handler: any,
  attached = true
) => {
  const latestHandler = useLatest(handler);

  useEffect(() => {
    if (!attached) return;

    const handleClick = (e: MouseEvent) => {
      if (!elementRef.current) return;

      if (!elementRef.current.contains(e.target as Node)) {
        latestHandler.current()
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [elementRef, latestHandler, attached]);
};