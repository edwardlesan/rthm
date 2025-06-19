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
      stream.getTracks().forEach((track) => track.stop());
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
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/20 shadow-md">
      {isCameraOn ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover bg-black"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
          <VideoOff className="text-white/30 w-12 h-12" />
        </div>
      )}

      {/* Live Indicator */}
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center gap-2">
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            isCameraOn ? "bg-red-500 animate-pulse" : "bg-gray-400"
          }`}
        />
        <span className="text-white text-sm font-medium">Live</span>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleCamera}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition"
      >
        {isCameraOn ? (
          <VideoOff className="w-5 h-5 text-white" />
        ) : (
          <Video className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
}
