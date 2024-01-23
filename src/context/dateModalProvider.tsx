import React, { createContext, useContext, useReducer } from "react";

type IDateModalProps = {
  children: React.ReactNode;
};

export type Action =
  | { type: "CALENDAR" }
  | { type: "MONTH" }
  | { type: "YEAR" }
  | { type: "DECADE" };

type IDateModalContext = {
  selectedModal: string;
  selectedModalDispatch: React.Dispatch<Action>;
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
});

export const DateModalProvider = ({ children }: IDateModalProps) => {
  const [selectedModal, selectedModalDispatch] = useReducer(
    selectedModalReducer,
    "CALENDAR"
  );

  return (
    <DateModalContext.Provider
      value={{
        selectedModal,
        selectedModalDispatch,
      }}
    >
      {children}
    </DateModalContext.Provider>
  );
};

export const useDateModalContext = (): IDateModalContext =>
  useContext(DateModalContext);
