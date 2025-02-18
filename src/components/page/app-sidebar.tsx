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
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronDown,
} from "lucide-react";

// メニュー項目の型定義
interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
  children?: MenuItem[];
}

// サンプルのメニュー項目（複数階層の子要素も含む）
const items: MenuItem[] = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
    children: [
      {
        title: "Daily",
        url: "#",
        icon: Calendar,
      },
      {
        title: "Weekly",
        url: "#",
        icon: Calendar,
        children: [
          {
            title: "Sub Weekly 1",
            url: "#",
            icon: Calendar,
          },
          {
            title: "Sub Weekly 2",
            url: "#",
            icon: Calendar,
          },
        ],
      },
    ],
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    children: [
      {
        title: "Profile",
        url: "#",
        icon: Settings,
      },
      {
        title: "Account",
        url: "#",
        icon: Settings,
      },
    ],
  },
];

// 再帰的にメニュー項目をレンダリングするコンポーネント
function MenuItemComponent({ item }: { item: MenuItem }) {
  if (item.children && item.children.length > 0) {
    return (
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger asChild>
          <SidebarMenuSubItem>
            <SidebarMenuButton className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <item.icon />
                <span>{item.title}</span>
              </div>
              <ChevronDown className="transition-transform duration-200" />
            </SidebarMenuButton>
          </SidebarMenuSubItem>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="ml-4">
            {item.children.map((child: MenuItem) => (
              <MenuItemComponent key={child.title} item={child} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    );
  // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    return (
      <SidebarMenuItem key={item.title}>
        <a href={item.url} className="flex items-center space-x-2">
          <item.icon />
          <span>{item.title}</span>
        </a>
      </SidebarMenuItem>
    );
  }
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item: MenuItem) => (
                <MenuItemComponent key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
