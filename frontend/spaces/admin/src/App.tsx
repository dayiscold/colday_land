import AdminPage from "@/views/admin/admin.tsx";
import {VkAdminPhotosProvider} from "@colday/shared/src/components/adminPanel/photoDelete/contextPhotoDelete";
import {AlertProvider} from "@colday/shared/src/components/alerts/context";


export const App = () => {
    return <AlertProvider>
        <VkAdminPhotosProvider>
            <AdminPage/>
        </VkAdminPhotosProvider>
    </AlertProvider>
}
