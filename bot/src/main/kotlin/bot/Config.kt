package org.example.bot

data class Config(
    val botToken: String,
    val miniAppUrl: String
) {
    companion object {
        fun load(): Config {
            return Config(
                botToken = "TOKEN"
                    ?: error("Token is not set")
                ,
                miniAppUrl = "URL"
                    ?: error("MiniAppUrl is not set")
            )
        }
    }
}