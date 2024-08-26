import {useMutation} from "@tanstack/react-query";
import {TMutationCustomOptions} from "../types";
import {deletePhotoByIdApiV1PhotosPhotoIdDelete, DeletePhotoByIdApiV1PhotosPhotoIdDeleteResponse} from "@colday/api";
import queryClient from "../base";

export const deletePhoto = (
    options: TMutationCustomOptions<DeletePhotoByIdApiV1PhotosPhotoIdDeleteResponse, unknown, number> = {}
) => {
    return useMutation<DeletePhotoByIdApiV1PhotosPhotoIdDeleteResponse, unknown, number>({
        // @ts-ignore
        mutationFn: (values) => {
            return deletePhotoByIdApiV1PhotosPhotoIdDelete({photoId: values})
        },
        ...options,
        async onSuccess(...args) {
            await queryClient.invalidateQueries({queryKey: ['photosInfo']});

            if (options.onSuccess) {
                options.onSuccess(...args);
            }
        },
    });
}
