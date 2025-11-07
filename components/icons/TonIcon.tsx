import React from 'react';

export const TonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L6 7v10l6 5 6-5V7l-6-5z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12l-6-2.5v5L12 17l6-2.5v-5L12 12z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22V12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);