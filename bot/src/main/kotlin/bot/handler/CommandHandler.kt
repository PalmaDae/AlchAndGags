package bot.handler

import com.github.kotlintelegrambot.Bot
import com.github.kotlintelegrambot.entities.ChatId
import com.github.kotlintelegrambot.entities.Message
import org.example.bot.Config

object CommandHandler {
    fun handleStart(bot: Bot, message: Message, config: Config) {
        val chatId = ChatId.fromId(message.chat.id)

        val username = message?.from?.username
        val firstName = message?.from?.firstName
        val lastName = message?.from?.lastName
        val userId = message?.from?.id

        val result = bot.sendMessage(chatId = chatId, text = "")

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

}