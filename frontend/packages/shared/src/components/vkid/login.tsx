import {useEffect} from "react";
import * as VKID from '@vkid/sdk';
import {Group, Panel, PanelHeader, Placeholder} from "@vkontakte/vkui";
import {Icon56UsersOutline} from "@vkontakte/icons";
import {firstFactorAuth} from "../../queries/vkid/firstFactorAuth";
import {ConfigAuthMode, ConfigResponseMode} from "@vkid/sdk";

const VKIDProfileLoginID = `VkIdSdkOneTap`;

export const VKIDProfileLogin = () => {
    const {data} = firstFactorAuth();
    useEffect(() => {
        if (!data) return undefined;
        VKID.Config.init({
            app: Number(data.client_id),
            redirectUrl: data.redirect_uri,
            state: data.state,
            codeChallenge: data.code_challenge,
            scope: data.scopes,
            mode: ConfigAuthMode.Redirect,
            responseMode: ConfigResponseMode.Redirect,
        });

        const oneTap = new VKID.OneTap();

        const container = document.getElementById(VKIDProfileLoginID);

        if (container && !container.innerHTML) {
            oneTap.render({
                container,
            });
        }
    }, [data]);
    return <Panel>
        <PanelHeader>Вход</PanelHeader>
        <Group>
            <Placeholder
                icon={<Icon56UsersOutline/>}
                header="Управление приложением"
                action={<div style={{"width": "70vw"}} id={VKIDProfileLoginID}></div>}
            >
                Войди с помощью VKID для удобного управление сайтом
            </Placeholder>
        </Group>
    </Panel>
}
