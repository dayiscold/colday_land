type LinkIconProps = {
    linkHref: string,
    imageSrc: string,
    alt: string
};
const LinkIcon = ({linkHref, imageSrc, alt}: LinkIconProps) => {
    return <div className="flex-auto">
        <div className="mx-1">
            <a href={linkHref} className="text-white text-sm font-semibold leading-6">
                <img className="object-contain h-10 w-10" src={imageSrc} alt={alt}/>
            </a>
        </div>
    </div>

}

export default LinkIcon;
