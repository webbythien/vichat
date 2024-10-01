"use client";

import { useSocket } from "@/context/SocketContext";
import VideoContainer from "./VideoContainer";
import { useCallback, useEffect, useState } from "react";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";

function VideoCall() {
  const { localStream } = useSocket();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVidOn, setIsVidOn] = useState(true);

  useEffect(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      setIsVidOn(videoTrack.enabled);

      const audioTrack = localStream.getAudioTracks()[0];
      setIsVidOn(audioTrack.enabled);
    }
  }, [localStream]);
  const toggleCamera = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVidOn(videoTrack.enabled);
    }
  }, [localStream]);

  const toggleMic = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsVidOn(audioTrack.enabled);
    }
  }, [localStream]);
  return (
    <div>
      <div>
        {localStream && (
          <VideoContainer
            stream={localStream}
            isLocalStream={true}
            isOnCall={false}
          />
        )}
      </div>
      <div className="mt-8 flex items-center">
        <button onClick={toggleMic}>
          {isMicOn && <MdMicOff size={28} />}
          {!isMicOn && <MdMic size={28} />}
        </button>
        <button
          className="px-4 py-2 bg-rose-500 text-white rounded mx-4"
          onClick={() => {}}
        >
          End Call
        </button>
        <button onClick={toggleMic}>
          {isVidOn && <MdVideocamOff size={28} />}
          {!isVidOn && <MdVideocam size={28} />}
        </button>
      </div>
    </div>
  );
}

export default VideoCall;
