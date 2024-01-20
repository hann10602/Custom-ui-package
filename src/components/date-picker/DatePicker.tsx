import { useEffect, useRef, useState } from "react";
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";

type Props = {};

type DaysType = {
  day: number;
  type: string;
};

const DatePicker = ({}: Props) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [dateInput, setDateInput] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [days, setDays] = useState<DaysType[]>([]);
  const [selectedDate, setSelectedDate] = useState<number>();

  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleGetSelectedCalendar = (selectedDate: dayjs.Dayjs) => {
    let lastDaysInPreviousMonth = selectedDate
      .subtract(1, "month")
      .daysInMonth();
    const daysInMonth = selectedDate.daysInMonth();
    const dayArray = [];

    for (let i = 1; i <= selectedDate.startOf("month").day(); i++) {
      dayArray.unshift({ day: lastDaysInPreviousMonth--, type: "other" });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      dayArray.push({ day: i, type: "current" });
    }

    const firstDayInNextMonth =
      dayArray.length % 7 === 0 ? 0 : 7 - (dayArray.length % 7);

    for (let i = 1; i <= firstDayInNextMonth; i++) {
      dayArray.push({ day: i, type: "other" });
    }

    return dayArray;
  };

  const handleChangeInput = () => {};

  const handleChangeToNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, "month"));
    setDays(handleGetSelectedCalendar(currentDate.add(1, "month")));
  };

  const handleChangeToPreviousMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, "month"));
    setDays(handleGetSelectedCalendar(currentDate.subtract(1, "month")));
  };

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

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setDateInput(value);
    }
  };

  const handleInputFocus = () => {
    setIsFocus(true);
    setIsOpenCalendar(true);
  };

  const handleCheckClickPosition = (e: MouseEvent) => {
    if (e.target !== calendarRef.current) {
      setIsOpenCalendar(false);
    }
  };

  const handleChangeSelectedDate = () => {};

  useEffect(() => {
    setDays(handleGetSelectedCalendar(currentDate));
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleCheckClickPosition);

    return () => {
      document.removeEventListener("mousedown", handleCheckClickPosition);
    };
  });

  console.log(selectedDate);

  return (
    <div className="p-5 relative">
      <div className="flex gap-x-5 items-center">
        <div
          className={`${
            isFocus ? "border-blue-600" : "border-gray-300"
          } border border-solid px-2.5 rounded-md py-0.5 w-max flex justify-between items-center space-x-2`}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Select date"
            className="outline-none "
            value={dateInput}
            onChange={handleChangeValue}
            onFocus={handleInputFocus}
          />
          <FaCalendarAlt color="gray" />
        </div>
      </div>
      {isOpenCalendar && (
        <div className="absolute" ref={calendarRef}>
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
          <div className="grid grid-cols-7 border border-solid border-gray-300 p-3">
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
            {days.map((day, i) => (
              <div
                className={`${day.type === "current" ? "" : "text-gray-400"} ${
                  selectedDate === i ? "bg-blue-500" : "hover:bg-gray-200"
                } w-8 h-8 flex justify-center items-center cursor-pointer`}
                key={day.type === "current" ? day.day : day.day + 40}
                onClick={() => {
                  setSelectedDate(i);
                }}
              >
                {day.day}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
