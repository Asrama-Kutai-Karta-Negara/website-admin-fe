import { cn } from "@lib/utils";

const CustomText = ({ 
  text = '-', 
  textSize = '',
  textWeight = '',
  textColor = '',
  classNameText = '',
  background = '',
  borderSize = '',
  borderColor = '',
  outline = false,
  ...props
}) => {
  const textClassName = `
  ${outline ? 'outline-none' : ''} 
  ${textWeight ? `font-${textWeight}` : ''} 
  text-${textSize} 
  ${textColor ? `text-${textColor}` : ''} 
  ${background ? `bg-${background}` : ''} 
  ${borderSize ? `border-[${borderSize}]` : ''}
  ${borderColor ? `border-${borderColor}` : ''}
  `;

  return <span className={cn(textClassName, classNameText)} {...props}>{text}</span>;
};

export default CustomText;