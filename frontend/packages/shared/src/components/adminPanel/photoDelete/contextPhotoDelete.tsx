import {createContext, ReactNode, useState} from 'react';

type VkAdminPhotos = {
    id: number;
    filename: string;
    url: string;
};

type VkAdminPhotosContextProps = {
    photo: VkAdminPhotos
    setPhoto: (photo: VkAdminPhotos) => void
};
export const VkAdminPhotosContext = createContext<VkAdminPhotosContextProps>({
    photo: {
        id: -1,
        filename: '',
        url: '',
    },
    setPhoto: () => {

    },
});

type VkAdminPhotosProviderProps = {
    children: ReactNode;
}

export const VkAdminPhotosProvider: React.FC<VkAdminPhotosProviderProps> = ({children}) => {
    const [photo, setPhoto] = useState<VkAdminPhotos>(
        {
            id: -1,
            filename: '',
            url: '',
        }
    );
    const contextValue: VkAdminPhotosContextProps = {
        photo,
        setPhoto,
    };
    return (
        <VkAdminPhotosContext.Provider value={contextValue}>
            {children}
        </VkAdminPhotosContext.Provider>
    );
};
