import {useQuery} from '@tanstack/react-query';
import {getPhotoListApiV1PhotosListGet} from "@colday/api";

export const usePhotosInfo = () => {
    return useQuery({
        queryKey: ["photosInfo"],
        queryFn: () => {
            return getPhotoListApiV1PhotosListGet();
        },
    });
};
