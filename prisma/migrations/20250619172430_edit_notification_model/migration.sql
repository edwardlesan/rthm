-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "sensorDataId" INTEGER;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_sensorDataId_fkey" FOREIGN KEY ("sensorDataId") REFERENCES "SensorData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
