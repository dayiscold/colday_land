import {SiteInfoSchema} from "@colday/api";
import {useForm} from "@tanstack/react-form";
import {Button, FormItem, Group, Input} from "@vkontakte/vkui";
import AdminGroupSpiner from "./spiner";
import GroupAlerts from "../alerts/groupAlerts";

type VkAdminAboutInfoFormProps = {
    values?: SiteInfoSchema
    isLoading?: boolean
    onSubmit: (values: SiteInfoSchema) => void
}
const emptyValues: SiteInfoSchema = {
    name: '',
    description: '',
}
const VkAdminAboutInfoForm = ({values, isLoading, onSubmit}: VkAdminAboutInfoFormProps) => {
    const form = useForm({
        defaultValues: values || emptyValues,
        onSubmit: ({value}) => {
            onSubmit(value)
        }
    })
    if (isLoading) return <AdminGroupSpiner/>
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
                name="name"
                children={(field) => {
                    return (
                        <FormItem top="Нзвание" htmlFor={field.name}>
                            <Input
                                id={field.name}
                                type="text"
                                placeholder="Введите название"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </FormItem>
                    )
                }}
            />
            <form.Field
                name="description"
                children={(field) => {
                    return (
                        <FormItem top="Описание" htmlFor={field.name}>
                            <Input
                                id={field.name}
                                type="text"
                                placeholder="Введите описание"
                                value={field.state.value}
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

export default VkAdminAboutInfoForm;
