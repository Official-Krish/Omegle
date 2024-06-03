import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";

export const LandingPage = () => {
    const [name, setName] = useState("");
    const [joined, setJoined] = useState(false);
    const [localVideoTrack, setLocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);


    const getCam = async () => {
        const stream = window.navigator.mediaDevices.getUserMedia({
            video : true,
            audio : true
        });
        const audioTrack =  (await stream).getAudioTracks()[0];
        const videoTrack =  (await stream).getVideoTracks()[0];
        setLocalAudioTrack(audioTrack);
        setLocalVideoTrack(videoTrack);

        if (!videoRef.current){
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play();
    }


    useEffect(() => {
        if (videoRef && videoRef.current){
            getCam();
        }
    }, [videoRef])

    return <div>
        <video ref={ videoRef }></video>
        <input type="text" placeholder="Enter your name" onChange={(e) => {
            setName(e.target.value);
        }}>
        </input>
        <Link to={`/room/?name=${name}`} >
            Join
        </Link>
    </div>
}