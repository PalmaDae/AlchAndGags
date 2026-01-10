package bot

import com.github.kotlintelegrambot.bot
import com.github.kotlintelegrambot.dispatch
import com.github.kotlintelegrambot.dispatcher.command
import com.github.kotlintelegrambot.entities.ChatId
import jdk.internal.joptsimple.internal.Messages.message
import org.example.bot.Config

class TelegramBot(
    private val config: Config
) {
    fun start() {
        val bot = bot {
            token = config.botToken
            dispatch {
                command("start") {
                    val result = bot.sendMessage(chatId = ChatId.fromId(message.chat.id), text = "Здарова, долбаёб " + config.miniAppUrl)
                    result.fold({

                    },{

                    })
                }
            }
        }
        bot.startPolling()
    }
}