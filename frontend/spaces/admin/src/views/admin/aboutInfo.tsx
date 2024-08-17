import {PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {AdminPanelMenu, AdminPanelMenuTitle} from "@/views/admin/base";
import {useGetSiteInfo} from "@colday/shared/src/queries/siteInfo/getSiteInfo";
import VkAdminAboutInfoForm from "@colday/shared/src/components/adminPanel/formAboutInfo";
import {useAlert} from "@colday/shared/src/components/alerts/hooks";
import {editSiteInfo} from "@colday/shared/src/queries/siteInfo/editAboutInfo";


type VkAdminAboutInfoProps = {
    id: AdminPanelMenu
    to: (panel: AdminPanelMenu) => void
}
const VkAdminAboutInfo = ({id, to}: VkAdminAboutInfoProps) => {
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
                message: "Произошла ошибка при обновлении сайта"
            })
        }
    })
    return <>
        <PanelHeader before={
            <PanelHeaderBack label="Назад" onClick={to.bind(to, AdminPanelMenu.menu)}/>
        }>{AdminPanelMenuTitle.get(id)}</PanelHeader>
        <VkAdminAboutInfoForm
            isLoading={isLoading}
            values={data}
            onSubmit={mutate}
        />
    </>
}
export default VkAdminAboutInfo;
