import { useEffect, useState } from 'react'
import React from 'react'
import logo from '../assets/images/logo.svg'
import moonIcon from "../assets/images/icon-moon.svg";
import moonIconDark from "../assets/images/icon-moon-purple.svg";
import Dropdown from './Dropdown'
import fontNames from '../utils/fontnames'
import Toggle from './Toggle';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('theme-color') === 'dark')
    const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);

    const navigate = useNavigate();
    const toggleDropdown = (state) => setIsDropdownExpanded(state);
    const toggleTheme = () => setIsDarkTheme(prevState => !prevState);

    const handleFontSelect = (font) => {
        props.applyFont(font);
        setIsDropdownExpanded(false); // Close dropdown after selection
    };

    
    

    useEffect(() => {
        document.documentElement.className = isDarkTheme ? 'dark' : ''
        localStorage.setItem('theme-color', isDarkTheme ? 'dark' : 'light')
      }, [isDarkTheme])
    const dropdownitems = Object.entries(fontNames).map(([key, val]) => (
        <li key={key} className={`${val} cursor-pointer hover:text-purple`} onClick={() => handleFontSelect(key)}>
            <button>{key}</button>
        </li>))
    return (
        <header className="flex justify-between mt-6 mb-6 tablet:mt-[3.625rem] tablet:mb-[3.25rem]">

            <img src={logo} alt="Dictionary logo" className="w-[28px] tablet:w-[32px] cursor-pointer"   onClick={()=>navigate('/')}  />
            <div className="flex">
                <Dropdown
                    isExpanded={isDropdownExpanded}
                    toggle={toggleDropdown}
                    currentFont={props.currentFont}
                >
                    {dropdownitems}
                </Dropdown>
                <div className="flex items-center">
          <Toggle checked={isDarkTheme} toggle={toggleTheme} />
          <img
            src={isDarkTheme ? moonIconDark : moonIcon}
            aria-hidden="true"
            className="ml-3 tablet:ml-5"
            alt="Moon icon"
          />
        </div>
            </div>

        </header>
    )
}

export default Header