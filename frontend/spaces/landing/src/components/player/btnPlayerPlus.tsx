import {css, cx} from "@emotion/css";
import IconPlus from "../icons/iconPlus";
import playerTextCss from "./textPlayer";

type BtnPlayerPlusProps = {
    color: string,
    url: string,
    title: string
};
const BtnPlayerPlus = ({color, title, url}: BtnPlayerPlusProps) => {
    const textColorCss = css({
        color: color,
    });
    return <div className={"opacity-70 hover:opacity-100 cursor-pointer"}>
        <a href={url}>
            <div className="flex">
                <div className="flex-none">
                    <span
                        className={cx(textColorCss)}>
                                  <IconPlus/>
                    </span>
                </div>
                <div>
                    <span
                        className={cx("text-sm leading-none align-top pl-0.5", textColorCss, playerTextCss)}>
                                  {title}
                    </span>
                </div>
            </div>
        </a>
    </div>
}

export default BtnPlayerPlus;
