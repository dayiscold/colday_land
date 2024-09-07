import {css, cx} from "@emotion/css";
import {FadeIn} from "../landing-page/big-text";
import ImagePlayerSource from "./imgPlayer";
import CardPlayer from "./cardPlayer";
import BtnPlayerPlus from "./btnPlayerPlus";
import IconPlayer from "./iconPlayer";


type PlayerProps = {
    title: string
    description: string
    color: string
    colorCard: string
    url: string
    buttonName: string
    photoPath: string
    songSource: string
}


const Player = ({title, description, color, colorCard, url, buttonName, photoPath, songSource}: PlayerProps) => {
    const playerBlockCss = css({
        backgroundColor: colorCard,
        animationDelay: ".5s"
    });
    return <div className={cx(
        "relative rounded-xl h-36 w-11/12 sm:w-6/12",
        FadeIn,
        playerBlockCss
    )}>
        <div className="flex">
            <div className="flex-none flex items-center w-36 h-36">
                <ImagePlayerSource src={photoPath}/>
            </div>
            <div className="grow flex items-center h-36">
                <div>
                    <CardPlayer
                        color={color}
                        title={title}
                        description={description}
                    >
                        <BtnPlayerPlus color={color} title={buttonName} url={url}/>
                    </CardPlayer>
                </div>
            </div>
            <IconPlayer color={color} songSource={songSource}/>
        </div>
    </div>
}
export default Player;
