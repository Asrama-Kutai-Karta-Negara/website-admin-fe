import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Arrow } from "@radix-ui/react-tooltip";
import CustomText from "@components/particel/custom-text";
import { formatShortName } from "@utils/format";

const ProjectFile = ({ name, file }: { name: string; file: string | null }) => {
  const avatarFallback = name
    .split(" ")
    .map((n) => n[0])
    .join(" ")
    .toUpperCase();

  const shortenedName = formatShortName(name, 5, '.');
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <div className="flex items-center gap-2">
            <Avatar className="w-7 h-7 rounded-md">
              {file ? (
                <AvatarImage src={`http://localhost:8000${file}`} />
              ) : (
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              )}
            </Avatar>
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

export default ProjectFile;