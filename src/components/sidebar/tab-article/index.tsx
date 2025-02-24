import { SidebarMenuItem } from "@/components/ui/sidebar";
import type { FullText } from "@/features/_search/_types/_common/law-data-response";
import { Folder, Text } from "lucide-react";
import { MenuItemComponent } from "..";
import { CollapsibleTab } from "../collapsible-tab";

type Props = {
  item: FullText;
  level: number;
};

/**
 * 特定のタグの子要素を取得する
 * @param tag タグ名（childrenには単一のstring列しか来ないことを前提）
 * @returns タグの要素
 */
const getChildSpecificTag = (tag: string, item: FullText) => {
  return (
    (item.children
      ?.filter((child) => typeof child !== "string")
      ?.find((i) => i.tag === tag)?.children?.[0] as string) || ""
  );
};

export const SidebarTabSet = {
  Chapter: function Chapter(props: Props) {
    return (
      <CollapsibleTab
        icon={<Folder size={10} />}
        title={
          (props.item.children
            ?.filter((i) => typeof i !== "string")
            ?.find((i) => i.tag === "ChapterTitle")?.children?.[0] as string) ??
          ""
        }
      >
        {props.item.children?.map((child, index) => {
          if (typeof child === "string") {
            return (
              <SidebarMenuItem key={`${props.item.tag}-child-string-${index}`}>
                <span className="text-xs leading-4">{child}</span>
              </SidebarMenuItem>
            );
          }
          if (child.tag === "ChapterTitle") {
            return;
          }
          return (
            <MenuItemComponent
              key={`${child.tag}-${index}`}
              item={child}
              level={props.level + 1}
            />
          );
        })}
      </CollapsibleTab>
    );
  },

  Section: function Section(props: Props) {
    return (
      <CollapsibleTab
        icon={<Folder size={10} />}
        title={
          (props.item.children
            ?.filter((i) => typeof i !== "string")
            ?.find((i) => i.tag === "SectionTitle")?.children?.[0] as string) ??
          ""
        }
      >
        {props.item.children?.map((child, index) => {
          if (typeof child === "string") {
            return (
              <SidebarMenuItem key={`${props.item.tag}-child-string-${index}`}>
                <span className="text-xs leading-4">{child}</span>
              </SidebarMenuItem>
            );
          }
          if (child.tag === "SectionTitle") {
            return;
          }
          return (
            <MenuItemComponent
              key={`${child.tag}-${index}`}
              item={child}
              level={props.level + 1}
            />
          );
        })}
      </CollapsibleTab>
    );
  },

  Subsection: function Subsection(props: Props) {
    return (
      <CollapsibleTab
        icon={<Folder size={10} />}
        title={
          (props.item.children
            ?.filter((i) => typeof i !== "string")
            ?.find((i) => i.tag === "SubsectionTitle")
            ?.children?.[0] as string) ?? ""
        }
      >
        {props.item.children?.map((child, index) => {
          if (typeof child === "string") {
            return (
              <SidebarMenuItem key={`${props.item.tag}-child-string-${index}`}>
                <span className="text-xs leading-4">{child}</span>
              </SidebarMenuItem>
            );
          }
          if (child.tag === "SubsectionTitle") {
            return;
          }
          return (
            <MenuItemComponent
              key={`${child.tag}-${index}`}
              item={child}
              level={props.level + 1}
            />
          );
        })}
      </CollapsibleTab>
    );
  },

  Division: function Division(props: Props) {
    return (
      <CollapsibleTab
        icon={<Folder size={10} />}
        title={
          (props.item.children
            ?.filter((i) => typeof i !== "string")
            ?.find((i) => i.tag === "DivisionTitle")
            ?.children?.[0] as string) ?? ""
        }
      >
        {props.item.children?.map((child, index) => {
          if (typeof child === "string") {
            return (
              <SidebarMenuItem key={`${props.item.tag}-child-string-${index}`}>
                <span className="text-xs leading-4">{child}</span>
              </SidebarMenuItem>
            );
          }
          if (child.tag === "DivisionTitle") {
            return;
          }
          return (
            <MenuItemComponent
              key={`${child.tag}-${index}`}
              item={child}
              level={props.level + 1}
            />
          );
        })}
      </CollapsibleTab>
    );
  },

  Article: function Article(props: Props) {
    // - ArticleTitle
    // - ArticleCaption
    // - Paragraph
    // - SupplNote

    return (
      <SidebarMenuItem className="grid grid-cols-[10px_1fr] items-center gap-x-1 pl-2">
        <Text size={10} />
        <p className="text-2xs leading-4">
          <span>{getChildSpecificTag("ArticleTitle", props.item)}</span>
          <span>{getChildSpecificTag("ArticleCaption", props.item)}</span>
        </p>
      </SidebarMenuItem>
    );
  },
};
