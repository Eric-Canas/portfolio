import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ContactFormFields from "../components/contact/contactFormFields";
import SendButton from "../components/contact/sendButton";
import Layout from "../layout/layout";
import Seo from "../components/SEO";

import { graphql } from "gatsby";
import { CONTACT_FORM_SX } from "../styles/sx/pageSx";
import { injectIntl } from "gatsby-plugin-intl"

class ContactMe extends Component {
    constructor(props) {
        super(props);
        const pageProps = props.data.contentfulContactPage;
        this.header = pageProps.header;
        this.formApi = pageProps.formApi;
        this.seoTitle = pageProps.seoTitle;
        this.metaDescription = pageProps.metaDescription;
    }

    render() {
        const { intl } = this.props;
        return (
            <>
                <Seo title={this.props.title} description={this.props.metaDescription} locale = {intl.locale}/>
                <Layout title={intl.formatMessage({ id: "contact.title" })}>
                    <Container
                        component='section'
                        sx={CONTACT_FORM_SX.WRAPPER}>
                        <Typography variant='h5' component='h2' color="text.primary" gutterBottom>
                            {this.header}
                        </Typography>
                        <Grid
                            container
                            component='form'
                            action={this.formApi}
                            method='POST'
                            spacing={2}>
                                
                            <ContactFormFields />

                            <SendButton />

                        </Grid>
                    </Container>
                </Layout>
            </>
        );
    }
}
export default injectIntl(ContactMe);

export const query = graphql`
    query ContactPageQuery($language: String) {
        contentfulContactPage(node_locale: { eq: $language }) {
            header
            formApi
            seoTitle
            metaDescription
        }
    }
`;