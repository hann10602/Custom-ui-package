import { memo, useMemo } from "react";
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { months } from "../../../const/datepicker";
import {
  Action,
  useDateModalContext,
} from "../../../context/dateModalProvider";
import { DaysType } from "../../../types/datepicker.type";

type Props = {
  handleChangeToPreviousMonth: () => void;
  handleChangeToNextMonth: () => void;
  days: DaysType[];
  dateInput: string;
  handleOnMouseOutDay: () => void;
  handleChangeSelectedDate: (date: string) => void;
  handleOnMouseOverDay: (date: string) => void;
  handleSelectedToday: () => void;
};

const Calendar = ({
  handleChangeToPreviousMonth,
  handleChangeToNextMonth,
  days,
  dateInput,
  handleOnMouseOutDay,
  handleChangeSelectedDate,
  handleOnMouseOverDay,
  handleSelectedToday,
}: Props) => {
  const { selectedModalDispatch, currentDate, setSelectedYear } =
    useDateModalContext();

  const monthId = currentDate.month();

  const currentMonth = useMemo(
    () =>
      months.filter((month) => {
        if (monthId === month.id) {
          return month.code;
        }
      }),
    [monthId]
  );

  const handleChangeModal = (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    modal: Action
  ) => {
    event.stopPropagation();

    setSelectedYear(currentDate.year());
    selectedModalDispatch(modal);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center py-1">
        <div onClick={handleChangeToPreviousMonth}>
          <MdArrowBackIosNew className="cursor-pointer w-8" />
        </div>
        <div className="flex items-center gap-x-1">
          <p
            onClick={(event) => handleChangeModal(event, { type: "MONTH" })}
            className="cursor-pointer font-semibold hover:text-blue-500"
          >
            {currentMonth[0].code}
          </p>
          <p
            onClick={(event) => handleChangeModal(event, { type: "YEAR" })}
            className="cursor-pointer font-semibold hover:text-blue-500"
          >
            {currentDate.year()}
          </p>
        </div>
        <div onClick={handleChangeToNextMonth}>
          <MdOutlineArrowForwardIos className="cursor-pointer w-8 flex justify-center" />
        </div>
      </div>
      <div className="w-full grid grid-cols-7 border-y border-solid border-gray-300 py-3 px-5">
        <div className="flex justify-center items-center font-semibold">Su</div>
        <div className="flex justify-center items-center font-semibold">Mo</div>
        <div className="flex justify-center items-center font-semibold">Tu</div>
        <div className="flex justify-center items-center font-semibold">We</div>
        <div className="flex justify-center items-center font-semibold">Th</div>
        <div className="flex justify-center items-center font-semibold">Fr</div>
        <div className="flex justify-center items-center font-semibold">Sa</div>
        {days.map((day) => (
          <div
            className={`${day.type === "current" ? "" : "text-gray-400"} ${
              dateInput === day.date && day.type === "current"
                ? "border border-solid border-blue-600"
                : "hover:bg-gray-200"
            } w-9 h-9 flex justify-center items-center cursor-pointer`}
            key={day.type === "current" ? day.day : day.day + 40}
            onClick={() => handleChangeSelectedDate(day.date)}
            onMouseOver={() => handleOnMouseOverDay(day.date)}
            onMouseOut={handleOnMouseOutDay}
          >
            {day.day}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center py-1 text-sm font-semibold">
        <p
          className="text-blue-600 cursor-pointer hover:text-blue-500 w-max"
          onClick={handleSelectedToday}
        >
          Today
        </p>
      </div>
    </>
  );
};

export default memo(Calendar);
