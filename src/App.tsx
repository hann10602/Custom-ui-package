import DatePicker from "./components/date-picker";
import { DateModalProvider } from "./context/dateModalProvider";

function App() {
  return (
    <DateModalProvider>
      <DatePicker />
    </DateModalProvider>
  );
}

export default App;
