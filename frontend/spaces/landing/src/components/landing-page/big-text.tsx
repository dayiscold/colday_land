import {ReactNode} from "react";
import {css, cx} from "@emotion/css";
import {HeaderTextFontCss} from "./header";

export type SectionBigTextProps = {
    children: ReactNode,
};

export const FadeIn = css`
    & {
        opacity: 0;
        animation-name: fadeIn;
        animation-fill-mode: forwards;
        animation-duration: 1s;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`

const SectionBigText = ({children}: SectionBigTextProps) => {
    return <div className="flex justify-center my-14">
        <div className="text-white text-6xl font-semibold leading-6">
            <span className={cx(FadeIn, HeaderTextFontCss)}>{children}</span>
        </div>
    </div>
}

export default SectionBigText;
