import { graphql } from "gatsby";

//TODO: That's copied to the width field in graphql fragment. Find a better way.
export const CARD_WIDTH = 250;
export const MODAL_WIDTH = 1000;
export const LOGO_WIDTH = 70;

export const CARD_IMAGE = graphql`
    fragment CardImage on ContentfulAsset {
        id
        title
        description
        gatsbyImageData(
            width: 250
            aspectRatio: 1.5
            resizingBehavior: FILL
            cropFocus: CENTER
            layout: CONSTRAINED
        )
    }
`;
export const CAROUSEL_IMAGE = graphql`
    fragment CarouselImage on ContentfulAsset {
        id
        title
        description
        gatsbyImageData(
            width: 1000
            aspectRatio: 2.5
            resizingBehavior: PAD
            cropFocus: CENTER
            layout: CONSTRAINED
        )
    }
`;

export const LIST_IMAGE = graphql`
    fragment ListImage on ContentfulAsset {
        id
        title
        description
        gatsbyImageData(
            width: 250
            resizingBehavior: PAD
            cropFocus: CENTER
            layout: CONSTRAINED
        )
    }
`;

export const AVATAR_IMAGE = graphql`
    fragment AvatarImage on ContentfulAsset {
        id
        title
        description
        gatsbyImageData(
            width: 175
            resizingBehavior: PAD
            cropFocus: CENTER
            layout: CONSTRAINED
        )
    }
`;

export const LINK_BUTTON = graphql`
    fragment LinkButton on ContentfulLinkButton {
        id
        type
        url
        isPrimary
        icon
        pdf {
            file {
                url
            }
        }
    }
`;

export const File = graphql`
    fragment File on ContentfulAsset {
        file {
            fileName
            url
            contentType
        }
    }
`;

export const LogoImage = graphql`
    fragment LogoImage on ContentfulAsset {
        id
        title
        description
        gatsbyImageData(
            width: 70
            resizingBehavior: PAD
            cropFocus: CENTER
            layout: CONSTRAINED
        )
        file {
            contentType
            url
        }
    }
`;

export const LOGO = graphql`
    fragment Logo on ContentfulLogo {
        id
        name
        brightnessOnDarkTheme
        usage
        url
        description {
            raw
        }
        image {
            ...LogoImage
        }
    }
`;

export const LOGOS_SECTION = graphql`
    fragment LogosSection on ContentfulLogosSection {
        id
        header
        logos {
            ...Logo
        }
        bigSize
    }
`;

export const MORE_DETAILS_MODAL = graphql`
    fragment Modal on ContentfulModalInfo {
        title
        carouselTime
        imagesCarousel {
            id
            title
            description
            ...CarouselImage
        }
        detailedDescription {
            raw
        }
        logosSections {
            ...LogosSection
        }
        linkButtons {
            ...LinkButton
        }
    }
`;

export const CARDS_CONTENT_FRAGMENT = graphql`
    fragment Card on ContentfulCard {
        id
        title
        category
        shortDescription {
            shortDescription
        }
        moreDetailsModal {
            ...Modal
        }
        mainImage {
            ...CardImage
        }
    }
`;

export const CARD_SECTION_FRAGMENT = graphql`
    fragment CardsSection on ContentfulCardsSection {
        id
        title
        cards {
            ...Card
        }
    }
`;

export const ACADEMIC_MARK_ENTRY_FRAGMENT = graphql`
    fragment AcademicMarkEntry on ContentfulAcademicMarkEntry {
        id
        subject
        numericalMark
        ects
        year
        semester
        knowledgeBranch {
            knowledgeBranch
            knowledgeBranchColor
        }
        grade {
            categoricalMark
            categoricalMarkColor
        }
    }
`;

export const STATISTICS_CONTENT_FRAGMENT = graphql`
    fragment StatisticsSection on ContentfulStatisticsSection {
        id
        title
        charts
        data {
            ...AcademicMarkEntry
        }
        certificate {
            ...File
        }
    }
`;

export const LIST_ENTRY = graphql`
    fragment ListEntry on ContentfulListEntry {
        id
        title
        description{
            raw
        }
        category
        url
        dateStart
        dateFinish
        showTime
        image {
            ...ListImage
        }
    }
`;

export const LIST_CONTENT_FRAGMENT = graphql`
    fragment ListSection on ContentfulListSection {
        id
        title
        listEntries {
            ...ListEntry
        }
    }
`;
