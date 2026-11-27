import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, clearToken } from "../auth";

export default function Navbar() {
  const navigate = useNavigate();
  useLocation(); // re-render on navigation so login state stays current
  const loggedIn = isLoggedIn();

  const logout = () => {
    clearToken();
    navigate("/");
  };
  // render the event links only when loggedIn, and make Logout a
  // <button onClick={logout}> reusing the same className string
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img alt="Triangle Logo" className="h-10 inline" src="https://static.wixstatic.com/media/ea80c7_290994fde9d140b0bbe735ce2a3b0dad~mv2.png/v1/fill/w_448,h_100,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logotype-Tagline_4x%20(3).png"></img>
        </NavLink>

        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/events/create">
          Password Manager
        </NavLink>

        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/events">
          View Events
        </NavLink>

        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/events/create">
          Create Event
        </NavLink>

        <button className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" onClick={logout}>
          Logout
        </button>
      </nav>
    </div>
  );
}