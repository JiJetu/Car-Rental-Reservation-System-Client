import { modeItem } from "@/constant/mode";
import { useEffect, useState } from "react";

export const useMode = () => {
  const [mode, setMode] = useState(modeItem.LIGHT);

  const changeMode = () => {
    const html = document.documentElement;

    if (mode === modeItem.LIGHT) {
      html.classList.remove(modeItem.LIGHT);
      html.classList.add(modeItem.DARK);
      setMode(modeItem.DARK);
      localStorage.setItem("mode", modeItem.DARK);
    } else {
      html.classList.remove(modeItem.DARK);
      html.classList.add(modeItem.LIGHT);
      setMode(modeItem.LIGHT);
      localStorage.setItem("mode", modeItem.LIGHT);
    }
  };

  useEffect(() => {
    const currentMode = localStorage.getItem("mode") || modeItem.LIGHT;

    document.documentElement.classList.add(currentMode);

    setMode(currentMode);
  }, []);

  return { changeMode, mode };
};
