export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SIDE - Only visible on larger screens */}
      <div className="hidden lg:flex bg-gradient-to-br from-[#0a0f1a] via-[#111827] to-[#1e293b] text-white flex-col justify-center items-start p-8 md:p-12 lg:p-16 space-y-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">RTHM</h1>
          <h2 className="text-lg md:text-xl mt-2 text-gray-300">
            Real-Time House Monitoring
          </h2>
        </div>

        <div>
          <p className="text-base md:text-lg font-medium">👋 Bine ai venit!</p>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-400">
            Întreținerea unei locuințe nu trebuie să fie complicată. RTHM
            simplifică totul — de la monitorizarea temperaturii și a umidității,
            până la controlul dispozitivelor din casă. Creează o locuință mai
            inteligentă, mai sigură și mai eficientă energetic, direct dintr-o
            platformă prietenoasă și intuitivă.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Takes full width on mobile */}
      <div className="flex items-center justify-center bg-sidebar p-4 sm:p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
