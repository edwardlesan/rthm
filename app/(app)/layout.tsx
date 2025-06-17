import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Navbar } from "@/components/ui/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-4 py-2">
        <Navbar user={null}>
          <SidebarTrigger />
        </Navbar>
        {children}
      </main>
    </SidebarProvider>
  );
}
