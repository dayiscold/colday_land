import {PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {AdminPanelMenu, AdminPanelMenuTitle} from "@/views/admin/base.tsx";
import {usePhotosInfo} from "@colday/shared/src/queries/siteInfo/getPhotosInfo";
import VkAdminPhotosList from "@colday/shared/src/components/adminPanel/formPhotosList";


type VkAdminAboutPlayAudioProps = {
    id: AdminPanelMenu
    to: (panel: AdminPanelMenu) => void
}
const VkAdminPhotos = ({id, to}: VkAdminAboutPlayAudioProps) => {
    const {data, isLoading} = usePhotosInfo();
    return <>
        <PanelHeader before={
            <PanelHeaderBack label="Назад" onClick={to.bind(to, AdminPanelMenu.menu)}/>
        }>{AdminPanelMenuTitle.get(id)}</PanelHeader>
        <VkAdminPhotosList
            isLoading={isLoading}
            values={data}
            to={to}
        />
    </>
}
export default VkAdminPhotos;
