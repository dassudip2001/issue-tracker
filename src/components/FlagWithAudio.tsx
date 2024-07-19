"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function FlagWithAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showPlayButton, setShowPlayButton] = useState<boolean>(false);
  const [showFlag, setShowFlag] = useState<boolean>(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      } else {
        if (audioRef.current) {
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
            setShowPlayButton(true);
          });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Play audio when the component is mounted if the page is visible
    if (!document.hidden && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        setShowPlayButton(true); // Show play button if auto-play fails
      });
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handlePlayButtonClick = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowFlag(true);
          setShowPlayButton(false);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    }
  };
  return (
    <div className="flex justify-center align-middle max-h-full">
      <audio ref={audioRef} src="audio.mp3" loop />
      {showFlag && (
        <Image src="/flag.gif" alt="Flag" width={100} height={100} />
      )}
      {showPlayButton && (
        <Button onClick={handlePlayButtonClick}>Click to Start</Button>
      )}
    </div>
  );
}
