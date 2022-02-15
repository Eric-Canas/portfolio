import React, { Component } from "react";

import Layout from "../layout/layout";
import ContentSection from "../components/sections/contentSection";
import Seo from "../components/SEO";

import { graphql } from "gatsby";
import { injectIntl } from "gatsby-plugin-intl";

class Page extends Component {
    constructor(props) {
        super(props);
        //Contentful will not change, so we can cache the data
        const pageProps = props.data.contentfulPage;
        this.name = pageProps.title;
        this.seoTitle = pageProps.seoTitle;
        this.metaDescription = pageProps.metaDescription;
        this.sections = Object.fromEntries(
            pageProps.sections.map((section) => [section.id, section])
        );
        this.hasBottomNavigation = pageProps.sections.length > 1;

        this.state = { section: Object.keys(this.sections)[0] };

        if (this.sections.length === 0)
            throw new Error(`Page ${this.name} has no sections`);
    }

    render() {
        const section = this.sections[this.state.section];
        const { intl } = this.props;
        return (
            <>
            <Seo title={this.seoTitle} description={this.metaDescription} locale={intl.locale}/>
            <Layout
                title={this.name}
                sections={this.hasBottomNavigation && this.sections}
                currentSection={this.hasBottomNavigation && this.state.section}
                onChangeSection={(newValue) =>
                    this.setState({ section: newValue })
                }>
                <ContentSection key={this.state.section} data={section} />
            </Layout>
            </>
        );
    }
}
export default injectIntl(Page);

export const query = graphql`
    query PageQuery($slug: String, $language: String) {
        contentfulPage(slug: { eq: $slug }, node_locale: { eq: $language }) {
            id
            title
            seoTitle
            metaDescription
            sections {
                id
                title
                statisticsSections {
                    ...StatisticsSection
                }
                cardsSections {
                    ...CardsSection
                }
                listSections {
                    ...ListSection
                }
                logosSections {
                    ...LogosSection
                }
            }
        }
    }
`;
