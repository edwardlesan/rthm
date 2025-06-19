"use client";

import { Home, Cpu, Logs, Earth, Settings, CircleHelp } from "lucide-react";

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
    id: "home",
    title: "Acasă",
    url: "/",
    icon: Home,
  },
  {
    id: "devices",
    title: "Dispozitive",
    url: "/devices",
    icon: Cpu,
  },
  {
    id: "environment",
    title: "Mediu",
    url: "/environment",
    icon: Earth,
  },
  {
    id: "logs",
    title: "Jurnal / Istoric",
    url: "/logs",
    icon: Logs,
  },
];

const userItems = [
  {
    id: "help",
    title: "Ajutor",
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
            RTHM 🏢
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-6">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size="default"
                    isActive={pathname === item.url}
                    className="hover:bg-transparent hover:text-cyan-400"
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
                className="hover:bg-transparent hover:text-cyan-400"
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
