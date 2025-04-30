import {useQuery} from '@tanstack/react-query';
import {readSiteInfoApiV1SiteInfoGet} from "@colday/api";

export const useGetSiteInfo = () => {
    return useQuery({
        queryKey: ["siteInfo"],
        queryFn: () => {
            return readSiteInfoApiV1SiteInfoGet();
        },
    });
};
