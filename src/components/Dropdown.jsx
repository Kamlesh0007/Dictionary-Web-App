import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import arrowDown from '../assets/images/icon-arrow-down.svg';

const Dropdown = ({ isExpanded, toggle, currentFont, children }) => {
  const wrapperRef = useRef(null);
console.log(children);

  // Detect clicks outside the dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
        // console.log(event.target);
        // console.log(wrapperRef.current);
        
        
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        toggle(false); // Close the dropdown
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isExpanded, toggle]);

  return (
    <div className="relative h-full" ref={wrapperRef}>
      {/* Button to toggle dropdown visibility */}
      <button
        className="h-full font-bold text-body-s tablet:text-[1.125rem] flex items-center px-4 tablet:px-[1.625rem] border-r-gray-2 border-r-[1px]"
        onClick={() => toggle(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="mr-4">{currentFont}</span>
        <img src={arrowDown} alt="Arrow down" aria-hidden="true" className="w-[12px]" />
      </button>

      {/* Dropdown menu with transition */}
      <CSSTransition
        in={isExpanded}
        timeout={200}
        unmountOnExit
        classNames="select-box-body"
      >
        <ul
          className="select-box-body absolute p-6 font-bold shadow-dropdown dark:shadow-dropdown-dark rounded-2xl 
            min-w-[183px] mt-[0.625rem] right-0 flex flex-col gap-4 bg-white dark:bg-black-2"
        >
          {children}
        </ul>
      </CSSTransition>
    </div>
  );
};

export default Dropdown;
