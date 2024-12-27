import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from '@components/command';
import { menuItems } from '@constant/condition/general';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <Command className="bg-primary rounded-none py-2 px-6">
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
          {menuItems.map((item, index) => (
            <CommandItem key={index} className="my-4">
              <item.icon className="mr-[32px] h-6 w-6" />
              <Link href={item.link}>{item.label}</Link>
            </CommandItem>
          ))}
      </CommandList>
    </Command>
  );
};

export default Sidebar;
