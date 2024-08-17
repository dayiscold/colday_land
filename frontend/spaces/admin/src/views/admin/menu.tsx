import {Cell, Group, Header, PanelHeader} from "@vkontakte/vkui";
import {AdminPanelMenu, AdminPanelMenuTitle} from "@/views/admin/base.tsx";
import {Icon28ChainOutline, Icon28ListPlayOutline, Icon28UserOutline} from "@vkontakte/icons";

type VKAdminMenuPanelProps = {
    id: AdminPanelMenu
    to: (panel: AdminPanelMenu) => void
}
const VKAdminMenuPanel = ({id, to}: VKAdminMenuPanelProps) => {
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
        </Group>
    </>
}
export default VKAdminMenuPanel;
