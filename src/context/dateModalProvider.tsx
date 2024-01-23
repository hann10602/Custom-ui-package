import dayjs from "dayjs";
import React, { createContext, useContext, useReducer, useState } from "react";

type IDateModalProps = {
  children: React.ReactNode;
};

export type Action =
  | { type: "CALENDAR" }
  | { type: "MONTH" }
  | { type: "YEAR" };

type IDateModalContext = {
  selectedModal: string;
  selectedModalDispatch: React.Dispatch<Action>;
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
    default:
      return state;
  }
};

const DateModalContext = createContext<IDateModalContext>({
  selectedModal: "CALENDAR",
  selectedModalDispatch: () => {},
  currentDate: dayjs(),
  setCurrentDate: () => {},
});

export const DateModalProvider = ({ children }: IDateModalProps) => {
  const [selectedModal, selectedModalDispatch] = useReducer(
    selectedModalReducer,
    "CALENDAR"
  );

  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(dayjs());

  return (
    <DateModalContext.Provider
      value={{
        selectedModal,
        selectedModalDispatch,
        currentDate,
        setCurrentDate,
      }}
    >
      {children}
    </DateModalContext.Provider>
  );
};

export const useDateModalContext = (): IDateModalContext =>
  useContext(DateModalContext);
