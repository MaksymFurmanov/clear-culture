'use client';

import { ReactElement, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

const createWrapper = (wrapperId: string) => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", wrapperId);
  document.body.appendChild(wrapper);
  return wrapper;
};

export default function ModalPortal({
                                      children,
                                      wrapperId
                                    }: {
  children: ReactElement,
  wrapperId: string
}) {
  const [wrapper, setWrapper] = useState<HTMLElement>();

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapper(wrapperId);
    }
    setWrapper(element);

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  useLayoutEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.classList.add("noScroll");

    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.classList.remove("noScroll");
      document.body.style.paddingRight = "";
    };
  }, []);

  if (!wrapper) return null;

  return createPortal(children, wrapper);
}