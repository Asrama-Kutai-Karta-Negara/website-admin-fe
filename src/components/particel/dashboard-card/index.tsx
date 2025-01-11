import React from 'react';
import CircularChart from '../circular-chart';

interface DashboardCardProps {
  title: string;
  subtitle: string;
  value: number | string;
  isBar: boolean;
  total: number | string;
  detailLink: string;
  colorMain: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  subtitle, 
  isBar, 
  value, 
  total, 
  detailLink,
  colorMain
}) => {
  
  const numericValue = Number(value);
  const numericTotal = Number(total);
  
  const textColor = `text-[${colorMain}] dark:text-white`;
  return (
    <div className="flex flex-col bg-white p-6 rounded-lg shadow-md dark:bg-secondary">
      <h5 className="text-lg font-bold">{title}</h5>
      <div className='flex justify-between mt-2'>
        <div className='flex flex-col'>
          <p className="text-lg font-normal">{subtitle}</p>
          <span className={`text-xl ${textColor} font-bold`}>{value}</span>
        </div>
        {
          isBar && !isNaN(numericValue) && !isNaN(numericTotal) ? (
            <CircularChart value={numericValue} total={numericTotal} colorMain={colorMain}/>
          ) : null
        }
      </div>
      <a href={detailLink} className="block mt-4 text-blue-500 hover:underline">Detail</a>
    </div>
  );
};

export default DashboardCard;
