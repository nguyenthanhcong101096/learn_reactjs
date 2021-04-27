import Home from "./pages/Home";
import { Provider } from "react-redux";

function Redux() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}

export default Redux;
