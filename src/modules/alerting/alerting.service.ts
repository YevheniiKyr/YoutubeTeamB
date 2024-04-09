import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as TelegramBot from "node-telegram-bot-api";

export enum AlertStatusEnum {
    warning,
    error,
    info
}


@Injectable()
export class AlertingService {
    bot: TelegramBot;
    public constructor(public readonly configService: ConfigService) {
        this.bot =  new TelegramBot(this.configService.get('telegram.apiToken'), {polling: true});
    }

    public alert(text: string, status: AlertStatusEnum) {
        this.bot.sendMessage(
            this.configService.get('telegram.alertingChat'),
            `${this.getEmoji(status)} ${text}`
        )
    }

    private getEmoji(status: AlertStatusEnum) {
        let result;
        switch(status) {
            case AlertStatusEnum.error:
                result = '❗'
            case AlertStatusEnum.warning:
                result = '⚠️';
            case AlertStatusEnum.info:
                result = '✅';
        } 
        return result;
    }
}