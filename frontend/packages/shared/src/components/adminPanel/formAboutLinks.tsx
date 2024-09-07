import {type GetPhotoListApiV1PhotosListGetResponse, SiteInfoSchema} from "@colday/api";
import {useForm} from "@tanstack/react-form";
import {Button, FormItem, Group, Header, Input, NativeSelect} from "@vkontakte/vkui";
import {v4 as uuidv4} from 'uuid';
import AdminGroupSpiner from "./spiner";
import GroupAlerts from "../alerts/groupAlerts";

type VkAdminAboutLinksFormProps = {
    values?: SiteInfoSchema
    photos?: GetPhotoListApiV1PhotosListGetResponse
    isLoading?: boolean
    onSubmit: (values: SiteInfoSchema) => void
}
const emptyValues: SiteInfoSchema = {
    name: '',
    description: '',
}
const VkAdminAboutLinksForm = ({values, photos, isLoading, onSubmit}: VkAdminAboutLinksFormProps) => {
    const form = useForm({
        defaultValues: values || emptyValues,
        onSubmit: ({value}) => {
            onSubmit(value)
        }
    })
    if (isLoading) return <AdminGroupSpiner/>
    const options = photos?.photos?.map((photo) => {
        return <option key={`option-photo-url-${photo.id}`}
                       value={`/api/v1/photos/${photo.id}`}>
            {photo.id} {photo.filename}
        </option>
    });
    return <Group mode="card">
        <GroupAlerts/>
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            <form.Field
                name="links"
                mode="array"
                children={(linksField) => (
                    <>
                        {linksField.state.value?.map((_, i) => (
                            <Group key={i} header={
                                <Header mode="secondary">{`Ссылка ${i + 1}`}</Header>
                            } mode="plain">
                                <form.Field
                                    name={`links[${i}].url`}
                                    children={(field) => {
                                        return (
                                            <FormItem
                                                top={`Адрес ссылки ${i + 1}`}
                                                htmlFor={field.name}
                                                removable
                                                onRemove={() => linksField.removeValue(i)}
                                            >
                                                <Input
                                                    id={field.name}
                                                    type="text"
                                                    placeholder="Введите ссылку"
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                />
                                            </FormItem>
                                        )
                                    }}
                                />
                                <form.Field
                                    name={`links[${i}].path`}
                                    children={(field) => {
                                        return (
                                            <FormItem top={`Адрес картинки ${i + 1}`} htmlFor={field.name}>
                                                <NativeSelect
                                                    id={field.name}
                                                    placeholder="Введите адрес картинки"
                                                    onChange={
                                                        (e) =>
                                                            field.handleChange(e.target.value)
                                                    }
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                >
                                                    {options}
                                                </NativeSelect>
                                            </FormItem>
                                        )
                                    }}
                                />
                                <form.Field
                                    name={`links[${i}].type`}
                                    children={(field) => {
                                        return (
                                            <FormItem top={`Тип ссылки ${i + 1}`} htmlFor={field.name}>
                                                <Input
                                                    id={field.name}
                                                    type="text"
                                                    placeholder="Тип ссылки, например steam"
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                />
                                            </FormItem>
                                        )
                                    }}
                                />
                            </Group>
                        ))}
                        <FormItem>
                            <Button onClick={() => {
                                linksField.pushValue({
                                    id: uuidv4(),
                                    url: '',
                                    type: '',
                                    path: '',
                                })

                            }} size="l" mode="secondary" appearance="neutral" stretched>
                                Добавить ссылку
                            </Button>
                        </FormItem>
                    </>
                )}
            />
            <FormItem>
                <Button type="submit" size="l" stretched>
                    Сохранить
                </Button>
            </FormItem>
        </form>
    </Group>

}

export default VkAdminAboutLinksForm;
