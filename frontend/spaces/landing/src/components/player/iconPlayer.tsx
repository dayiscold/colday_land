import {css, cx} from "@emotion/css";
import {useRef, useState} from "react";
import IconPause from "../icons/iconPause";
import IconPlay from "../icons/iconPlay";

type IconPlayerProps = {
    color: string;
    songSource: string;
}
const IconPlayer = ({color, songSource}: IconPlayerProps) => {
    const textBgCss = css({
        backgroundColor: color,
    });
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const audioRef = useRef(null);
    const onClick = () => {
        // @ts-ignore
        isPlay ?  audioRef.current.pause(): audioRef.current.play();
        setIsPlay(!isPlay);
    };
    return <div
        onClick={onClick}
        className={cx(textBgCss, "absolute rounded-3xl right-2 bottom-2 h-6 w-6 hover:scale-105 cursor-pointer")}>
        <div className="h-4 w-4 top-0 left-0 translate-y-1/4 translate-x-1/4">
            <div>
                {isPlay ? <IconPause/> : <IconPlay/>}
            </div>
        </div>
        <div className="hidden">
            <audio ref={audioRef}>
                <source src={songSource} type="audio/mpeg"/>
            </audio>
        </div>
    </div>
}

export default IconPlayer;
