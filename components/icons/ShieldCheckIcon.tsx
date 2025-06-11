
import React from 'react';

export const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2m10-14a11.042 11.042 0 00-8.594 4.097M12 3a11.042 11.042 0 018.594 4.097m0 0L21 12m-9-9l-9 9" />
     {/* Fallback path for Shield Check, simpler version or can use full Heroicon path */}
     {/* Using Heroicons UserCheckIcon for simplicity as it contains a check, or a full ShieldCheck path */}
     {/* Corrected Heroicons ShieldCheck path */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622A11.99 11.99 0 0018.402 6a11.959 11.959 0 01-5.404-2.786z" />
  </svg>
);