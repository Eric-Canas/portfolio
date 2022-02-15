require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});


module.exports = {
    siteMetadata: {
        title: "AI Specialist and Computer Vision Engineer | Eric Canas",
        description:
            "Computer Engineer with a Master's Degree in Artificial Intelligence." +
            " More than 3 years of experience in Computer Vision."+
            " Main Languages: Python & JavaScript.",
        author: "Eric Canas",
        image: "/images/social-image.png",
        keywords:
            "Artificial Intelligence, Computer Vision, Portfolio, Tensorflow, PyTorch, Keras",
        siteUrl: "https://www.ericcanas.com",
        twitterUsername: "@HaruKaeruru",
    },
    plugins: [
        "gatsby-plugin-image",
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        "gatsby-plugin-sitemap",
        "gatsby-plugin-react-helmet",
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                // Learn about environment variables: https://gatsby.dev/env-vars
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                downloadLocal: true,
            },
        },
        {
            resolve: `gatsby-plugin-intl`,
            options: {
                // language JSON resource path
                path: `${__dirname}/src/lang`,
                // supported language
                languages: [`en`, `es`],
                // language file path
                defaultLanguage: `en`,
                // option to redirect to `/en` when connecting `/`
                redirect: false,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Eric Canas Portfolio`,
                short_name: `Eric Canas`,
                description: `Just the Eric Canas resume but fancier`,
                start_url: `/`,
                display: `standalone`,
                icon: `src/images/icon.png`,
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /images/,
                },
            },
        },
    ],
};
