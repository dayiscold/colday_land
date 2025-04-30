import {PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {AdminPanelMenu, AdminPanelMenuTitle} from "@/views/admin/base.tsx";
import {deletePhoto} from "@colday/shared/src/queries/siteInfo/deletePhoto";
import {useAlert} from "@colday/shared/src/components/alerts/hooks";
import VkAdminFormPhotosDelete from "@colday/shared/src/components/adminPanel/photoDelete/formPhotoDelete";


type VkAdminPhotoDeleteProps = {
    id: AdminPanelMenu
    to: (panel: AdminPanelMenu) => void
}
const VkAdminPhotoDelete = ({id, to}: VkAdminPhotoDeleteProps) => {
    const {showAlert, hideAlert} = useAlert()
    const {mutate} = deletePhoto({
        onMutate: () => {
            hideAlert()
        },
        onSuccess: () => {
            to(AdminPanelMenu.photos)
        },
        onError: () => {
            showAlert({
                type: "error",
                message: "Произошла ошибка при удалении фото"
            })
        }
    })
    return <>
        <PanelHeader before={
            <PanelHeaderBack label="Назад" onClick={to.bind(to, AdminPanelMenu.photos)}/>
        }>{AdminPanelMenuTitle.get(id)}</PanelHeader>
        <VkAdminFormPhotosDelete onDelete={mutate}/>
    </>
}
export default VkAdminPhotoDelete;
