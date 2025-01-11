import { selectUser } from 'app/slice/selectors';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useClickOutside } from 'utils/hooks/use-click-outside';
import UserAvatar from './user-avatar';
import AuthenticationLinks from './authentication-links';

type Props = {
  showDropdown: boolean;
  setShowDropdown: (val: boolean) => void;
};
const Navbar = (props: Props) => {
  const { showDropdown, setShowDropdown } = props;
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const user = useSelector(selectUser);
  console.log('user', user);
  useClickOutside(userDropdownRef, () => {
    setShowDropdown(false);
  });

  return (
    <React.Fragment>
      <div className="w-full fixed top-0 left-0 right-0 z-50 bg-gradient-to-tr from-teal-700 via-teal-600 to-teal-400 shadow-lg h-[70px] flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div>
          <img
            src="/logo.png"
            alt="Logo"
            className="h-[50px] w-[50px] md:h-[80px] md:w-[100px]"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-[25px] md:space-x-[80px] text-white">
          {/* Feed Icon and Text */}
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="flex flex-col items-center">
              <svg
                className="w-10 h-10"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p className="hidden md:block font-poppins text-[14px] font-medium">
                Feed
              </p>
            </div>
          </Link>
          {/* jobs icon and text  */}
          <Link to="/jobs" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="flex flex-col items-center">
              <svg
                className="w-10 h-10"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.75432 0.819537C7.59742 0.726821 7.4025 0.726821 7.24559 0.819537L1.74559 4.06954C1.59336 4.15949 1.49996 4.32317 1.49996 4.5C1.49996 4.67683 1.59336 4.84051 1.74559 4.93046L7.24559 8.18046C7.4025 8.27318 7.59742 8.27318 7.75432 8.18046L13.2543 4.93046C13.4066 4.84051 13.5 4.67683 13.5 4.5C13.5 4.32317 13.4066 4.15949 13.2543 4.06954L7.75432 0.819537ZM7.49996 7.16923L2.9828 4.5L7.49996 1.83077L12.0171 4.5L7.49996 7.16923ZM1.5695 7.49564C1.70998 7.2579 2.01659 7.17906 2.25432 7.31954L7.49996 10.4192L12.7456 7.31954C12.9833 7.17906 13.2899 7.2579 13.4304 7.49564C13.5709 7.73337 13.4921 8.03998 13.2543 8.18046L7.75432 11.4305C7.59742 11.5232 7.4025 11.5232 7.24559 11.4305L1.74559 8.18046C1.50786 8.03998 1.42901 7.73337 1.5695 7.49564ZM1.56949 10.4956C1.70998 10.2579 2.01658 10.1791 2.25432 10.3195L7.49996 13.4192L12.7456 10.3195C12.9833 10.1791 13.2899 10.2579 13.4304 10.4956C13.5709 10.7334 13.4921 11.04 13.2543 11.1805L7.75432 14.4305C7.59742 14.5232 7.4025 14.5232 7.24559 14.4305L1.74559 11.1805C1.50785 11.04 1.42901 10.7334 1.56949 10.4956Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p className="hidden md:block font-poppins text-[14px] font-medium">
                Jobs
              </p>
            </div>
          </Link>
        </div>

        {/* user dropdown */}
        {user ? (
          <UserAvatar
            showDropdown={showDropdown}
            dropdownRef={userDropdownRef}
            setShowDropdown={setShowDropdown}
          />
        ) : (
          <AuthenticationLinks />
        )}
      </div>
    </React.Fragment>
  );
};

export default Navbar;
