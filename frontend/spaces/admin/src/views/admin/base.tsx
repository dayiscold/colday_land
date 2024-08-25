export enum AdminPanelMenu {
    menu = "menu",
    aboutInfo = "aboutInfo",
    aboutLinks = "aboutLinks",
    aboutPlayAudio = "aboutPlayAudio",
    photos = "photos",
    upload_photos = "upload_photos",
}

export const AdminPanelMenuTitle = new Map<AdminPanelMenu, string>([
    [AdminPanelMenu.menu, "Настройки"],
    [AdminPanelMenu.aboutInfo, "Главная страница"],
    [AdminPanelMenu.aboutLinks, "Ссылки"],
    [AdminPanelMenu.aboutPlayAudio, "Плеер"],
    [AdminPanelMenu.photos, "Фото"],
    [AdminPanelMenu.upload_photos, "Загрузка фото"],
])
