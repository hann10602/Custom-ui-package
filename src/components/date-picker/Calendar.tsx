import { Dayjs } from "dayjs";
import {
  HTMLProps,
  RefObject,
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
} from "react";
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { DaysType } from "../../types/datepicker.type";

type Props = {
  handleChangeToPreviousMonth: () => void;
  handleChangeToNextMonth: () => void;
  currentDate: Dayjs;
  days: DaysType[];
  dateInput: string;
  handleOnMouseOutDay: () => void;
  handleChangeSelectedDate: (date: string) => void;
  handleOnMouseOverDay: (date: string) => void;
  handleSelectedToday: () => void;
};

export type ChildMethodType = {
  returnThis: () => HTMLDivElement | null;
};

type CombinedProps = Props &
  HTMLProps<HTMLInputElement> & { ref?: RefObject<ChildMethodType> };

const Calendar = forwardRef<ChildMethodType, CombinedProps>(
  (
    {
      currentDate,
      handleChangeToPreviousMonth,
      handleChangeToNextMonth,
      days,
      dateInput,
      handleOnMouseOutDay,
      handleChangeSelectedDate,
      handleOnMouseOverDay,
      handleSelectedToday,
    }: Props,
    ref
  ) => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const handleGetMonth = () => {
      switch (currentDate.month()) {
        case 0:
          return "Jan";
        case 1:
          return "Feb";
        case 2:
          return "Mar";
        case 3:
          return "Apr";
        case 4:
          return "May";
        case 5:
          return "Jun";
        case 6:
          return "Jul";
        case 7:
          return "Aug";
        case 8:
          return "Sep";
        case 9:
          return "Oct";
        case 10:
          return "Nov";
        case 11:
          return "Dec";
      }
    };

    useImperativeHandle(ref, () => ({
      returnThis: () => calendarRef.current,
    }));

    return (
      <div className="absolute top-14" ref={calendarRef}>
        <div className="w-full flex justify-between items-center border border-solid border-gray-300 py-1">
          <div onClick={handleChangeToPreviousMonth}>
            <MdArrowBackIosNew className="cursor-pointer w-8" />
          </div>
          <div>
            {handleGetMonth()} {currentDate.year()}
          </div>
          <div onClick={handleChangeToNextMonth}>
            <MdOutlineArrowForwardIos className="cursor-pointer w-8 flex justify-center" />
          </div>
        </div>
        <div className="w-full grid grid-cols-7 border border-solid border-gray-300 px-2">
          <div className="flex justify-center items-center font-semibold">
            Su
          </div>
          <div className="flex justify-center items-center font-semibold">
            Mo
          </div>
          <div className="flex justify-center items-center font-semibold">
            Tu
          </div>
          <div className="flex justify-center items-center font-semibold">
            We
          </div>
          <div className="flex justify-center items-center font-semibold">
            Th
          </div>
          <div className="flex justify-center items-center font-semibold">
            Fr
          </div>
          <div className="flex justify-center items-center font-semibold">
            Sa
          </div>

          {days.map((day) => (
            <div
              className={`${day.type === "current" ? "" : "text-gray-400"} ${
                dateInput === day.date && day.type === "current"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-gray-200"
              } w-8 h-8 flex justify-center items-center cursor-pointer`}
              key={day.type === "current" ? day.day : day.day + 40}
              onClick={() => handleChangeSelectedDate(day.date)}
              onMouseOver={() => handleOnMouseOverDay(day.date)}
              onMouseOut={handleOnMouseOutDay}
            >
              {day.day}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center border-x border-b border-solid border-gray-300 py-1 text-sm font-semibold">
          <p
            className="text-blue-600 cursor-pointer hover:text-blue-500 w-max"
            onClick={handleSelectedToday}
          >
            Today
          </p>
        </div>
      </div>
    );
  }
);

export default memo(Calendar);
