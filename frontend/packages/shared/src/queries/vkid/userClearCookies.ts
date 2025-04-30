import {vkidLogoutApiV1VkidLogoutPost} from "@colday/api";

export const userClearCookies = () => {
    vkidLogoutApiV1VkidLogoutPost().finally(() => {
        window.location.href = '/'
    })
}
