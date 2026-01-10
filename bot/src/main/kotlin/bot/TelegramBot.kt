package bot

import bot.handler.CommandHandler
import com.github.kotlintelegrambot.bot
import com.github.kotlintelegrambot.dispatch
import com.github.kotlintelegrambot.dispatcher.command
import com.github.kotlintelegrambot.dispatcher.text
import com.github.kotlintelegrambot.entities.ChatId
import org.example.bot.Config

class TelegramBot(
    private val config: Config
) {
    fun start() {
        val bot = bot {
            token = config.botToken
            dispatch {
                command("start") {
                    CommandHandler.handleStart(bot,message,config)
                }

                command("help") {

                }
            }
        }
        bot.startPolling()
    }
}