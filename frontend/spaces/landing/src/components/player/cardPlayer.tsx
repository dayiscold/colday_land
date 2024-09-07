import {css, cx} from "@emotion/css";
import {ReactNode} from "react";
import playerTextCss from "./textPlayer";

type CardPlayerProps = {
    color: string
    title: string
    description: string
    children: ReactNode
};
const CardPlayer = ({color, title, description, children}: CardPlayerProps) => {
    const textColorCss = css({
        color: color,
    });
    return <div className={cx("flex flex-col pl-2", playerTextCss, textColorCss)}>
        <div>
                            <span className={cx("text-xl leading-normal align-bottom", playerTextCss, textColorCss)}>
                                {title}
                            </span>
        </div>
        <div>
                            <span
                                className={cx("opacity-70 text-sm leading-none align-top", playerTextCss, textColorCss)}>
                                {description}
                            </span>
        </div>
        <div>
            {children}
        </div>
    </div>
}

export default CardPlayer;
