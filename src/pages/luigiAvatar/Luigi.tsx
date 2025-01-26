import { useEffect, useState, useRef } from "react";
const Luigi = () => {
  const [isAudioPresent, setIsAudioPresent] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const imageList = ['drill_sergent1.png', 'drill_sergent2.png', 'drill_sergent3.png', 'drill_sergent4.png', 'drill_sergent5.png4'];
  const [currentImage, setCurrentImage] = useState<string>(imageList[0]);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    return imageList[randomIndex];
  };

  const fetchAudio = async () => {
    try {
      const response = await fetch("https://resumeroastbackend-ysb5p.kinsta.app/get-audio");

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

        // Set playback rate to play the audio faster
        audio.playbackRate = 1.3;

        // Auto-play and handle audio state
        audio
          .play()
          .then(() => {
            setIsAudioPresent(true);
            setCurrentImage(getRandomImage()); // Set initial image

            const intervalId = setInterval(() => {
              setCurrentImage(getRandomImage());
            }, 200); // Change image every 500ms

            audio.onended = () => {
              setIsAudioPresent(false);
              URL.revokeObjectURL(url);
              clearInterval(intervalId); // Clear interval when audio ends
              setCurrentImage(imageList[0]);
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
    return () => {
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
        src={currentImage}
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
