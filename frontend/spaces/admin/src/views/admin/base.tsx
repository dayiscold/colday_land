export enum AdminPanelMenu {
    menu = "menu",
    aboutInfo = "aboutInfo",
    aboutLinks = "aboutLinks",
    aboutPlayAudio = "aboutPlayAudio",
    photos = "photos",
    uploadPhotos = "uploadPhotos",
    deletePhotos = "deletePhotos",
}

export const AdminPanelMenuTitle = new Map<AdminPanelMenu, string>([
    [AdminPanelMenu.menu, "Настройки"],
    [AdminPanelMenu.aboutInfo, "Главная страница"],
    [AdminPanelMenu.aboutLinks, "Ссылки"],
    [AdminPanelMenu.aboutPlayAudio, "Плеер"],
    [AdminPanelMenu.photos, "Фото"],
    [AdminPanelMenu.uploadPhotos, "Загрузка фото"],
    [AdminPanelMenu.deletePhotos, "Просмотр фото"],
])
