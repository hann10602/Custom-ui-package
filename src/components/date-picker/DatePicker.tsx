import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useRef, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { dateFormat } from "../../const/datepicker";
import { DaysType } from "../../types/datepicker.type";
import Calendar, { ChildMethodType } from "./Calendar";

type Props = {};

const DatePicker = ({}: Props) => {
  dayjs.extend(customParseFormat);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [hoverDate, setHoverDate] = useState<string | undefined>(undefined);
  const [dateInput, setDateInput] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [isMouseOnInput, setIsMouseOnInput] = useState<boolean>(false);
  const [days, setDays] = useState<DaysType[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<ChildMethodType>(null);

  const handleGetSelectedCalendar = (selectedDate: dayjs.Dayjs) => {
    let lastDaysInPreviousMonth = selectedDate
      .subtract(1, "month")
      .daysInMonth();
    const previousMonth = (
      selectedDate.subtract(1, "month").month() + 1
    ).toString();
    const previousYear = selectedDate.subtract(1, "month").year();
    const currentMonth = (selectedDate.month() + 1).toString();
    const currentYear = selectedDate.year();
    const nextMonth = (selectedDate.add(1, "month").month() + 1).toString();
    const nextYear = selectedDate.add(1, "month").year();
    const daysInMonth = selectedDate.daysInMonth();
    const dayArray: DaysType[] = [];

    for (let i = 0; i < selectedDate.startOf("month").day(); i++) {
      const dayInPreviousMonth = lastDaysInPreviousMonth - i;
      dayArray.unshift({
        day: dayInPreviousMonth,
        date: `${previousYear}-${
          previousMonth.length === 1 ? `0${previousMonth}` : previousMonth
        }-${dayInPreviousMonth}`,
        type: "other",
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayString = i.toString();
      dayArray.push({
        day: i,
        date: `${currentYear}-${
          currentMonth.length === 1 ? `0${currentMonth}` : currentMonth
        }-${dayString.length === 1 ? `0${dayString}` : dayString}`,
        type: "current",
      });
    }

    const firstDayInNextMonth =
      dayArray.length % 7 === 0 ? 0 : 7 - (dayArray.length % 7);

    for (let i = 1; i <= firstDayInNextMonth; i++) {
      dayArray.push({
        day: i,
        date: `${nextYear}-${
          nextMonth.length === 1 ? `0${nextMonth}` : nextMonth
        }-${`0${i}`}`,
        type: "other",
      });
    }

    return dayArray;
  };

  const handleChangeToNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, "month"));
    setDays(handleGetSelectedCalendar(currentDate.add(1, "month")));
  };

  const handleChangeToPreviousMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, "month"));
    setDays(handleGetSelectedCalendar(currentDate.subtract(1, "month")));
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInput(e.target.value);

    const inputValue = dayjs(e.target.value, dateFormat, true);

    if (inputValue.isValid()) {
      setCurrentDate(inputValue);
    }
  };

  const handleTriggerInput = () => {
    inputRef.current?.focus();
    setIsFocus(true);
    setIsOpenCalendar(true);
  };

  const handleChangeSelectedDate = (date: string) => {
    setDateInput(date);
    setIsOpenCalendar(false);
    setHoverDate(undefined);
    setCurrentDate(dayjs(date, { format: dateFormat }));
  };

  const handleOnMouseOverDay = (date: string) => {
    setHoverDate(date);
  };

  const handleOnMouseOutDay = () => {
    setHoverDate(undefined);
  };

  const handleClearDateInput = () => {
    setDateInput("");
    setIsOpenCalendar(false);
  };

  const handleSelectedToday = () => {
    setDateInput(dayjs().format(dateFormat));
    setIsOpenCalendar(false);
    setCurrentDate(dayjs());
  };

  useEffect(() => {
    setDays(handleGetSelectedCalendar(currentDate));
  }, [currentDate]);

  useEffect(() => {
    const handleCheckIsMouseOnInput = (e: MouseEvent) => {
      if (
        inputRef.current &&
        inputRef.current.contains((e.target as Node) || null)
      ) {
        setIsMouseOnInput(true);
      } else {
        setIsMouseOnInput(false);
      }
    };

    document.addEventListener("mouseover", handleCheckIsMouseOnInput);

    return () => {
      document.removeEventListener("mouseover", handleCheckIsMouseOnInput);
    };
  });

  useEffect(() => {
    if (isOpenCalendar) {
      const handleCheckClickPosition = (e: MouseEvent) => {
        if (
          !(
            calendarRef.current &&
            calendarRef.current.returnThis &&
            inputRef.current &&
            (inputRef.current.contains((e.target as Node) || null) ||
              calendarRef.current
                .returnThis()
                ?.contains((e.target as Node) || null))
          )
        ) {
          setIsOpenCalendar(false);
        }
      };

      document.addEventListener("click", handleCheckClickPosition);

      return () => {
        document.removeEventListener("click", handleCheckClickPosition);
      };
    }
  });

  return (
    <div className="p-5 relative">
      <div
        className={`${
          isFocus ? "border-blue-600" : "border-gray-300"
        } border border-solid px-2.5 rounded-md py-0.5 w-max flex justify-between items-center space-x-2`}
        ref={inputRef}
        onClick={handleTriggerInput}
      >
        <input
          type="text"
          placeholder="Select date"
          className={`${hoverDate ? "text-gray-400" : ""} outline-none`}
          value={hoverDate ? hoverDate : dateInput}
          onChange={handleChangeValue}
        />
        {isMouseOnInput && dateInput ? (
          <IoCloseCircle
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={handleClearDateInput}
          />
        ) : (
          <FaCalendarAlt color="gray" />
        )}
      </div>
      {isOpenCalendar && (
        <Calendar
          handleChangeToPreviousMonth={handleChangeToPreviousMonth}
          handleChangeToNextMonth={handleChangeToNextMonth}
          currentDate={currentDate}
          days={days}
          dateInput={dateInput}
          handleOnMouseOutDay={handleOnMouseOutDay}
          handleChangeSelectedDate={handleChangeSelectedDate}
          handleOnMouseOverDay={handleOnMouseOverDay}
          handleSelectedToday={handleSelectedToday}
          ref={calendarRef}
        />
      )}
    </div>
  );
};

export default DatePicker;
