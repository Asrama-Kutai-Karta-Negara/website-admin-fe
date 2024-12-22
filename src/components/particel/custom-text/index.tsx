import { cn } from "@lib/utils";

const CustomText = ({ 
  text = '-', 
  textSize = '',
  textWeight = '',
  classNameText = '',
  outline = false,
  ...props
}) => {
  const textClassName = `
  ${outline ? 'outline-none' : ''} 
  ${textWeight ? `font-${textWeight}` : ''} 
  text-${textSize} 
  `;

  return <span className={cn(textClassName, classNameText)} {...props}>{text}</span>;
};

export default CustomText;