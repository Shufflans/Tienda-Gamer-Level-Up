import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";

export default function App() {
  return ( 
    <div className="bg-[#1A0B2E] min-h-screen text-[#F5EEFF] font-outfit">
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}
