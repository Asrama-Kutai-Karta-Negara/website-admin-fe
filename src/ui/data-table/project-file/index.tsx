import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Arrow } from "@radix-ui/react-tooltip";
import CustomText from "@components/particel/custom-text";

const ProjectFile = ({ name, file }: { name: string; file: string }) => {
  const avatarFallback = name
    .split(" ")
    .map((n) => n[0])
    .join(" ")
    .toUpperCase();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <div className="flex items-center gap-2">
            <Avatar className="w-7 h-7 rounded-md">
              {file ? (
                <AvatarImage src={`data:image/png;base64,${file}`} />
              ) : (
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              )}
            </Avatar>
            <CustomText text={name} textSize="sm" />
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

export default ProjectFile;