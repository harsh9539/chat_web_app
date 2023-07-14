/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        appDir:true,
        swcPlugins:[
            ["next-superjson-plugin",{}]
        ]
    },
    images:{
        domains:[
            "res.cloundinary.com",
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",
            "upload.wikimedia.org"
        ]
    }
}

module.exports = nextConfig
