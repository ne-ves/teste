
import React from 'react';
import { UserCircleIcon } from './icons/UserCircleIcon'; // Changed from UsersIcon

interface InfoCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode; 
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 rounded-lg shadow-lg flex justify-between items-center">
      <div className="flex-grow">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p> {/* Changed text-jornada-primary to text-gray-900 */}
        <p className="text-xs text-gray-500 mt-1.5">{subtitle}</p>
      </div>
      <div className="text-jornada-primary ml-4 flex flex-col items-center text-center">
        {/* Use UserCircleIcon by default if a generic user icon is expected,
            or allow the icon prop to override for more specific use cases.
            For the Welcome card, the icon is passed from DashboardPage. */}
        {icon}
      </div>
    </div>
  );
};

export default InfoCard;
