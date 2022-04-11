import React, { Component } from "react";

import Typography from "@mui/material/Typography";

import { LIST_CATEGORY_PROPS, LIST_CATEGORY_SX } from "../../styles/sx/sections/listSx";
import {injectIntl} from "gatsby-plugin-intl";

const INTL_PREFIX = "generals"

class CategoryDivider extends Component {

    getAccumulatedTime() {
        const {intl, entries} = this.props;
        let accumulatedTime = 0;
        for (const entry of entries) {
            let { dateStart, dateFinish, showTime } = entry;
            if (showTime){
                const start = new Date(dateStart);
                const finish = new Date(dateFinish !== null? dateFinish : Date.now());
                const difference = finish.getTime() - start.getTime();
                accumulatedTime += difference;
            }
        }
        if (accumulatedTime === 0)
            return null
        const years = Math.floor(accumulatedTime / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor(
            (accumulatedTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
        );
        const monthsString = intl.formatMessage({ id : `${INTL_PREFIX}.${months > 1? "months" : "month"}`});
       const yearsString = intl.formatMessage({ id : `${INTL_PREFIX}.${years > 1? "years" : "year"}`});
       if (years === 0) {
         return `${months} ${monthsString}`;
      } else {
        if (months === 0) {
          return `${years} ${yearsString}`;
        } else {
          const and = intl.formatMessage({ id : `${INTL_PREFIX}.and`});
          return `${years} ${yearsString} ${and} ${months} ${monthsString}`;
        }
      }
    }

    render() {
        let { category } = this.props;
        const time = this.getAccumulatedTime();
        
        return (
            <>
            <Typography
                {...LIST_CATEGORY_PROPS.TYPOGRAPHY}
                sx={LIST_CATEGORY_SX.DIVIDER}>
                {category}
            </Typography>
             {
                time !== null &&
                <Typography
                    {...LIST_CATEGORY_PROPS.TIME}>
                    &nbsp; {time}
                </Typography>
            }
            </>
        );
    }
}
export default injectIntl(CategoryDivider);
