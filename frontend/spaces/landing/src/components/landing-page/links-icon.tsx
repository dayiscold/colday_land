import {ReactNode} from "react";

export type LinksIconProps = {
    children: ReactNode,
};
const LinksIcon = ({children}: LinksIconProps) => {
    return <div className="idden lg:flex lg:flex-1 lg:justify-end">
        <div className="flex">
            {children}
        </div>
    </div>
}

export default LinksIcon;
