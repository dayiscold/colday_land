// This file is auto-generated by @hey-api/openapi-ts

export type Body_add_photo_api_v1_photos_post = {
    file: (Blob | File);
};

export type HTTPValidationError = {
    detail?: Array<ValidationError>;
};

export type LinksSchema = {
    id: string;
    url: string;
    type: string;
    path: string;
};

export type PhotoAddSchema = {
    id: number;
    filename: string;
};

export type PhotoListSchema = {
    photos?: Array<PhotoAddSchema>;
};

export type ReleasesSchema = {
    releases?: Array<ReleasesSchemaItem>;
};

export type ReleasesSchemaItem = {
    id: number;
    created_at: string;
    updated_at: string | null;
    description: string | null;
    file_id: string;
    link: string;
};

export type SiteInfoEdit = {
    message: string;
};

export type SiteInfoPlayWidget = {
    title: string;
    description: string;
    color: string;
    color_card: string;
    url: string;
    button_name?: string;
    photo_path: string;
    song_source: string;
};

export type SiteInfoSchema = {
    name: string;
    description: string;
    year?: number;
    links?: Array<LinksSchema> | null;
    play_widget?: SiteInfoPlayWidget | null;
};

export type VKIDFirstStepParams = {
    code_challenge: string;
    code_challenge_method?: string;
    state: string;
    scopes?: string;
    client_id: string;
};

export type VKIDSecondStepParams = {
    code: string;
    state: string;
    device_id: string;
};

export type ValidationError = {
    loc: Array<(string | number)>;
    msg: string;
    type: string;
};

export type ReadSiteInfoApiV1SiteInfoGetResponse = SiteInfoSchema;

export type ChangeSiteInfoApiV1SiteInfoPostData = {
    requestBody: SiteInfoSchema;
};

export type ChangeSiteInfoApiV1SiteInfoPostResponse = SiteInfoEdit;

export type HomePageGetResponse = string;

export type UploadFormUploadPhotoGetResponse = string;

export type LoginFormLoginGetResponse = string;

export type GetPhotoListApiV1PhotosListGetResponse = PhotoListSchema;

export type AddPhotoApiV1PhotosPostData = {
    formData: Body_add_photo_api_v1_photos_post;
};

export type AddPhotoApiV1PhotosPostResponse = PhotoAddSchema;

export type DeletePhotoByIdApiV1PhotosPhotoIdDeleteData = {
    photoId: number;
};

export type DeletePhotoByIdApiV1PhotosPhotoIdDeleteResponse = PhotoAddSchema;

export type GetPhotoFromIdApiV1PhotosPhotoIdGetData = {
    photoId: number;
};

export type GetPhotoFromIdApiV1PhotosPhotoIdGetResponse = unknown;

export type ReleasesHandlerApiV1ReleasesGetData = {
    releases?: string | null;
};

export type ReleasesHandlerApiV1ReleasesGetResponse = ReleasesSchema;

export type VkidFirstStepApiV1VkidFirstStepPostResponse = VKIDFirstStepParams;

export type VkidSecondStepApiV1VkidSecondStepPostData = {
    requestBody: VKIDSecondStepParams;
};

export type VkidSecondStepApiV1VkidSecondStepPostResponse = unknown;

export type VkidLogoutApiV1VkidLogoutPostData = {
    requestBody: VKIDSecondStepParams;
};

export type VkidLogoutApiV1VkidLogoutPostResponse = unknown;