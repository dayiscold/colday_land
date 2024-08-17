import {useState} from "react";
import {AppRoot, Panel, PanelHeader, SplitCol, SplitLayout, View,} from '@vkontakte/vkui';
import {AdminPanelMenu} from "@/views/admin/base.tsx";
import VKAdminMenuPanel from "@/views/admin/menu.tsx";
import VkAdminAboutInfo from "@/views/admin/aboutInfo.tsx";
import VkAdminAboutLinks from "@/views/admin/aboutLinks.tsx";
import VkAdminAboutPlayAudio from "@/views/admin/aboutPlayAudio.tsx";

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
    </View>
}
const AdminPage = () => {
    return (
        <AppRoot mode="full">
            <SplitLayout header={<PanelHeader delimiter="none"/>}>
                <SplitCol autoSpaced>
                    <AdminPagePanel/>
                </SplitCol>
            </SplitLayout>
        </AppRoot>
    );
};

export default AdminPage;
