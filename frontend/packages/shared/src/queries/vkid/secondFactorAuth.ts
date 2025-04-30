import {useMutation} from "@tanstack/react-query";
import {TMutationCustomOptions} from "../types";
import {
    vkidSecondStepApiV1VkidSecondStepPost,
    VkidSecondStepApiV1VkidSecondStepPostResponse,
    VKIDSecondStepParams
} from "@colday/api";
import queryClient from "../base";

export const secondFactorAuth = (
    options: TMutationCustomOptions<VkidSecondStepApiV1VkidSecondStepPostResponse, unknown, VKIDSecondStepParams> = {}
) => {
    return useMutation<VkidSecondStepApiV1VkidSecondStepPostResponse, unknown, VKIDSecondStepParams>({
        mutationFn: (values) => {
            return vkidSecondStepApiV1VkidSecondStepPost({requestBody: values})
        },
        ...options,
        async onSuccess(...args) {
            await queryClient.invalidateQueries({queryKey: ['firstFactorAuth', 'userGetCookies']});

            if (options.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
}
