import {useGetSiteInfo} from "@colday/shared/src/queries/siteInfo/getSiteInfo";
import {LoaderPage} from "@/components/single-page/loader.tsx";
import LinkIcon from "@/components/landing-page/link-icon.tsx";
import {PageDarkWrapper} from "@/components/single-page/pageDark.tsx";
import HeaderLogo, {HeaderBlock} from "@/components/landing-page/header.tsx";
import LinksIcon from "@/components/landing-page/links-icon.tsx";
import SectionBigText from "@/components/landing-page/big-text.tsx";
import Player from "@/components/player/player.tsx";

export const IndexPage = () => {
    const {data, isLoading} = useGetSiteInfo();
    if (isLoading) return <LoaderPage/>;
    const links = data?.links?.map(
        (value, index) =>
            <LinkIcon key={index} linkHref={value.url} alt={value.type} imageSrc={value.path}/>
    )
    return (
        <PageDarkWrapper>
            <HeaderBlock>
                <HeaderLogo>{data?.description}</HeaderLogo>
                <LinksIcon>
                    {links}
                </LinksIcon>
            </HeaderBlock>
            <SectionBigText>{data?.name}</SectionBigText>
            {
                data?.play_widget && (
                    <div className="flex justify-center my-14">
                        <Player
                            title={data.play_widget.title}
                            description={data.play_widget.description}
                            color={data.play_widget.color}
                            colorCard={data.play_widget.color_card}
                            url={data.play_widget.url}
                            buttonName={data.play_widget.button_name || 'Add to spotify'}
                            photoPath={data.play_widget.photo_path}
                            songSource={data.play_widget.song_source}
                        />
                    </div>
                )
            }
        </PageDarkWrapper>
    );
}
