import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12,2A10,10,0,0,0,2,12a10,10,0,0,0,10,10,10,10,0,0,0,10-10A10,10,0,0,0,12,2Zm5.5,12.5a3.5,3.5,0,0,1-7,0v-1a.5.5,0,0,1,1,0v1a2.5,2.5,0,0,0,5,0v-1a.5.5,0,0,1,1,0Z M9.5,10.5a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,9.5,10.5Zm6,0a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,15.5,10.5Z" />
  </svg>
);