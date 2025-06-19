-- CreateTable
CREATE TABLE "SensorData" (
    "id" SERIAL NOT NULL,
    "temperature_C" DOUBLE PRECISION,
    "humidity_percent" DOUBLE PRECISION,
    "pressure_hPa" DOUBLE PRECISION,
    "altitude_m" DOUBLE PRECISION,
    "luminosity_raw" INTEGER NOT NULL,
    "luminosity_percent" INTEGER NOT NULL,
    "mq8_raw" INTEGER NOT NULL,
    "mq8_approx_ppm" DOUBLE PRECISION NOT NULL,
    "led_status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SensorData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LedState" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LedState_pkey" PRIMARY KEY ("id")
);
