import {Flex, Spinner} from "@vkontakte/vkui";

export const AdminGroupSpiner = () => {
    return <Flex aria-busy={true} aria-live="polite" direction="column" gap={32} margin="auto">
        <Spinner size="large"/>
    </Flex>
}
export default AdminGroupSpiner;
