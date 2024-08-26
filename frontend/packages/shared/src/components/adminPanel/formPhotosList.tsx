import {GetPhotoListApiV1PhotosListGetResponse} from "@colday/api";
import {Button, FormItem, Group, Header, SimpleCell} from "@vkontakte/vkui";
import AdminGroupSpiner from "./spiner";
import {AdminPanelMenu} from "@/views/admin/base";
import {usePhotoDelete} from "./photoDelete/hooks";

type VkAdminPhotosListProps = {
    values?: GetPhotoListApiV1PhotosListGetResponse
    isLoading?: boolean
    to: (panel: AdminPanelMenu) => void
}

const VkAdminPhotosList = ({values, isLoading, to}: VkAdminPhotosListProps) => {
    if (isLoading) return <AdminGroupSpiner/>
    const {setPhoto} = usePhotoDelete();
    const components = values?.photos?.map((item) => {
        return <SimpleCell onClick={() => {
            setPhoto({
                id: item.id,
                filename: item.filename,
                url: `/api/v1/photos/${item.id}`,
            })
            to(AdminPanelMenu.deletePhotos)
        }} key={item.id} Component="label">
            {item.id}. {item.filename}
        </SimpleCell>
    })
    return <Group mode="card">
        <Group header={<Header mode="secondary">ЗАГРУЗИТЬ</Header>} mode="plain">
            <FormItem>
                <Button onClick={to.bind(to, AdminPanelMenu.uploadPhotos)} size="l" stretched>
                    Добавить
                </Button>
            </FormItem>
        </Group>
        <Group header={<Header mode="secondary">ФОТОГРАФИИ</Header>} mode="plain">
            {components}
        </Group>
    </Group>

}

export default VkAdminPhotosList;
