// src/global.d.ts
export {};

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                chatId: string | number;
                // Add other properties or methods if needed
            };
        };
    }
}
