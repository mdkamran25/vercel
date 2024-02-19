"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const PortalProvider = ({ children, selector, show }: PortalInterface) => {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);
  return show && ref.current ? createPortal(children, ref.current) : null;
};

export default PortalProvider;
