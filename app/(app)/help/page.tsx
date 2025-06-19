import { Mail, Phone, Info, HelpCircle, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="rounded-lg min-h-full w-full flex items-center justify-center bg-sidebar px-6 py-12">
      <Card className="bg-white/10 backdrop-blur-sm shadow-lg border-none rounded-2xl max-w-3xl w-full">
        <CardContent className="p-8 text-white space-y-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-cyan-400" />
            Pagina de Ajutor
          </h1>

          {/* Info Box */}
          <div className="bg-white/10 border-l-4 border-cyan-400 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-cyan-300">
              <Info className="w-5 h-5" />
              Despre această aplicație
            </div>
            <p className="text-sm text-white/80">
              RTHM (Real-Time House Monitoring) este o aplicație inteligentă
              pentru controlul și monitorizarea mediului din locuința ta. Datele
              sunt procesate în siguranță, direct în cloud.
            </p>
          </div>

          {/* Ce poți face aici */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-cyan-300">
              Ce poți face aici?
            </h2>
            <ul className="list-disc pl-6 text-white/80 text-sm space-y-1">
              <li>
                Monitorizezi luminozitatea, temperatura și umiditatea în timp
                real.
              </li>
              <li>Primești sugestii despre confortul ambiental.</li>
              <li>Controlezi dispozitive smart (dacă sunt conectate).</li>
              <li>Accesezi istoricul și statistici utile.</li>
            </ul>
          </div>

          {/* Securitate */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              Securitate și Confidențialitate
            </h2>
            <p className="text-sm text-white/80">
              Datele tale sunt criptate și accesibile doar de către tine. Nu
              sunt partajate cu terți. Securitatea utilizatorului este o
              prioritate.
            </p>
          </div>

          {/* Contacte */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-cyan-300">
              Contacte de Ajutor
            </h2>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Mail className="w-4 h-4 text-cyan-300" />
              <a
                href="mailto:edwardsendrea1@gmail.com"
                className="hover:underline"
              >
                edwardsendrea1@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Phone className="w-4 h-4 text-cyan-300" />
              <a href="tel:+40752386315" className="hover:underline">
                +40 752 386 315
              </a>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-xs text-white/60 pt-4 border-t border-white/20">
            Pentru mai multe detalii, întrebări frecvente sau ghiduri video,
            accesează pagina oficială sau scrie-ne.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
