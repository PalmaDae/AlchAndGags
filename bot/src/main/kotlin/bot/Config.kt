package org.example.bot

data class Config(
    val botToken: String,
    val miniAppUrl: String
) {
    companion object {
        fun load(): Config {
            return Config(
                botToken = System.getenv("BOT_TOKEN")
                    ?: error("Token is not set")
                ,
                miniAppUrl = System.getenv("MINI_APP_URL")
                    ?: error("MiniAppUrl is not set")
            )
        }
    }
}