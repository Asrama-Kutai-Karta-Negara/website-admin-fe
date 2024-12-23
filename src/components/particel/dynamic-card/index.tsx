import React from "react";
import { DynamicCardProps } from "@interfaces/interface-items";

const DynamicCard: React.FC<DynamicCardProps> = ({ border = false, header, body }) => {
  return (
    <div className="flex mt-4 h-screen">
      <div
        className="w-full md:max-w-md lg:max-w-lg xl:max-w-4xl overflow-auto bg-primary text-foreground rounded-lg shadow-md hover:shadow-lg transition-all duration-300 scrollbar-thin"
      >
        {header && (
          <div className={`${border ? "border-b" : ""}`}>
            {header}
          </div>
        )}
        <div>{body}</div>
      </div>
    </div>
  );
};

export default DynamicCard;