import { SensorHistoryWidget } from "@/components/widgets/sensor-history-widget";

export default async function LogsPage() {
  return (
    <main className="h-full flex flex-col">
      <h1 className="text-2xl font-bold text-white mb-6">
        Istoric Date Senzori
      </h1>
      <SensorHistoryWidget className="flex-1" />
    </main>
  );
}
