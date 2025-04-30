import {css, cx} from "@emotion/css";

type HeaderLogoProps = {
    children: React.ReactNode
};


export const HeaderTextFontCss = css`
    & {
        font-family: "Playfair Display", serif;
        font-optical-sizing: auto;
        font-style: normal;
    }
`
const HeaderLogo = ({children}: HeaderLogoProps) => {
    return <div className={cx("flex", "lg:flex-1")}>
        <a href="#" className="-m-1.5 p-1.5">
            <span className={cx("text-white text-l leading-6 font-light", HeaderTextFontCss)}>{children}</span>
        </a>
    </div>
}

export const HeaderBlock = ({children}: HeaderLogoProps) => {
    return <header>
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            {children}
        </nav>
    </header>
}

export default HeaderLogo;
