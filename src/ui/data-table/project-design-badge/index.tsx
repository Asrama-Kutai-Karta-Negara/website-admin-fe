import { statusItems } from '@constant/condition/status';
import * as Tooltip from '@radix-ui/react-tooltip';

const ProjectDesignBadge = ({ name, width = null }: { name: string, width: string | null; }) => {
  const statusItem = statusItems.find(item => item.key === name) || statusItems.find(item => item.key === 'not-found');

  return (
    <div className={`flex flex-row items-center gap-3 py-1 cursor-pointer group ${width ? `w-${width}` : ''}`}>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div 
              className={`flex items-center justify-center px-${statusItem?.paddingX} py-3 rounded ${statusItem?.colorBg} ${statusItem?.colorBgDark != null ?`dark:${statusItem?.colorBgDark}` : ''} ${statusItem?.colorText} ${statusItem?.colorTextDark != null ?`dark:${statusItem?.colorTextDark}` : ''} text-xs overflow-hidden whitespace-nowrap truncate`}
            >
              {statusItem?.label}
            </div>
          </Tooltip.Trigger>
          {statusItem?.tooltipContent &&
            <Tooltip.Content className="bg-black text-white p-2 rounded-md">
              {statusItem.tooltipContent || `${statusItem.label} is currently in progress.`}
            </Tooltip.Content>
          }
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};

export default ProjectDesignBadge;