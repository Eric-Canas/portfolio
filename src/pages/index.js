import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box'
import Layout from "../layout/layout";

import IndexHeader from "../components/home/indexHeader";
import IndexFooter from "../components/home/indexFooter";
import LogosSection from "../components/sections/logosSection/logosSection";
import Seo from "../components/SEO";

import { HOME_ARTICLE_OPTIONS } from "../constants/contentfulRichTextConfig";
import { INDEX_SX } from "../styles/sx/pageSx";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { injectIntl } from "gatsby-plugin-intl";

class Index extends Component {
    constructor(props) {
        super(props);
        this.pageProps = props.data.contentfulHomePage;
        this.avatarImage = getImage(this.pageProps.profileImage);
    }

    render() {
        const {
            name,
            subheader,
            description,
            logosSections,
            seoTitle,
            metaDescription,
        } = this.pageProps;
        const { intl } = this.props;
        return (
            <>
                <Seo title={seoTitle} description={metaDescription} locale={intl.locale} />
                <Layout title={name}>
                    <Box component='main' sx={INDEX_SX.WRAPPER}>
                        <IndexHeader
                            avatarImage={this.avatarImage}
                            name={name}
                            subheader={subheader}
                        />

                        <Grid container component='article'>
                            {documentToReactComponents(
                                JSON.parse(description.raw),
                                HOME_ARTICLE_OPTIONS
                            )}
                            {logosSections.map((logosSection) => (
                                <Grid
                                    item
                                    xs={12}
                                    key={logosSection.id}
                                    sx={INDEX_SX.LOGOS_SECTION}>
                                    <LogosSection data={logosSection} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <IndexFooter />
                </Layout>
            </>
        );
    }
}
export default injectIntl(Index);

export const query = graphql`
    query HomePageQuery($language: String) {
        contentfulHomePage(node_locale: { eq: $language }) {
            name
            subheader
            description {
                raw
            }
            profileImage {
                ...AvatarImage
            }
            logosSections {
                ...LogosSection
            }
            seoTitle
            metaDescription
        }
    }
`;
