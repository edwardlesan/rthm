import { MemberCard } from "@/components/ui/member-card";
import { getAllUsers } from "@/lib/actions";

export default async function MembersPage() {
  const users = await getAllUsers();

  return (
    <main className="py-4 flex flex-col gap-4">
      <p className="text-3xl font-medium">Membrii locuinței</p>
      <div className="flex gap-10 flex-wrap">
        {users.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
    </main>
  );
}
