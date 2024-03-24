export default {
    BE_PORT: process.env.BE_PORT ?? '',
    MONGODB_URI: process.env.MONGODB_URI ?? '',
    SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN ?? '',
    COOKIE_HTTP_ONLY: process.env.COOKIE_HTTP_ONLY ?? false,
    COOKIE_SECURE: process.env.COOKIE_SECURE ?? false
}