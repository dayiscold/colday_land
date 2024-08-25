import {Button, File, FormItem, Group} from "@vkontakte/vkui";
import {Icon24Camera} from "@vkontakte/icons";
import {useForm} from "@tanstack/react-form";
import GroupAlerts from "../alerts/groupAlerts";
import {useState} from "react";

type VkAdminFromPhotosUploadProps = {
    onSubmit: (values?: Blob | File | null) => void
}
const VkAdminFormPhotosUpload = ({onSubmit}: VkAdminFromPhotosUploadProps) => {
    const form = useForm({
        defaultValues: {file: null},
        onSubmit: ({value}) => {
            onSubmit(value?.file)
        }
    })
    const [fileProps, setFileProps] = useState<string | undefined>(undefined);
    return <Group mode="card">
        <GroupAlerts/>
        <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}>
            <FormItem top="Загрузите ваше фото">
                <File onChange={
                    e => {
                        const file = e?.target?.files?.[0]
                        // @ts-ignore
                        form.setFieldValue('file', file);
                        // @ts-ignore
                        setFileProps(file.name);
                    }
                }
                      stretched
                      before={<Icon24Camera role="presentation"/>}
                      size="l">
                    {fileProps || "Открыть галерея"}
                </File>
            </FormItem>
            <FormItem>
                <Button type="submit" size="l" stretched>
                    Сохранить
                </Button>
            </FormItem>
        </form>
    </Group>

}

export default VkAdminFormPhotosUpload;
