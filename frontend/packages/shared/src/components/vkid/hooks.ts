import {useContext} from "react";
import {VKIDProfile} from "./context";
import {JWTModelProfile} from "@colday/api";

export const useVKIDProfile = (): JWTModelProfile => {
    const context = useContext(VKIDProfile);
    if (!context || !context.profile) {
        throw new Error("useVKIDProfile must be used within a VKIDProfileProvider");
    }
    return context.profile;
}
