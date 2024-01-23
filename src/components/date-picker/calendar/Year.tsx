import { useDateModalContext } from "../../../context/dateModalProvider";

interface Props {}

const Year = ({}: Props) => {
  const { selectedModalDispatch } = useDateModalContext();

  return <div>Year</div>;
};

export default Year;
