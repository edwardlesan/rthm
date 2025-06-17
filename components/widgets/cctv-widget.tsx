"use client";

import { useEffect, useRef, useState } from "react";
import { Video, VideoOff } from "lucide-react";

export function CCTVWidget() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        (
          videoRef.current as HTMLVideoElement & { srcObject: MediaStream }
        ).srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
    setIsCameraOn(!isCameraOn);
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="w-full pt-8 relative">
      {isCameraOn ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded-2xl border-2 border-white w-full object-cover h-80"
        />
      ) : (
        <div className="rounded-2xl border-2 border-white w-full h-80 bg-[#555555]" />
      )}
      <div className="absolute top-12 left-4 bg-black border border-black border-opacity-30 bg-opacity-50 rounded-xl h-6 p-4 flex items-center justify-center gap-2">
        <div
          className={`rounded-full w-3 h-3 ${
            isCameraOn ? "bg-red-600" : "bg-gray-600"
          }`}
        />
        <p className="text-sm font-medium text-white">Live</p>
      </div>
      <div
        className="cursor-pointer rounded-full w-8 h-8 bg-black border border-black border-opacity-30 flex items-center bg-opacity-50 justify-center absolute top-12 right-4"
        onClick={toggleCamera}
      >
        {isCameraOn ? (
          <VideoOff className="w-5 h-5 text-white" />
        ) : (
          <Video className="w-5 h-5 text-white" />
        )}
      </div>
    </div>
  );
}
