export enum AdminPanelMenu {
    menu = "menu",
    aboutInfo = "aboutInfo",
    aboutLinks = "aboutLinks",
    aboutPlayAudio = "aboutPlayAudio",
}

export const AdminPanelMenuTitle = new Map<AdminPanelMenu, string>([
    [AdminPanelMenu.menu, "Настройки"],
    [AdminPanelMenu.aboutInfo, "Главная страница"],
    [AdminPanelMenu.aboutLinks, "Ссылки"],
    [AdminPanelMenu.aboutPlayAudio, "Плеер"],
])
