import { useEffect, useState, useRef } from "react";
const Luigi = () => {
  const [isFirstImage, setIsFirstImage] = useState(true);
  const [isAudioPresent, setIsAudioPresent] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      setIsFirstImage((prev) => !prev);
    }
  };

  const fetchAudio = async () => {
    try {
      const response = await fetch("http://localhost:8080/get-audio");

      const contentType = response.headers.get("content-type");

      if (contentType?.includes("audio/mpeg")) {
        console.log("Audio fetched");
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Clean up previous audio if exists
        if (audioRef.current) {
          audioRef.current.pause();
          URL.revokeObjectURL(audioRef.current.src);
        }

        // Create new audio element
        const audio = new Audio(url);
        audioRef.current = audio;

        // Auto-play and handle audio state
        audio
          .play()
          .then(() => {
            setIsAudioPresent(true);
            audio.onended = () => {
              setIsAudioPresent(false);
              URL.revokeObjectURL(url);
            };
          })
          .catch((error) => {
            console.error("Audio play failed:", error);
            setIsAudioPresent(false);
          });
      } else if (contentType?.includes("application/json")) {
        const errorData = await response.json();
        console.log(errorData.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      // Cleanup audio on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  useEffect(() => {
    let intervalId: number;

    if (!isAudioPresent) {
      intervalId = setInterval(fetchAudio, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAudioPresent]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <button>CLICK ME</button>
      <img
        src={isFirstImage ? "/luigi.png" : "/luigi_talk.png"}
        alt="Switchable content"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.5s ease",
        }}
      />
    </div>
  );
};

export default Luigi;
