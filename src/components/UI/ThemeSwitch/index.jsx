import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { Theme } from "../../../constants/theme";

export default function ThemeSwitch() {
  const { theme, setTheme } = useContext(GlobalContext);

  const handleClick = (theTheme) => {
    if (theTheme !== theme) {
      setTheme(theTheme);
    }
  };

  return (
    <div className="switch">      
      {Object.keys(Theme).map((theTheme) => (
        <button 
          key={theTheme} 
          className={theTheme === theme ? "active" : ""}
          onClick={() => handleClick(theTheme)}
          title={`Switch to ${theTheme}`}
        >
          {Theme[theTheme]}
        </button>
      ))}
    </div>
  );
}
