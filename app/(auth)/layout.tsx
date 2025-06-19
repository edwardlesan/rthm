export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="bg-gradient-to-br from-[#0a0f1a] via-[#111827] to-[#1e293b] text-white flex flex-col justify-center items-start p-10 md:p-16 space-y-6">
        <div>
          <h1 className="text-5xl font-bold tracking-wide">RTHM</h1>
          <h2 className="text-xl mt-2 text-gray-300">
            Real-Time House Monitoring
          </h2>
        </div>

        <div>
          <p className="text-lg font-medium">👋 Bine ai venit!</p>
          <p className="mt-4 text-gray-400">
            Întreținerea unei locuințe nu trebuie să fie complicată. RTHM
            simplifică totul — de la monitorizarea temperaturii și a umidității,
            până la controlul dispozitivelor din casă. Creează o locuință mai
            inteligentă, mai sigură și mai eficientă energetic, direct dintr-o
            platformă prietenoasă și intuitivă.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-sidebar p-6">
        {children}
      </div>
    </div>
  );
}
