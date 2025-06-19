import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProfileForm from "./components/profile-form";
import { UserCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="h-full w-full">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-sm shadow-lg border-none rounded-2xl">
        <CardHeader>
          <h2 className="text-3xl font-semibold text-white flex items-center gap-2">
            <UserCircle className="w-7 h-7 text-cyan-400" />
            Profilul meu
          </h2>
          <p className="text-white/60 text-sm">
            Aici îți poți actualiza informațiile personale.
          </p>
        </CardHeader>

        <CardContent className="pt-4">
          <ProfileForm />
        </CardContent>
      </Card>
    </main>
  );
}
