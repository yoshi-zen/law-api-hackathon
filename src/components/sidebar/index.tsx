"use client";

import type { FullText } from "@/features/_search/_types/_common/law-data-response";
import { specificLawAtom } from "@/jotai/atoms";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "components/ui/sidebar";
import { useAtomValue } from "jotai";
import { ChevronDown, Folder, Info, Text } from "lucide-react";
import type { FC, ReactNode } from "react";

/**
 * 指定された FullText の子要素を再帰的に走査し、
 * 各階層に応じたインデントを付与した文字列の配列を返す。
 */
export function getIndentedTexts(item: FullText, level = 0): string[] {
  const texts: string[] = [];
  if (item.children) {
    for (const child of item.children) {
      if (typeof child === "string") {
        texts.push(" ".repeat(level * 2) + child);
      } else {
        texts.push(...getIndentedTexts(child, level + 1));
      }
    }
  }
  return texts;
}

/**
 * 再帰的にメニュー項目をレンダリングするコンポーネント
 * @param level 再帰レベル（トップは 0）
 */
function MenuItemComponent({
  item,
  level = 0,
}: { item: FullText; level?: number }): ReactNode {
  // 特殊タグの場合、子要素を表示せず、親タグのみを表示する
  // if (["TOC", "MainProvision", "SupplProvision"].includes(item.tag)) {
  //   return (
  //     <SidebarMenuItem>
  //       <span className="text-xs">{item.tag}</span>
  //     </SidebarMenuItem>
  //   );
  // }
  switch (item.tag) {
    case "TOC":
      return (
        <>
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
          }) ?? ""}
        </>
      );
    case "MainProvision":
      return (
        <>
          <span className="text-xs font-bold">本則</span>
          {item?.children?.map((child, index) => {
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
          }) ?? ""}
        </>
      );
    case "SupplProvision":
      return (
        <>
          {/* <span className="text-xs font-bold">附則</span> */}
          {item?.children?.map((child, index) => {
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
          }) ?? ""}
        </>
      );

    case "Chapter":
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
            <SidebarMenuSub className="mr-0 pr-0">
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
    // case "Article":

    case "AppdxTable":
      return null;
  }

  // children が存在し、かつ全てが文字列の場合は、その文字列をインデント付きで各行表示
  if (
    item.children &&
    item.children.length > 0 &&
    item.children.every((child) => typeof child === "string")
  ) {
    return (
      <>
        {item.children.map((child, index) => (
          <SidebarMenuItem key={`${item.tag}-child-${index}`}>
            <span className="text-xs">{child}</span>
          </SidebarMenuItem>
        ))}
      </>
    );
  }
  // children がオブジェクトまたは混在している場合は、Collapsible を利用して再帰的にレンダリング
  if (item.children && item.children.length > 0) {
    return (
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger asChild>
          <SidebarMenuSubItem>
            <SidebarMenuButton className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Folder size={14} />
                <span className="text-xs">{item.tag}</span>
              </div>
              <ChevronDown className="transition-transform duration-200" />
            </SidebarMenuButton>
          </SidebarMenuSubItem>
        </CollapsibleTrigger>
        <CollapsibleContent className="">
          <SidebarMenuSub className="mr-0 pr-0">
            {item.children.map((child, index) => {
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
  }
  // children がない場合は、tag を表示
  return (
    <SidebarMenuItem className="flex items-center space-x-2">
      <Text size={14} />
      <span className="text-xs">{item.tag}</span>
    </SidebarMenuItem>
  );
}

export const AppSidebar: FC = () => {
  const specificLaw = useAtomValue(specificLawAtom);

  if (specificLaw === undefined) {
    return (
      <Sidebar collapsible="offcanvas">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>法令検索</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }
  const lawData = specificLaw.law_full_text.children;
  // console.log(lawData);

  console.log();

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup className="p-0 pb-10">
          <SidebarGroupLabel className="sticky top-0 z-50 mt-0 min-h-14 border-b border-solid border-b-gray-200 bg-white py-1">
            <div className="flex flex-col items-start">
              <h2>{specificLaw.law_info.law_id}</h2>
              <p className="grid w-full grid-cols-[1fr_auto] items-center gap-2 text-sm font-semibold text-gray-800">
                <span className="line-clamp-1 block w-full overflow-hidden text-ellipsis">
                  {specificLaw.revision_info.law_title}
                </span>
                <Info size={14} />
              </p>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="p-1">
            <SidebarMenu>
              {lawData[1].children.map((item, index) => {
                if (typeof item === "string") {
                  return (
                    <SidebarMenuItem key={`${item}-${String(index)}`}>
                      <span className="text-xs">{item}</span>
                    </SidebarMenuItem>
                  );
                }
                return (
                  <MenuItemComponent
                    key={`${item.tag}-${index}`}
                    item={item}
                  />
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
