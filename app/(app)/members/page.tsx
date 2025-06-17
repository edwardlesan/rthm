import { IUser } from "@/lib/models";
import { MemberCard } from "../../../components/ui/member-card";

const mockUsers: IUser[] = [
  {
    name: "Dad",
    email: "dad.johnson@example.com",
    image: "https://cdn-icons-png.flaticon.com/512/145/145974.png",
    access: true,
  },
  {
    name: "Mom",
    email: "mom.johnson@example.com",
    image: "https://cdn-icons-png.flaticon.com/512/168/168720.png",
    access: true,
  },
  {
    name: "Charlie",
    email: "charlie.johnson@example.com",
    image: "https://cdn-icons-png.flaticon.com/512/168/168732.png",
    access: false,
  },
  {
    name: "Diana",
    email: "diana.johnson@example.com",
    image: "https://cdn-icons-png.flaticon.com/512/168/168730.png",
    access: false,
  },
];

export default async function Members() {
  return (
    <main className="py-4 flex flex-col gap-4">
      <p className="text-3xl font-medium">Members</p>
      <div className="flex gap-10">
        {mockUsers.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
    </main>
  );
}
