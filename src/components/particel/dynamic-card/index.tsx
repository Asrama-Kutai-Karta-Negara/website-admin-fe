import React from "react";
import { DynamicCardProps } from "@interfaces/interface-items";

const DynamicCard: React.FC<DynamicCardProps> = ({ header, body }) => {
  return (
    <div className="flex mt-4">
      <div
        className="w-full max-w-screen md:max-w-md lg:max-w-lg xl:max-w-2xl p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      >
        {header && (
          <div className="border-b">
            {header}
          </div>
        )}
        {body}
      </div>
    </div>
  );
};

export default DynamicCard;
