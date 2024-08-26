import {useContext} from "react";
import {VkAdminPhotosContext} from "./contextPhotoDelete";

export const usePhotoDelete = () => {
    const context = useContext(VkAdminPhotosContext);
    if (!context || !context.photo) {
        throw new Error("useAlert must be used within a AlertProvider");
    }
    return context;
}
