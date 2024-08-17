import {PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {AdminPanelMenu, AdminPanelMenuTitle} from "@/views/admin/base.tsx";
import {useGetSiteInfo} from "@colday/shared/src/queries/siteInfo/getSiteInfo";
import {editSiteInfo} from "@colday/shared/src/queries/siteInfo/editAboutInfo";
import {useAlert} from "@colday/shared/src/components/alerts/hooks";
import VkAdminAboutPlayAudioForm from "@colday/shared/src/components/adminPanel/formAboutPlayAudio";


type VkAdminAboutPlayAudioProps = {
    id: AdminPanelMenu
    to: (panel: AdminPanelMenu) => void
}
const VkAdminAboutPlayAudio = ({id, to}: VkAdminAboutPlayAudioProps) => {
    const {data, isLoading} = useGetSiteInfo();
    const {showAlert, hideAlert} = useAlert()
    const {mutate} = editSiteInfo({
        onMutate: () => {
            hideAlert()
        },
        onSuccess: (data) => {
            showAlert({
                type: "default",
                message: data.message,
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
            <PanelHeaderBack label="Назад" onClick={to.bind(to, AdminPanelMenu.menu)}/>
        }>{AdminPanelMenuTitle.get(id)}</PanelHeader>
        <VkAdminAboutPlayAudioForm
            isLoading={isLoading}
            values={data}
            onSubmit={mutate}
        />
    </>
}
export default VkAdminAboutPlayAudio;
