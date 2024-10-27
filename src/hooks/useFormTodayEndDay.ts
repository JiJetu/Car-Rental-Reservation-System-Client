import { useEffect, useState } from "react";

export const useTodayAndMinEndDate = (daysAhead: number = 4) => {
  const [today, setToday] = useState<string>("");
  const [minEndDate, setMinEndDate] = useState<string>("");

  useEffect(() => {
    const todayDate = new Date();
    const todayString = todayDate.toISOString().split("T")[0];
    setToday(todayString);

    todayDate.setDate(todayDate.getDate() + daysAhead);
    const minEndDateString = todayDate.toISOString().split("T")[0];
    setMinEndDate(minEndDateString);
  }, [daysAhead]);

  return { today, minEndDate };
};
