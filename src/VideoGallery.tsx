import React, { useEffect, useRef, useState } from "react";
import { Play, X, ArrowUpRight } from "lucide-react";
import VIDEOS from "./videos.json";

// Short-form edits hosted in a shared Google Drive folder. Thumbnails are stored locally;
// the video itself streams from Drive only when someone opens it.
const DRIVE_FOLDER = "https://drive.google.com/drive/folders/170Zs98UsGgCIhm-A9UFK_xniBACmeAdA?usp=sharing";
const INITIAL = 12;

type Video = { id: string; n: number; style: string };

export default function VideoGallery() {
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState<Video | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videos = VIDEOS as Video[];
  const shown = showAll ? videos : videos.slice(0, INITIAL);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  return (
    <div className="video-gallery">
      <div className="video-gallery-head">
        <div>
          <h3>More video edits</h3>
          <p>
            {videos.length} short-form edits: motion graphics with B-roll, and talking-head ads with captions. Tap one to
            play it.
          </p>
        </div>
        <a className="text-link" href={DRIVE_FOLDER} target="_blank" rel="noopener noreferrer">
          Open the full folder
          <ArrowUpRight size={15} aria-hidden="true" />
          <span className="sr-only"> (Google Drive, opens in a new tab)</span>
        </a>
      </div>

      <ul className="video-grid">
        {shown.map((v) => (
          <li key={v.id}>
            <button className="video-thumb" onClick={() => setActive(v)} aria-label={`Play video ${v.n}, ${v.style.toLowerCase()}`}>
              <img src={`/assets/video-thumbs/video-${v.n}.jpg`} alt="" loading="lazy" />
              <span className="video-play" aria-hidden="true">
                <Play size={18} fill="currentColor" />
              </span>
              <span className="video-label">{v.style}</span>
            </button>
          </li>
        ))}
      </ul>

      {videos.length > INITIAL && (
        <div className="video-more">
          <button className="btn btn-light" onClick={() => setShowAll((s) => !s)} aria-expanded={showAll}>
            {showAll ? "Show fewer" : `Show all ${videos.length} videos`}
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="video-dialog"
        aria-label={active ? `Video ${active.n}` : "Video player"}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === dialogRef.current && setActive(null)}
      >
        {active && (
          <div className="video-dialog-inner">
            <button className="video-close" onClick={() => setActive(null)} aria-label="Close video">
              <X size={20} />
            </button>
            <iframe
              src={`https://drive.google.com/file/d/${active.id}/preview`}
              title={`Video ${active.n}, ${active.style}`}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        )}
      </dialog>
    </div>
  );
}
