import { useMusicPlayer } from "../../context/MusicPlayerContext";
import MusicPlayerCollapsed from "./MusicPlayerCollapsed";
import MusicPlayerExpanded from "./MusicPlayerExpanded";

export default function MusicPlayer() {
  const { isExpanded } = useMusicPlayer();

  return (
    <div className="fixed bottom-3 left-1/2 z-[100] w-[calc(100vw-16px)] -translate-x-1/2 sm:bottom-4">
      <div
        className={`mx-auto w-full transition-all duration-500 ease-out ${
          isExpanded ? "max-w-[720px] scale-100 opacity-100" : "max-w-[420px] scale-95 opacity-100"
        }`}
      >
        {isExpanded ? <MusicPlayerExpanded /> : <MusicPlayerCollapsed />}
      </div>
    </div>
  );
}
