// app/api/sensor-data/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from "zod";

const sensorSchema = z.object({
  temperature_C: z.number().optional(),
  humidity_percent: z.number().optional(),
  pressure_hPa: z.number().optional(),
  altitude_m: z.number().optional(),
  luminosity_raw: z.number(),
  luminosity_percent: z.number(),
  mq8_raw: z.number(),
  mq8_approx_ppm: z.number(),
});

function detectAnomalies(
  entry: z.infer<typeof sensorSchema>
): { type: string; message: string; value: number }[] {
  const messages: { type: string; message: string; value: number }[] = [];

  if (
    typeof entry.temperature_C === "number" &&
    (entry.temperature_C < 0 || entry.temperature_C > 50)
  ) {
    messages.push({
      type: "temperature",
      message: `Anomalie detectată! Temperatură: ${Math.round(
        entry.temperature_C
      )}°C`,
      value: entry.temperature_C,
    });
  }

  if (
    typeof entry.humidity_percent === "number" &&
    (entry.humidity_percent < 20 || entry.humidity_percent > 80)
  ) {
    messages.push({
      type: "humidity",
      message: `Anomalie detectată! Umiditate: ${Math.round(
        entry.humidity_percent
      )}%`,
      value: entry.humidity_percent,
    });
  }

  if (
    typeof entry.pressure_hPa === "number" &&
    (entry.pressure_hPa < 950 || entry.pressure_hPa > 1050)
  ) {
    messages.push({
      type: "pressure",
      message: `Anomalie detectată! Presiune: ${Math.round(
        entry.pressure_hPa
      )} hPa`,
      value: entry.pressure_hPa,
    });
  }

  if (entry.luminosity_percent > 90) {
    messages.push({
      type: "luminosity",
      message: `Anomalie detectată! Luminozitate: ${Math.round(
        entry.luminosity_percent
      )}%`,
      value: entry.luminosity_percent,
    });
  }

  if (entry.mq8_approx_ppm > 200) {
    messages.push({
      type: "gas",
      message: `Anomalie detectată! Gaz detectat: ${Math.round(
        entry.mq8_approx_ppm
      )} ppm`,
      value: entry.mq8_approx_ppm,
    });
  }

  if (
    typeof entry.altitude_m === "number" &&
    (entry.altitude_m < -10 || entry.altitude_m > 2000)
  ) {
    messages.push({
      type: "altitude",
      message: `Anomalie detectată! Altitudine: ${Math.round(
        entry.altitude_m
      )} m`,
      value: entry.altitude_m,
    });
  }

  return messages;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = sensorSchema.parse(body);

    const sensorData = await db.sensorData.create({
      data: parsed,
    });

    const anomalies = detectAnomalies(parsed);
    if (anomalies.length > 0) {
      await db.notification.createMany({
        data: anomalies.map((anomaly) => ({
          message: anomaly.message,
          type: anomaly.type,
          value: anomaly.value,
          sensorDataId: sensorData.id,
          isSeen: false,
        })),
      });
    }

    return NextResponse.json(
      { message: "Data de la senzori salvată", anomalies: anomalies.length },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 422 });
    }

    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const limitParam = url.searchParams.get("limit");
    const pageParam = url.searchParams.get("page");
    const orderParam = url.searchParams.get("order");

    const limit = limitParam ? parseInt(limitParam, 10) : 50;
    const page = pageParam ? Math.max(parseInt(pageParam, 10), 1) : 1;
    const order = orderParam === "asc" ? "asc" : "desc";

    const offset = (page - 1) * limit;

    const data = await db.sensorData.findMany({
      orderBy: { createdAt: order },
      take: limit,
      skip: offset,
      include: {
        notifications: {
          orderBy: { createdAt: "desc" },
          take: 5, // Include last 5 notifications for each sensor data
        },
      },
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
