"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Mock } from "@/features/_search/_mock/mock-data";
import { ChevronDown, Folder, Text } from "lucide-react";

// JSONサンプルに合わせた型定義
interface MenuItem {
  tag: string;
  // attr はオブジェクトとして定義
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  attr: Record<string, any>;
  // children は MenuItem または文字列の配列を許容する
  children?: Array<MenuItem | string>;
}

// Mockデータの children を MenuItem[] として扱う
const itemMock: MenuItem[] = Mock.law_full_text.children as MenuItem[];

/**
 * 指定された MenuItem の子要素を再帰的に走査し、
 * 各階層に応じたインデントを付与した文字列の配列を返す。
 */
export function getIndentedTexts(item: MenuItem, level = 0): string[] {
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
}: { item: MenuItem; level?: number }): React.ReactElement {
  // 特殊タグの場合、子要素を表示せず、親タグのみを表示する
  if (["TOC", "MainProvision", "SupplProvision"].includes(item.tag)) {
    return (
      <SidebarMenuItem>
        <span>{item.tag}</span>
      </SidebarMenuItem>
    );
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
            <span>{" ".repeat(level * 2) + child}</span>
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
                <Folder />
                <span>{item.tag}</span>
              </div>
              <ChevronDown className="transition-transform duration-200" />
            </SidebarMenuButton>
          </SidebarMenuSubItem>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="ml-4">
            {item.children.map((child, index) => {
              if (typeof child === "string") {
                return (
                  <SidebarMenuItem key={`${item.tag}-child-string-${index}`}>
                    <span>{" ".repeat((level + 1) * 2) + child}</span>
                  </SidebarMenuItem>
                );
                // biome-ignore lint/style/noUselessElse: <explanation>
              } else {
                return (
                  <MenuItemComponent
                    key={`${child.tag}-${index}`}
                    item={child}
                    level={level + 1}
                  />
                );
              }
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    );
  }
  // children がない場合は、tag を表示
  return (
    <SidebarMenuItem>
      <Text />
      <span>{item.tag}</span>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  // filteredItems: 特殊タグが出現したらそれ以降の項目を表示しない
  const filteredItems: MenuItem[] = [];
  for (const item of itemMock) {
    filteredItems.push(item);
    if (
      ["TOCLabel", "TOCChapter", "MainProvision", "SupplProvision"].includes(
        item.tag,
      )
    ) {
      break;
    }
  }

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item, index) => (
                <MenuItemComponent
                  key={`${item.tag}-${index}`}
                  item={item}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
