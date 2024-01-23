import { useEffect, useState } from "react";
import {
  Action,
  useDateModalContext,
} from "../../../context/dateModalProvider";
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

type Props = {};

const Decade = (props: Props) => {
  const { selectedModalDispatch, selectedDecade, setSelectedYear } =
    useDateModalContext();

  const [decades, setDecades] = useState<number[]>([]);

  const currentDecades = Math.floor(selectedDecade[1] / 100) * 100 - 10;

  const handleChangeToPreviousDecade = () => {
    const decade: number[] = [];
    const nextCentury = currentDecades + 120;
    for (let i = currentDecades; i <= nextCentury; i += 10) {
      decade.push(i);
    }

    setDecades(decade);
  };

  const handleChangeToNextDecade = () => {
    const decade: number[] = [];
    const nextCentury = decades[11] + 100;
    for (let i = decades[9]; i <= nextCentury; i += 10) {
      decade.push(i);
    }

    setDecades(decade);
  };

  const handleChangeDecades = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    year: number,
    modal: Action
  ) => {
    e.stopPropagation();

    setSelectedYear(year);

    selectedModalDispatch(modal);
  };

  useEffect(() => {
    const decade: number[] = [];
    const nextCentury = currentDecades + 120;
    for (let i = currentDecades; i <= nextCentury; i += 10) {
      decade.push(i);
    }

    setDecades(decade);
  }, [selectedDecade]);

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
          <p>
            {currentDecades + 10}-{currentDecades + 109}
          </p>
        </div>
        <div onClick={handleChangeToNextDecade} className=" flex items-center">
          <MdOutlineArrowForwardIos className="cursor-pointer w-8" />
        </div>
      </div>
      <div className="grid grid-cols-3 p-5 gap-7">
        {decades.slice(0, 12).map((decade, i) => (
          <div
            key={decade}
            className={`
            ${
              decade === decades[0] || decade === decades[11]
                ? "text-gray-400"
                : ""
            } hover:bg-gray-200 cursor-pointer 
              text-center rounded-lg px-3`}
            onClick={(e) => handleChangeDecades(e, decade, { type: "YEAR" })}
          >
            {decades[i]}-{decades[i + 1] - 1}
          </div>
        ))}
      </div>
    </>
  );
};

export default Decade;
