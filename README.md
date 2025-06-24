# 🏠 RTHM – Real-Time Home Monitoring

**RTHM** este o platformă inteligentă de monitorizare a locuinței, construită cu [Next.js](https://nextjs.org/), care îți oferă controlul complet al mediului din casă, în timp real.

> Întreținerea unei locuințe nu trebuie să fie complicată. **RTHM** simplifică totul — de la monitorizarea temperaturii și a umidității, până la controlul dispozitivelor conectate. Creează o locuință mai inteligentă, mai sigură și mai eficientă energetic — direct dintr-o interfață modernă, intuitivă și accesibilă de pe orice dispozitiv.

---

## 🚀 Caracteristici principale

- 📡 Afișarea în timp real a valorilor senzorilor: temperatură, umiditate, presiune, gaz, lumină ambientală
- 💡 Control LED RGB prin API REST (sincronizare cu ESP32)
- 🔧 Integrare ușoară cu un microcontroller ESP32
- 📊 Grafică intuitivă pentru urmărirea valorilor senzorilor
- 🔐 Interfață prietenoasă, responsivă, cu optimizare automată a fonturilor și performanței

---

## 🛠️ Tehnologii utilizate

- [Next.js](https://nextjs.org/) – framework React pentru aplicații performante
- [TypeScript](https://www.typescriptlang.org/) – siguranță la tipuri și dezvoltare robustă
- [Tailwind CSS](https://tailwindcss.com/) – stilizare modernă și rapidă
- [Chart.js](https://www.chartjs.org/) – pentru vizualizarea datelor
- [Axios](https://axios-http.com/) – pentru consumarea API-urilor de la ESP32

---

## 📦 Instalare locală

1. Clonează repository-ul:

```bash
git clone https://github.com/edwardlesan/rthm.git
cd rthm
npm install
# sau
yarn install
├── app/
│   └── page.tsx          # Pagina principală
├── components/           # Componente UI reutilizabile
├── lib/                  # Funcții pentru interacțiune cu API ESP32
├── public/               # Imagini, favicon
├── styles/               # Fișiere CSS globale
└── README.md             # Documentația proiectului
