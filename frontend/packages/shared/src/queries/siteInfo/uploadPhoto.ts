import {useMutation} from "@tanstack/react-query";
import {TMutationCustomOptions} from "../types";
import {addPhotoApiV1PhotosPost, AddPhotoApiV1PhotosPostResponse} from "@colday/api";
import queryClient from "../base";

export const uploadPhoto = (
    options: TMutationCustomOptions<AddPhotoApiV1PhotosPostResponse, unknown, (Blob | File | null)> = {}
) => {
    return useMutation<AddPhotoApiV1PhotosPostResponse, unknown, (Blob | File | null)>({
        mutationFn: (values) => {
            if (values === null) return null;
            return addPhotoApiV1PhotosPost({formData: {file: values}})
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
