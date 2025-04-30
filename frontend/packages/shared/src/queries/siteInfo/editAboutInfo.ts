import {useMutation} from "@tanstack/react-query";
import {TMutationCustomOptions} from "../types";
import {changeSiteInfoApiV1SiteInfoPost, ChangeSiteInfoApiV1SiteInfoPostResponse, SiteInfoSchema} from "@colday/api";
import queryClient from "../base";

export const editSiteInfo = (
    options: TMutationCustomOptions<ChangeSiteInfoApiV1SiteInfoPostResponse, unknown, SiteInfoSchema> = {}
) => {
    return useMutation<ChangeSiteInfoApiV1SiteInfoPostResponse, unknown, SiteInfoSchema>({
        mutationFn: (values) => {
            return changeSiteInfoApiV1SiteInfoPost({requestBody: values})
        },
        ...options,
        async onSuccess(...args) {
            await queryClient.invalidateQueries({queryKey: ['siteInfo']});

            if (options.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
}
