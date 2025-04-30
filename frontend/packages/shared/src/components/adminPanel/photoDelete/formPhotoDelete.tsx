import {Image, Group, Header, SimpleCell, Flex, Button, FormItem} from "@vkontakte/vkui";
import {usePhotoDelete} from "./hooks";

type VkAdminFromPhotosDeleteProps = {
    onDelete: (id: number) => void
}
const VkAdminFormPhotosDelete = ({onDelete}: VkAdminFromPhotosDeleteProps) => {
    const {photo} = usePhotoDelete();
    return <Group mode="card">
        <SimpleCell indicator={photo.id}>
            ID
        </SimpleCell>
        <SimpleCell indicator={photo.filename}>
            Название файла
        </SimpleCell>
        <Group header={<Header mode="secondary">ПРОСМОТР</Header>} mode="plain">
            <Flex margin="auto" direction="column" gap="m">
                <div style={{height: '20vh'}}>
                    <Image keepAspectRatio src={photo.url} widthSize="100%"/>
                </div>
            </Flex>
        </Group>
        <FormItem>
            <Button onClick={onDelete.bind(onDelete, photo.id)} mode="tertiary" appearance="negative" size="l" stretched>
                Удалить
            </Button>
        </FormItem>
    </Group>

}

export default VkAdminFormPhotosDelete;
