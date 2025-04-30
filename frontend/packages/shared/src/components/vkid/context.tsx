import {createContext, ReactNode} from 'react';
import {JWTModelProfile, vkidSecondStepApiV1VkidSecondStepPost, VKIDSecondStepParams} from "@colday/api";
import {userGetCookies} from "../../queries/vkid/userGetCookies";
import AdminGroupSpiner from "../adminPanel/spiner";
import {VKIDProfileLogin} from "./login";

type VKIDProfile = {
    profile?: JWTModelProfile
};

type VKIDProfileProvider = {
    children: ReactNode;
};

export const VKIDProfile = createContext<VKIDProfile>({});

const secondFactorGet = () => {
    const uri = new URL(window.location.href);
    const parts = uri.pathname.split('/');
    const lastSegment = parts.pop() || parts.pop();
    if (lastSegment !== "second") return false;
    if (uri.searchParams.get("type") !== "code_v2") return false
    const secondStep: VKIDSecondStepParams = {
        code: uri.searchParams.get("code") || "",
        device_id: uri.searchParams.get("device_id") || "",
        state: uri.searchParams.get("state") || "",
        ext_id: uri.searchParams.get("ext_id") || "",
        type: uri.searchParams.get("type") || "",
    }
    vkidSecondStepApiV1VkidSecondStepPost({requestBody: secondStep}).then(() => {
        window.location.href = '/';
    })
    return true;
}

export const VKIDProfileProvider: React.FC<VKIDProfileProvider> = ({children}) => {
    const secondFactor = secondFactorGet();
    if (secondFactor) {
        return <AdminGroupSpiner/>;
    }
    const {data, isLoading} = userGetCookies();
    if (isLoading) {
        return <AdminGroupSpiner/>
    }
    if (!data) {
        return <VKIDProfileLogin/>
    }
    return (
        <VKIDProfile.Provider value={{profile: data}}>
            {children}
        </VKIDProfile.Provider>
    );
};
