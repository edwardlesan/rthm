import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { getUser } from "@/lib/actions";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full h-screen overflow-hidden">
        <Navbar user={user}>
          <SidebarTrigger />
        </Navbar>
        <main className="w-full flex-1 overflow-hidden p-4 rounded-tl-lg">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
