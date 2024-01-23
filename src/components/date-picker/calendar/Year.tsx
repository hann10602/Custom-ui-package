import { useEffect, useState } from "react";
import {
  Action,
  useDateModalContext,
} from "../../../context/dateModalProvider";
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import dayjs from "dayjs";
import { dateFormat } from "../../../const/datepicker";

interface Props {}

const Year = ({}: Props) => {
  const {
    selectedModalDispatch,
    setCurrentDate,
    setSelectedDecade,
    selectedYear,
  } = useDateModalContext();
  const [years, setYears] = useState<number[]>([]);

  const currentDecade = Math.floor(selectedYear / 10) * 10 - 1;

  const handleChangeToPreviousDecade = () => {
    setYears(Array.from({ length: 12 }, (_, i) => years[0] - 10 + i));
  };

  const handleChangeToNextDecade = () => {
    setYears(Array.from({ length: 12 }, (_, i) => years[10] + i));
  };

  const handleChangeModal = (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    modal: Action
  ) => {
    event.stopPropagation();

    setSelectedDecade(years);
    selectedModalDispatch(modal);
  };

  const handleChangeYears = (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    year: number,
    modal: Action
  ) => {
    event.stopPropagation();

    selectedModalDispatch(modal);
    setCurrentDate(dayjs(`${year}-01-01`, dateFormat, true));
  };

  useEffect(() => {
    setYears(Array.from({ length: 12 }, (_, i) => currentDecade + i));
  }, [currentDecade]);

  return (
    <>
      <div className="flex justify-between border-b border-solid border-gray-300 py-1">
        <div
          onClick={handleChangeToPreviousDecade}
          className=" flex items-center"
        >
          <MdArrowBackIosNew className="cursor-pointer w-8" />
        </div>
        <div className="flex items-center gap-x-1">
          <p
            onClick={(event) => handleChangeModal(event, { type: "DECADE" })}
            className="cursor-pointer font-semibold hover:text-blue-500"
          >
            {years[1]}-{years[10]}
          </p>
        </div>
        <div onClick={handleChangeToNextDecade} className=" flex items-center">
          <MdOutlineArrowForwardIos className="cursor-pointer w-8" />
        </div>
      </div>
      <div className="grid grid-cols-3 p-5 gap-7">
        {years.map((year) => (
          <div
            key={year}
            className={`hover:bg-gray-200 cursor-pointer ${
              year === years[0] || year === years[11] ? "text-gray-400" : ""
            } text-center rounded-lg px-3`}
            onClick={(e) => handleChangeYears(e, year, { type: "MONTH" })}
          >
            {year}
          </div>
        ))}
      </div>
    </>
  );
};

export default Year;
