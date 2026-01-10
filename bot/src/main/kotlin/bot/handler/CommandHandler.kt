package bot.handler

import com.github.kotlintelegrambot.Bot
import com.github.kotlintelegrambot.entities.ChatId
import com.github.kotlintelegrambot.entities.InlineKeyboardMarkup
import com.github.kotlintelegrambot.entities.Message
import com.github.kotlintelegrambot.entities.TelegramFile
import com.github.kotlintelegrambot.entities.keyboard.InlineKeyboardButton
import org.example.bot.Config
import java.io.File

object CommandHandler {
    fun handleStart(bot: Bot, message: Message, config: Config) {
        val chatId = ChatId.fromId(message.chat.id)

        val messageText = "Здарова, долбаёб " + config.miniAppUrl

        val username = message?.from?.username
        val firstName = message?.from?.firstName
        val lastName = message?.from?.lastName
        val userId = message?.from?.id

        val result = bot.sendMessage(chatId = chatId, text = messageText)

        result.fold(
            {
                println("Message sent successfully")
                println(
                    "Bot get message by user: $username\n" +
                            "His name is: $firstName $lastName\n" +
                            "UserID: $userId"
                )
            },
            {
                println("Failed to send message: $it")
            }
        )
    }

    fun handleApp(bot: Bot, message: Message, config: Config) {
        val chatId = ChatId.fromId(message.chat.id)

        val button = InlineKeyboardButton.Url (
            text = "Открыть волшебную карту",
            url = "https://github.com/PalmaDae/AlchAndGags"
        )

        val textMessage = "Добро пожаловать в мир магии и алхимии\n" +
                "\n" +
                "Вас ждёт удивительное приключение в Нижнекамском Хогвартсе"

        //Долго
        val logoFile = File("/home/palmadae/IdeaProjects/AlchAndGags/bot/src/main/resources/images/logo.png")

        if (logoFile.exists()) {
            println("photo is exist")
            bot.sendPhoto(
                chatId = chatId,
                //Убрали обработку внутри, потому что она пиздец как долго грузилась
//                photo = TelegramFile.ByFile(logoFile),
                photo = "https://downloader.disk.yandex.ru/preview/e7669a2c6fae44a957f5a9f03805a04050f2fb40321622a945eb2596f4b02dfe/69626886/_ZgAX0mlLFFSdAR-7zUuQKs04UiZ6IMqR9NN2Q3MFhVRuT8wyX2vQ7CEdntklMzJug9UJQZOayP5FydV8LzCVA%3D%3D?uid=0&filename=photo_2025-06-22_23-43-10.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v3&size=2048x2048",
                caption = textMessage,
                replyMarkup = InlineKeyboardMarkup.create(listOf(button))
            )
        } else {
            bot.sendMessage(
                chatId = chatId,
                text = "We lost logo",
                replyMarkup = InlineKeyboardMarkup.create(listOf(button))
            )
        }
    }
}