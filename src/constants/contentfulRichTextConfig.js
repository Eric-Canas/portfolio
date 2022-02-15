import React from "react";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import {
    HYPERLINK_COMPONENT_PROPS,
    MODAL_ARTICLE_COMPONENT_PROPS,
    MODAL_ARTICLE_SX,
} from "../styles/sx/richText";
import { Link as InternalLink } from "gatsby-plugin-intl";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

const HYPERLINKS = (node, children) => {
    if (node.data.uri.startsWith("/")) {
        const link = React.forwardRef((props, ref) => (
            <InternalLink innerRef={ref} {...props} />
        ));
        return (
            <b>
                <Link
                    underline='hover'
                    component={link}
                    to={node.data.uri}>
                    {children}
                </Link>
            </b>
        );
    } else
        return (
            <b>
                <Link
                    {...HYPERLINK_COMPONENT_PROPS}
                    href={node.data.uri}>
                    {children}
                </Link>
            </b>
        );
}


export const MODAL_ARTICLE_OPTIONS = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => (
            <Typography
                {...MODAL_ARTICLE_COMPONENT_PROPS.PARAGRAPH}
                sx={MODAL_ARTICLE_SX.PARAGRAPH}>
                {children}
            </Typography>
        ),
        [BLOCKS.HEADING_4]: (node, children) => (
            <Typography
                {...MODAL_ARTICLE_COMPONENT_PROPS.SUBHEADING}
                sx={MODAL_ARTICLE_SX.SUBHEADING}>
                {children}
            </Typography>
        ),
        [BLOCKS.OL_LIST]: (node, children) => (
            <Typography component='ol' sx={MODAL_ARTICLE_SX.OL}>
                {children}
            </Typography>
        ),
        [INLINES.HYPERLINK]: HYPERLINKS,
    },
};

export const HOME_ARTICLE_OPTIONS = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => (
            <Typography variant='body1' color='text.primary' sx={{ mt: 1 }}>
                {children}
            </Typography>
        ),
        [INLINES.HYPERLINK]: HYPERLINKS,
    },
};

export const TOOLTIP_ARTICLE_OPTIONS = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => (
            <Typography variant='body2' sx={{mb : 0.25, mt : 0.25}}>{children}</Typography>
        ),
        [INLINES.HYPERLINK]: (node, children) => {
            if (node.data.uri.startsWith("/")) {
                const link = React.forwardRef((props, ref) => (
                    <InternalLink innerRef={ref} {...props} />
                ));
                return (
                    <b>
                        <Link
                            underline='hover'
                            color='lightskyblue'
                            component={link}
                            to={node.data.uri}>
                            {children}
                        </Link>
                    </b>
                );
            } else
                return (
                    <b>
                        <Link
                            {...HYPERLINK_COMPONENT_PROPS}
                            color='lightskyblue'
                            href={node.data.uri}>
                            {children}
                        </Link>
                    </b>
                );
        },
    },
};

export const LIST_ENTRY_OPTIONS = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => (
            <>
            <Typography component="span"
                {...MODAL_ARTICLE_COMPONENT_PROPS.PARAGRAPH}>
                {children}
            </Typography>
            <br/>
            </>
        ),
        [INLINES.HYPERLINK]: HYPERLINKS
    },
};