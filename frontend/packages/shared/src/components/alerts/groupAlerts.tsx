import {Div, FormStatus} from "@vkontakte/vkui";
import {useAlert} from "./hooks";

export const GroupAlerts = () => {
    const {hideAlert, alertMessages} = useAlert();
    const alertMessage = alertMessages?.[0];
    if (!alertMessage || !alertMessage.type) return <></>;
    return (
        <Div onClick={hideAlert.bind(hideAlert, 0)}>
            <FormStatus header={alertMessage.message} mode={alertMessage.type}>
                {alertMessage.description}
            </FormStatus>
        </Div>
    );
};

export default GroupAlerts;
