import {PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {AdminPanelMenu, AdminPanelMenuTitle} from "@/views/admin/base.tsx";
import VkAdminFormPhotosUpload from "@colday/shared/src/components/adminPanel/formPhotoUpload";
import {uploadPhoto} from "@colday/shared/src/queries/siteInfo/uploadPhoto";
import {useAlert} from "@colday/shared/src/components/alerts/hooks";


type VkAdminPhotoUploadProps = {
    id: AdminPanelMenu
    to: (panel: AdminPanelMenu) => void
}
const VkAdminPhotoUpload = ({id, to}: VkAdminPhotoUploadProps) => {
    const {showAlert, hideAlert} = useAlert()
    const {mutate} = uploadPhoto({
        onMutate: () => {
            hideAlert()
        },
        onSuccess: (data) => {
            showAlert({
                type: "default",
                message: `Загружено ${data?.id}`,
            })
        },
        onError: () => {
            showAlert({
                type: "error",
                message: "Произошла ошибка при обновлении ссылок"
            })
        }
    })
    return <>
        <PanelHeader before={
            <PanelHeaderBack label="Назад" onClick={to.bind(to, AdminPanelMenu.photos)}/>
        }>{AdminPanelMenuTitle.get(id)}</PanelHeader>
        <VkAdminFormPhotosUpload
            // @ts-ignore
            onSubmit={mutate}
        />
    </>
}
export default VkAdminPhotoUpload;
