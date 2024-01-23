import dayjs from "dayjs";
import React, { createContext, useContext, useReducer, useState } from "react";

type IDateModalProps = {
  children: React.ReactNode;
};

export type Action =
  | { type: "CALENDAR" }
  | { type: "MONTH" }
  | { type: "YEAR" }
  | { type: "DECADE" };

const currentYear = dayjs().year();

type IDateModalContext = {
  selectedModal: string;
  selectedModalDispatch: React.Dispatch<Action>;
  selectedYear: number;
  setSelectedYear: React.Dispatch<number>;
  selectedDecade: number[];
  setSelectedDecade: React.Dispatch<number[]>;
  currentDate: dayjs.Dayjs;
  setCurrentDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
};

const selectedModalReducer = (state: string, action: Action): string => {
  switch (action.type) {
    case "CALENDAR":
      return "CALENDAR";
    case "MONTH":
      return "MONTH";
    case "YEAR":
      return "YEAR";
    case "DECADE":
      return "DECADE";
    default:
      return state;
  }
};

const DateModalContext = createContext<IDateModalContext>({
  selectedModal: "CALENDAR",
  selectedModalDispatch: () => {},
  selectedYear: currentYear,
  setSelectedYear: () => {},
  selectedDecade: [],
  setSelectedDecade: () => {},
  currentDate: dayjs(),
  setCurrentDate: () => {},
});

export const DateModalProvider = ({ children }: IDateModalProps) => {
  const [selectedModal, selectedModalDispatch] = useReducer(
    selectedModalReducer,
    "CALENDAR"
  );

  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(dayjs());
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedDecade, setSelectedDecade] = useState<number[]>([]);

  return (
    <DateModalContext.Provider
      value={{
        selectedModal,
        selectedModalDispatch,
        currentDate,
        setCurrentDate,
        selectedYear,
        setSelectedYear,
        selectedDecade,
        setSelectedDecade,
      }}
    >
      {children}
    </DateModalContext.Provider>
  );
};

export const useDateModalContext = (): IDateModalContext =>
  useContext(DateModalContext);
