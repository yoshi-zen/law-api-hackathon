import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "components/ui/sidebar";
import type { FullText } from "features/_search/_types/_common/law-data-response";
import { ChevronDown, Folder } from "lucide-react";
import type { FC } from "react";

type Props = {
  item: FullText;
};
export const CollapsibleTab: FC = () => {
  return (
    <Collapsible defaultOpen={false}>
      <CollapsibleTrigger asChild>
        <SidebarMenuSubItem>
          <SidebarMenuButton className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Folder size={14} />
              <span className="text-xs">
                {
                  item.children?.find((i) => i.tag === "ChapterTitle")
                    ?.children[0]
                }
              </span>
            </div>
            <ChevronDown className="transition-transform duration-200" />
          </SidebarMenuButton>
        </SidebarMenuSubItem>
      </CollapsibleTrigger>
      <CollapsibleContent className="">
        <SidebarMenuSub className="">
          {item.children?.map((child, index) => {
            if (typeof child === "string") {
              return (
                <SidebarMenuItem key={`${item.tag}-child-string-${index}`}>
                  <span className="text-xs">{child}</span>
                </SidebarMenuItem>
              );
            }
            return (
              <MenuItemComponent
                key={`${child.tag}-${index}`}
                item={child}
                level={level + 1}
              />
            );
          })}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
};
