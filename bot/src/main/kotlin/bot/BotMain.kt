package org.example.bot

import bot.TelegramBot

fun main() {
    val config = Config.load()
    TelegramBot(config).start()
}