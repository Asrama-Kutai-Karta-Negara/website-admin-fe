"use client";

import { items } from "@constant";
import { IItem } from "@interfaces/interface-items";
import { useState } from "react";
import TabItem from "./TabItem";

const TableTabs = () => {
  const [activeTab, setActiveTab] = useState<IItem["value"]>("all");
  return (
    <div className="flex flex-row items-center gap-5 px-5">
      {items.map((item) => (
        <TabItem
          key={item.index}
          item={item}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
};

export default TableTabs;