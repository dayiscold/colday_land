import {useState} from "react";
import {AppRoot, Panel, PanelHeader, SplitCol, SplitLayout, View,} from '@vkontakte/vkui';
import {AdminPanelMenu} from "@/views/admin/base.tsx";
import VKAdminMenuPanel from "@/views/admin/menu.tsx";
import VkAdminAboutInfo from "@/views/admin/aboutInfo.tsx";
import VkAdminAboutLinks from "@/views/admin/aboutLinks.tsx";
import VkAdminAboutPlayAudio from "@/views/admin/aboutPlayAudio.tsx";
import VkAdminPhotos from "@/views/admin/photos.tsx";
import VkAdminPhotoUpload from "@/views/admin/photoUpload.tsx";
import VkAdminPhotoDelete from "@/views/admin/photoDelete.tsx";
import {VKIDProfileProvider} from "@colday/shared/src/components/vkid/context";

const AdminPagePanel = () => {
    const [
        activePanel, setActivePanel
    ] = useState<AdminPanelMenu>(AdminPanelMenu.menu);
    return <View activePanel={activePanel}>
        <Panel id={AdminPanelMenu.menu}>
            <VKAdminMenuPanel id={AdminPanelMenu.menu} to={setActivePanel}/>
        </Panel>
        <Panel id={AdminPanelMenu.aboutInfo}>
            <VkAdminAboutInfo id={AdminPanelMenu.aboutInfo} to={setActivePanel}/>
        </Panel>
        <Panel id={AdminPanelMenu.aboutLinks}>
            <VkAdminAboutLinks id={AdminPanelMenu.aboutLinks} to={setActivePanel}/>
        </Panel>
        <Panel id={AdminPanelMenu.aboutPlayAudio}>
            <VkAdminAboutPlayAudio id={AdminPanelMenu.aboutPlayAudio} to={setActivePanel}/>
        </Panel>
        <Panel id={AdminPanelMenu.photos}>
            <VkAdminPhotos id={AdminPanelMenu.photos} to={setActivePanel}/>
        </Panel>
        <Panel id={AdminPanelMenu.uploadPhotos}>
            <VkAdminPhotoUpload id={AdminPanelMenu.uploadPhotos} to={setActivePanel}/>
        </Panel>
        <Panel id={AdminPanelMenu.deletePhotos}>
            <VkAdminPhotoDelete id={AdminPanelMenu.deletePhotos} to={setActivePanel}/>
        </Panel>

    </View>
}
const AdminPage = () => {
    return (
        <AppRoot mode="full">
            <VKIDProfileProvider>
                <SplitLayout header={<PanelHeader delimiter="none"/>}>
                    <SplitCol autoSpaced>
                        <AdminPagePanel/>
                    </SplitCol>
                </SplitLayout>
            </VKIDProfileProvider>
        </AppRoot>
    );
};

export default AdminPage;
