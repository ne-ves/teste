
import React from 'react';

interface ActionCardProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  colorScheme?: 'default' | 'highlight'; // default (blue), highlight (red/jornada-primary)
}

const ActionCard: React.FC<ActionCardProps> = ({ title, icon, onClick, colorScheme = 'default' }) => {
  const baseClasses = "flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg shadow-lg text-white aspect-square transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  let colorClasses = "";
  if (colorScheme === 'highlight') {
    // Using jornada-primary for the red/highlighted cards
    colorClasses = "bg-jornada-primary hover:bg-jornada-primary-dark focus:ring-jornada-primary-dark";
  } else {
    // Using a standard Tailwind blue for default cards, similar to the image
    colorClasses = "bg-sky-600 hover:bg-sky-700 focus:ring-sky-700";
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClasses}`}
      aria-label={title}
    >
      <div className="mb-2 sm:mb-3 text-center flex justify-center items-center h-12 w-12 sm:h-14 sm:w-14">
        {icon} 
      </div>
      <span className="text-center text-xs sm:text-sm font-medium mt-1 sm:mt-2 leading-tight">
        {title}
      </span>
    </button>
  );
};

export default ActionCard;
