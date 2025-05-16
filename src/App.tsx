import { RouterProvider } from "react-router-dom";
import router from "./shared/router/Router";
import "./App.css";

function App() {
  return <RouterProvider router={router} />;
}
export default App;
