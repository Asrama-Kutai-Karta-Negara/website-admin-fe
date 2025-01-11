import CustomText from "@components/particel/custom-text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";

import { Arrow } from "@radix-ui/react-tooltip";

const ProjectTextTooltip= ({ name}: { name: string }) => {
  
  const shortenedName = `${name.substring(0, 20)}...`;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <div className="flex items-center gap-2">
            <CustomText text={shortenedName} textSize="sm" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-gray-900 text-base">
          <Arrow />
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProjectTextTooltip