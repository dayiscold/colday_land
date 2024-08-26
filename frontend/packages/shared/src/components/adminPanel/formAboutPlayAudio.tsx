import {type GetPhotoListApiV1PhotosListGetResponse, SiteInfoSchema} from "@colday/api";
import {useForm} from "@tanstack/react-form";
import {Button, FormItem, Group, Input, NativeSelect} from "@vkontakte/vkui";
import AdminGroupSpiner from "./spiner";
import GroupAlerts from "../alerts/groupAlerts";

type VkAdminAboutPlayAudioFormProps = {
    values?: SiteInfoSchema
    photos?: GetPhotoListApiV1PhotosListGetResponse
    isLoading?: boolean
    onSubmit: (values: SiteInfoSchema) => void
}
const emptyValues: SiteInfoSchema = {
    name: '',
    description: '',
}
const VkAdminAboutPlayAudioForm = ({values, photos, isLoading, onSubmit}: VkAdminAboutPlayAudioFormProps) => {
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
                name="play_widget.title"
                children={(field) => {
                    return (
                        <FormItem top="Название карточки" htmlFor={field.name}>
                            <Input
                                id={field.name}
                                type="text"
                                placeholder=""
                                value={field.state.value || ''}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </FormItem>
                    )
                }}
            />
            <form.Field
                name="play_widget.description"
                children={(field) => {
                    return (
                        <FormItem top="Описание карточки" htmlFor={field.name}>
                            <Input
                                id={field.name}
                                type="text"
                                placeholder=""
                                value={field.state.value || ''}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </FormItem>
                    )
                }}
            />
            <form.Field
                name="play_widget.color"
                children={(field) => {
                    return (
                        <FormItem top="Цвет текста на карточке" htmlFor={field.name}>
                            <Input
                                id={field.name}
                                type="color"
                                placeholder=""
                                value={field.state.value || ''}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </FormItem>
                    )
                }}
            />
            <form.Field
                name="play_widget.color_card"
                children={(field) => {
                    return (
                        <FormItem top="Цвет карточки" htmlFor={field.name}>
                            <Input
                                id={field.name}
                                type="color"
                                placeholder=""
                                value={field.state.value || ''}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </FormItem>
                    )
                }}
            />
            <form.Field
                name="play_widget.url"
                children={(field) => {
                    return (
                        <FormItem top="Ссылка при клике на 'Добавить в спотифай'" htmlFor={field.name}>
                            <Input
                                id={field.name}
                                type="url"
                                placeholder=""
                                value={field.state.value || ''}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </FormItem>
                    )
                }}
            />
            <form.Field
                name="play_widget.button_name"
                children={(field) => {
                    return (
                        <FormItem top="Надпись на кнопке 'Добавить в спотифай'" htmlFor={field.name}>
                            <Input
                                id={field.name}
                                type="text"
                                placeholder=""
                                value={field.state.value || ''}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </FormItem>
                    )
                }}
            />
            <form.Field
                name="play_widget.photo_path"
                children={(field) => {
                    return (
                        <FormItem top="Ссылка на картинку" htmlFor={field.name}>
                            <NativeSelect
                                id={field.name}
                                placeholder="Введите адрес картинки"
                                onChange={
                                    (e) =>
                                        field.handleChange(e.target.value)
                                }
                                value={field.state.value || ''}
                                onBlur={field.handleBlur}
                            >
                                {options}
                            </NativeSelect>
                        </FormItem>
                    )
                }}
            />
            <form.Field
                name="play_widget.song_source"
                children={(field) => {
                    return (
                        <FormItem top="Ссылка на просшивание" htmlFor={field.name}>
                            <Input
                                id={field.name}
                                type="text"
                                placeholder=""
                                value={field.state.value || ''}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </FormItem>
                    )
                }}
            />
            <FormItem>
                <Button type="submit" size="l" stretched>
                    Сохранить
                </Button>
            </FormItem>
        </form>
    </Group>

}

export default VkAdminAboutPlayAudioForm;