import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import type { FC, ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

export const CollapsibleTab: FC<Props> = (props: Props) => {
  const { title, icon, children } = props;
  return (
    <Collapsible defaultOpen={false}>
      <CollapsibleTrigger asChild>
        <SidebarMenuSubItem>
          <SidebarMenuButton className="flex h-fit items-center justify-between py-0.5">
            <div className="grid grid-cols-[10px_1fr] items-center space-x-2">
              {icon}
              <span className="text-2xs leading-3">{title}</span>
            </div>
            <ChevronDown className="transition-transform duration-200" />
          </SidebarMenuButton>
        </SidebarMenuSubItem>
      </CollapsibleTrigger>
      <CollapsibleContent className="">
        <SidebarMenuSub className="ml-2 mr-0 py-0 pl-1 pr-0">
          {children}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
};
