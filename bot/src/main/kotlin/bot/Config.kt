package org.example.bot

data class Config(
    val botToken: String,
    val miniAppUrl: String
) {
    companion object {
        fun load(): Config {
            return Config(
                botToken = "8527410578:AAFpnkjh_mdXxdid7gFmMNehAfruIAFiRbc"
                    ?: error("Token is not set")
                ,
                miniAppUrl = "http://dolbaeb.com"
                    ?: error("MiniAppUrl is not set")
            )
        }
    }
}