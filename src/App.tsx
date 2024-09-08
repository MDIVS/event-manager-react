import { Register } from "./components/auth/register";
import { Header } from "./components/header/header";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

export function App() {
  return (
    <div className="max-w-[1216px] mx-auto p-5 flex flex-col gap-5">
      <Header />
      <Register />
    </div>
  )
}
