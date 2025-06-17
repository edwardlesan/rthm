"use client";

import { Home, Users, Video, Grip, Settings, CircleHelp } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

const mainItems = [
  {
    id: "",
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    id: "members",
    title: "Members",
    url: "/members",
    icon: Users,
  },
  {
    id: "rooms",
    title: "Rooms",
    url: "/rooms",
    icon: Grip,
  },
  {
    id: "cctv",
    title: "CCTV",
    url: "/cctv",
    icon: Video,
  },
];

const userItems = [
  {
    id: "settings",
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    id: "help",
    title: "Help",
    url: "/help",
    icon: CircleHelp,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const segment = pathname?.split("/")[1] || "";

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg mb-4">
            My Smart House
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-6">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size="default"
                    isActive={segment === item.id}
                    className="hover:bg-transparent hover:text-blue-500"
                  >
                    <a href={item.url}>
                      <div className="rounded-full size-8 bg-slate-600 flex items-center justify-center">
                        {item.icon && <item.icon className="size-4" />}
                      </div>

                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="p-2">
        <Separator className="bg-slate-600" />
      </div>

      <SidebarFooter>
        <SidebarMenu className="gap-6">
          {userItems.map((item) => (
            <SidebarMenuItem key={item.title} className="group">
              <SidebarMenuButton
                asChild
                size="default"
                isActive={segment === item.id}
                className="hover:bg-transparent hover:text-blue-500"
              >
                <a href={item.url}>
                  <div className="rounded-full size-8 bg-slate-600 flex items-center justify-center">
                    {item.icon && <item.icon className="size-4" />}
                  </div>

                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
