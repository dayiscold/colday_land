import {useQuery} from "@tanstack/react-query";
import {vkidFirstStepApiV1VkidFirstStepPost} from "@colday/api";

export const firstFactorAuth = () => {
    return useQuery({
        queryKey: ["firstFactorAuth"],
        queryFn: () => {
            return vkidFirstStepApiV1VkidFirstStepPost();
        },
        retry: 0,
    });
}
