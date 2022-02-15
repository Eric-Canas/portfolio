import React, { Component } from "react";

import Typography from "@mui/material/Typography";

import { capitalize } from "../../../auxiliars/strings";
import { LIST_ENTRY_PROPS } from "../../../styles/sx/sections/listSx";
import {injectIntl} from "gatsby-plugin-intl";

const DATE_FORMAT = {
  month: "long",
  year: "numeric",
};

const INTL_PREFIX = "generals"
class DateSubheader extends Component {

  getString() {
    const {intl} = this.props;
    const {locale} = intl;
    const result = { date : null, duration : null}
    
    if (this.props.dateStart && this.props.dateFinish) {
      const start = new Date(this.props.dateStart);
      const finish = new Date(this.props.dateFinish);
      const difference = finish.getTime() - start.getTime();
      //Get the difference in years and months as a string
      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor(
        (difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
      );
      const dateConnector = intl.formatMessage({ id : `${INTL_PREFIX}.dateConnector`});
      const date = `${capitalize(start.toLocaleDateString(locale, DATE_FORMAT))}
       ${dateConnector} ${capitalize(finish.toLocaleDateString(locale, DATE_FORMAT))}`;
      result.date = date;
       const monthsString = intl.formatMessage({ id : `${INTL_PREFIX}.${months > 1? "months" : "month"}`});
       const yearsString = intl.formatMessage({ id : `${INTL_PREFIX}.${years > 1? "years" : "year"}`});
       if (years === 0) {
         result.duration = `${months} ${monthsString}`;
      } else {
        if (months === 0) {
          result.duration = `${years} ${yearsString}`;
        } else {
          const and = intl.formatMessage({ id : `${INTL_PREFIX}.and`});
          result.duration = `${years} ${yearsString} ${and} ${months} ${monthsString}`;
        }
      }
    } else if (this.props.dateStart || this.props.dateFinish) {
      const date = new Date(this.props.dateStart || this.props.dateFinish);
      result.date = capitalize(date.toLocaleDateString(locale, DATE_FORMAT));
    }
    return result;
  }

  render() {
    const {date, duration} = this.getString();
    return (
      <>
        {date? (
          <Typography
            {...LIST_ENTRY_PROPS.DATE_TYPOGRAPHY}
          >
            {date}
            {duration && (
              <>
                <span> – </span>
                <em>{duration}</em>
              </>
            )}
          </Typography>
        ) : null}
      </>
    );
  }
}
export default injectIntl(DateSubheader);
