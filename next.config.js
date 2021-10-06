const withTM = require('next-transpile-modules')([
    '@fullcalendar/common',
    '@fullcalendar/react',
    '@fullcalendar/daygrid',
    '@fullcalendar/timegrid'
])

module.exports = withTM({
    images: {
        domains: ['image.flaticon.com'],
      },
    env : {
        MONGO_URI: "mongodb+srv://admin_user:kero89lFTaFGRkYw@cluster0.oet9a.mongodb.net/event_db?retryWrites=true&w=majority",
        OAUTH_CLIENT_ID: "aNoxlQnquIXmJK62J0KsviYtscjZ1KUx",
        OAUTH_DOMAIN: "dev-zdebyxm4.eu.auth0.com",
        OAUTH_CLIENT_SECRET: "C30LcC2IC3zs5Xe8itiuv60glIlWpn3sqXTUWXmwwVr-VgYriCE0eFv8YLEgmArh"
    }
})