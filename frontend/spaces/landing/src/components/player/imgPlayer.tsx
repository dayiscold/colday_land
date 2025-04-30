type ImagePlayerSourceProps = {
    src: string
}
const ImagePlayerSource = ({src}: ImagePlayerSourceProps) => {
    return <div className="w-36 h-36">
        <img className="scale-90 rounded-xl object-cover w-36 h-36" alt="spotify-preview"
             src={src}
        />
    </div>
}

export default ImagePlayerSource;
