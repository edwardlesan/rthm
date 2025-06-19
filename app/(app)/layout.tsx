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
      <main className="w-full p-4 h-dvh flex flex-col">
        <Navbar user={user}>
          <SidebarTrigger />
        </Navbar>
        <div className="flex-1 overflow-hidden">{children}</div>
      </main>
    </SidebarProvider>
  );
}
