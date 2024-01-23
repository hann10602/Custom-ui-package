import { useState } from "react";
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { months } from "../../../const/datepicker";
import {
  Action,
  useDateModalContext,
} from "../../../context/dateModalProvider";

interface Props {
  handleChangeDays: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    year: number,
    month: number
  ) => void;
}

const Month = ({ handleChangeDays }: Props) => {
  const { selectedModalDispatch, currentDate } = useDateModalContext();

  const [currentYear, setCurrentYear] = useState<number>(currentDate.year());

  const handleChangeModal = (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    modal: Action
  ) => {
    event.stopPropagation();
    selectedModalDispatch(modal);
  };

  const handleChangeToPreviousYear = () => {
    setCurrentYear((prev) => prev - 1);
  };

  const handleChangeToNextYear = () => {
    setCurrentYear((prev) => prev + 1);
  };

  return (
    <>
      <div className="flex justify-between border-b border-solid border-gray-300 py-1">
        <div
          onClick={handleChangeToPreviousYear}
          className=" flex items-center"
        >
          <MdArrowBackIosNew className="cursor-pointer w-8" />
        </div>
        <div className="flex items-center gap-x-1">
          <p
            onClick={(event) => handleChangeModal(event, { type: "YEAR" })}
            className="cursor-pointer font-semibold hover:text-blue-500"
          >
            {currentYear}
          </p>
        </div>
        <div onClick={handleChangeToNextYear} className=" flex items-center">
          <MdOutlineArrowForwardIos className="cursor-pointer w-8" />
        </div>
      </div>
      <div className="grid grid-cols-3 p-5 gap-7">
        {months.map((month) => (
          <div
            key={month.id}
            className={`hover:bg-gray-200 cursor-pointer text-center rounded-lg px-3`}
            onClick={(e) => handleChangeDays(e, currentYear, month.id)}
          >
            {month.code}
          </div>
        ))}
      </div>
    </>
  );
};

export default Month;
