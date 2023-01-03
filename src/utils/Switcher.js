import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "./useDarkSide";

export default function Switcher({ sunLogo }) {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <>
            <DarkModeSwitch
                style={{}}
                sunColor={sunLogo}
                moonColor="black"
                checked={darkSide}
                onChange={toggleDarkMode}
                size={26}
            />
        </>
    );
}
