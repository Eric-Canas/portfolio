require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});


module.exports = {
    siteMetadata: {
        siteUrl: "https://www.ericcanas.com",
        title: "AI Specialist and Computer Vision Engineer | Eric Canas",
        description:
            "Computer Engineer with a Master's Degree in Artificial Intelligence." +
            " More than 3 years of experience in Computer Vision."+
            " Main Languages: Python & JavaScript.",
        author: "Eric Canas",
        image: "/images/social-image.png",
        keywords:
            "Artificial Intelligence, Computer Vision, Portfolio, Tensorflow, PyTorch, Keras",
        twitterUsername: "@HaruKaeruru",
    },
    plugins: [
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-react-helmet",
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
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
                description: `AI Specialist and Computer Vision Engineer | Eric Canas`,
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
        {
            resolve: `gatsby-plugin-multi-language-sitemap`,
            options: {
              output: '/',
              langs: ['en', 'es'],
            },
          },
          {
              resolve: `gatsby-plugin-robots-txt`,
                options: {
                    host: "https://www.ericcanas.com",
                    sitemap: "https://www.ericcanas.com/sitemap-index.xml",
                    policy: [{ userAgent: "*", allow: "/" }],
                },
          }
    ],
};
