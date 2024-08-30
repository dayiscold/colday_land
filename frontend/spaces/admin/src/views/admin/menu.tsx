import {Avatar, Cell, Group, Header, PanelHeader, SimpleCell} from "@vkontakte/vkui";
import {AdminPanelMenu, AdminPanelMenuTitle} from "@/views/admin/base.tsx";
import {useVKIDProfile} from "@colday/shared/src/components/vkid/hooks.ts";
import {userClearCookies} from "@colday/shared/src/queries/vkid/userClearCookies";
import {
    Icon28ChainOutline,
    Icon28ListPlayOutline,
    Icon28UserOutline,
    Icon28CameraOutline
} from "@vkontakte/icons";

type VKAdminMenuPanelProps = {
    id: AdminPanelMenu
    to: (panel: AdminPanelMenu) => void
}
const VKAdminMenuPanel = ({id, to}: VKAdminMenuPanelProps) => {
    const profile = useVKIDProfile();
    return <>
        <PanelHeader>{AdminPanelMenuTitle.get(id)}</PanelHeader>
        <Group header={
            <Header mode="secondary">Общее</Header>
        }>
            <Cell
                expandable="auto"
                before={<Icon28UserOutline/>}
                onClick={to.bind(to, AdminPanelMenu.aboutInfo)}
            >
                {AdminPanelMenuTitle.get(AdminPanelMenu.aboutInfo)}
            </Cell>
            <Cell
                expandable="auto"
                before={<Icon28ChainOutline/>}
                onClick={to.bind(to, AdminPanelMenu.aboutLinks)}
            >
                {AdminPanelMenuTitle.get(AdminPanelMenu.aboutLinks)}
            </Cell>
            <Cell
                expandable="auto"
                before={<Icon28ListPlayOutline/>}
                onClick={to.bind(to, AdminPanelMenu.aboutPlayAudio)}
            >
                {AdminPanelMenuTitle.get(AdminPanelMenu.aboutPlayAudio)}
            </Cell>
            <Cell
                expandable="auto"
                before={<Icon28CameraOutline/>}
                onClick={to.bind(to, AdminPanelMenu.photos)}
            >
                {AdminPanelMenuTitle.get(AdminPanelMenu.photos)}
            </Cell>
        </Group>
        <Group header={<Header mode="secondary">Выйти из сервиса</Header>}>
            <SimpleCell onClick={() => {
                userClearCookies()
            }}
                        before={<Avatar src={profile.photo_max}/>}>{profile.first_name} {profile.last_name}</SimpleCell>
        </Group>
    </>
}
export default VKAdminMenuPanel;
