import { cn } from "@lib/utils";
import CustomText from "../custom-text";

const DynamicText = ({ 
  text = 'ASRAMA KUTAI KARTANEGARA', 
  subText = 'Kota Yogyakarta', 
  boldText = true, 
  boldSubText = false, 
  textSize = 'sm', 
  subTextSize = 'xs', 
  className = '', 
  subClassName = '' 
}) => {
  const textClassName = `block ${boldText ? 'font-bold' : 'font-normal'} `;
  const subTextClassName = `block ${boldSubText ? 'font-bold' : 'font-normal'} opacity-60`;

  return (
    <div>
      <CustomText text={text} textSize={textSize} classNameText={cn(textClassName, className)}  />
      <CustomText text={subText} textSize={subTextSize} classNameText={cn(subTextClassName, subClassName)}  />
    </div>
  );
};

export default DynamicText;