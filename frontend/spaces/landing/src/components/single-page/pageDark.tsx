import {css} from "@emotion/css";
import {ReactNode} from "react";

type PageDarkWrapperProps = {
    children: ReactNode
}

const pageDarkWrapperCss = css(`min-height: 100vh; background-color: black;`);

export const PageDarkWrapper = ({children}: PageDarkWrapperProps) => {
    return <div className={pageDarkWrapperCss}>{children}</div>
}
