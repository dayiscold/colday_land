import {GetPhotoListApiV1PhotosListGetResponse} from "@colday/api";
import {Button, FormItem, Group, Header, SimpleCell} from "@vkontakte/vkui";
import AdminGroupSpiner from "./spiner";
import {useState} from "react";
import {AdminPanelMenu} from "@/views/admin/base";

type VkAdminPhotosListProps = {
    values?: GetPhotoListApiV1PhotosListGetResponse
    isLoading?: boolean
    to: (panel: AdminPanelMenu) => void
}

const VkAdminPhotosList = ({values, isLoading, to}: VkAdminPhotosListProps) => {
    if (isLoading) return <AdminGroupSpiner/>
    const [image, setImage] = useState<number | undefined>(undefined)
    if (image === null) return;
    const components = values?.photos?.map((item) => {
        return <SimpleCell onClick={setImage.bind(setImage, item.id)} key={item.id} Component="label">
            {item.id}. {item.filename}
        </SimpleCell>
    })
    return <Group mode="card">
        <Group header={<Header mode="secondary">ЗАГРУЗИТЬ</Header>}>
            <FormItem>
                <Button onClick={to.bind(to, AdminPanelMenu.upload_photos)} size="l" stretched>
                    Добавить
                </Button>
            </FormItem>
        </Group>
        <Group header={<Header mode="secondary">ФОТОГРАФИИ</Header>}>
            {components}
        </Group>
    </Group>

}

export default VkAdminPhotosList;
