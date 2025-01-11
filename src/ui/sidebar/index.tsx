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
    <div className="mt-4 text-sm">
      <Command className="bg-primary rounded-none px-4 flex flex-col gap-2">
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {menuItems.map((item, index) => (
            <CommandItem key={index} className="my-4">
              <item.icon className="mr-[32px] h-6 w-6" />
              <Link href={item.link} className="hidden lg:block">{item.label}</Link>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  );
};

export default Sidebar;
