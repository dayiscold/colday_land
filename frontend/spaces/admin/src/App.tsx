import AdminPage from "@/views/admin/admin.tsx";
import {AlertProvider} from "@colday/shared/src/components/alerts/context";


export const App = () => {
    return <AlertProvider>
        <AdminPage/>
    </AlertProvider>
}
