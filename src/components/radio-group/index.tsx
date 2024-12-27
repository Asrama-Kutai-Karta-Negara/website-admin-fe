import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { RadioButtonProps } from "@interfaces/interface-items";
import { cn } from "@/lib/utils";

const RadioGroupButton = React.forwardRef<HTMLDivElement, RadioButtonProps>(
  ({ radioButton, defaultValue, ariaLabel, onValueChange, className, ...props }, ref) => {
    return (
      <RadioGroup.Root
        ref={ref}
        className={cn("flex gap-2.5 space-x-4", className)}
        value={defaultValue}
        onValueChange={onValueChange}
        aria-label={ariaLabel} 
        {...props}
      >
        {radioButton.map((item) => (
          <div className="flex items-center" key={item.value}>
            <RadioGroup.Item
              className={cn(
                "w-6 h-6 cursor-pointer rounded-full border-2 bg-white dark:bg-gold outline-none",
                "focus:ring-2 focus:ring-offset-2 focus:ring-yellow dark:focus:ring-blonde"
              )}
              value={item.value}
              id={item.value}
            >
              <RadioGroup.Indicator
                className={cn(
                  "relative flex h-full w-full items-center justify-center",
                  "after:block after:h-[11px] after:w-[11px] after:rounded-full after:bg-yellow dark:after:bg-blonde"
                )}
              />
            </RadioGroup.Item>
            <label
              className="pl-2 text-sm leading-none"
              htmlFor={item.value}
            >
              {item.name}
            </label>
          </div>
        ))}
      </RadioGroup.Root>
    );
  }
);

RadioGroupButton.displayName = "RadioGroupButton";

export default RadioGroupButton;
