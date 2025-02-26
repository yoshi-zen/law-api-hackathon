import { SidebarMenuItem } from "@/components/ui/sidebar";
import type { FullText } from "@/features/_search/_types/_common/law-data-response";
import { Folder, Text } from "lucide-react";
import Link from "next/link";
import { MenuItemComponent } from "..";
import { CollapsibleTab } from "../collapsible-tab";

type Props = {
  item: FullText;
  route: URLSearchParams;
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
  MainProvision: function MainProvision(props: Props) {
    return (
      <>
        <h3 className="py-1 text-xs font-bold">本則</h3>
        {props.item?.children?.map((child, index) => {
          if (typeof child === "string") {
            return (
              <SidebarMenuItem key={`${props.item.tag}-child-string-${index}`}>
                <span className="text-xs">{child}</span>
              </SidebarMenuItem>
            );
          }
          return (
            <MenuItemComponent
              key={`${child.tag}-${index}`}
              item={child}
              route={props.route}
            />
          );
        }) ?? ""}
      </>
    );
  },

  // SupplProvision: function SupplProvision(props: Props) {
  //   return (
  //     <>
  //       <h3 className="flex items-center gap-2 py-1 text-xs font-bold">
  //         <span>附則</span>
  //         <span>{(props.item.attr["AmendLawNum"] as string) ?? ""}</span>
  //       </h3>
  //       {props.item?.children?.map((child, index) => {
  //         if (typeof child === "string") {
  //           return (
  //             <SidebarMenuItem key={`${props.item.tag}-child-string-${index}`}>
  //               <span className="text-xs">{child}</span>
  //             </SidebarMenuItem>
  //           );
  //         }
  //         if (child.tag === "SupplProvisionLabel") {
  //           return null;
  //         }
  //         return (
  //           <MenuItemComponent
  //             key={`${child.tag}-${index}`}
  //             item={child}
  //             route={props.route}
  //           />
  //         );
  //       }) ?? ""}
  //     </>
  //   );
  // },
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
              route={props.route}
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
              route={props.route}
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
              route={props.route}
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
              route={props.route}
            />
          );
        })}
      </CollapsibleTab>
    );
  },

  Article: function Article(props: Props) {
    const params = new URLSearchParams({
      elm: `Article_${
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        props.item.attr["Num"]
      }`,
    });
    // console.log(params.toString());
    return (
      <SidebarMenuItem className="grid grid-cols-[10px_1fr] items-center gap-x-1 py-0.5 pl-2">
        <Text size={10} />
        <Link
          href={`/?${params.toString()}`}
          className="text-2xs leading-4"
        >
          <span>{getChildSpecificTag("ArticleTitle", props.item)}</span>
          <span>{getChildSpecificTag("ArticleCaption", props.item)}</span>
        </Link>
      </SidebarMenuItem>
    );
  },
};
