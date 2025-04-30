import {useQuery} from "@tanstack/react-query";
import {vkidProfileApiV1VkidProfileGet} from "@colday/api";

export const userGetCookies = () => {
    return useQuery({
        queryKey: ["userGetCookies"],
        queryFn: () => {
            return vkidProfileApiV1VkidProfileGet();
        },
        retry: 0,
    });
}
