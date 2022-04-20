import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SchoolIcon from '@mui/icons-material/School';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import BarChartIcon from '@mui/icons-material/BarChart';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import GitHubIcon from '@mui/icons-material/GitHub';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';
import HttpIcon from '@mui/icons-material/Http';
import PreviewIcon from '@mui/icons-material/Preview';
import WorkIcon from '@mui/icons-material/Work';
import BuildIcon from '@mui/icons-material/Build';
import AttractionsIcon from '@mui/icons-material/Attractions';

export const HOME = 'Home';
export const EMAIL = 'Email';
export const SEND = 'Send';
export const BACK = 'Back';
export const LIGHT_MODE = 'Light';
export const DARK_MODE = 'Dark';
export const GITHUB = 'GitHub';
export const LINKEDIN = 'LinkedIn';
export const PDF = 'PictureAsPdf';

const WORKSPACE_PREMIUM = 'WorkspacePremium';
const SCHOOL = 'School';
const WORK = 'Work';
const HISTORY_EDU = 'HistoryEdu';
const BUILD = 'Build';
const NEWSPAPER = 'Newspaper';
const CODE = 'Code';
const HTTP = 'Http';
const PREVIEW = 'Preview';
const ATTRACTIONS = 'Attractions';

const ICONS = {
    [LIGHT_MODE] : <BrightnessHighIcon />,
    [DARK_MODE] : <Brightness4Icon />,
    [HOME]: <HomeIcon/>,
    [EMAIL] : <EmailIcon/>,
    [SEND] : <SendIcon/>,
    [BACK] : <ArrowBackIosNewIcon/>,
    [WORKSPACE_PREMIUM]: <WorkspacePremiumIcon/>,
    [SCHOOL]: <SchoolIcon/>,
    [WORK]: <WorkIcon/>,
    [HISTORY_EDU]: <HistoryEduIcon/>,
    [BUILD]: <BuildIcon/>,
    [NEWSPAPER]: <NewspaperIcon/>,
    [CODE]: <CodeIcon/>,
    [HTTP]: <HttpIcon/>,
    [PREVIEW]: <PreviewIcon/>,
    [ATTRACTIONS]: <AttractionsIcon/>,
    [GITHUB]: <GitHubIcon/>,
    [LINKEDIN]: <LinkedInIcon/>,
    [PDF]: <PictureAsPdfIcon/>

}
export default ICONS;

export const THIN_BIN = 'Small Bin';
export const THICK_BIN = 'Large Bin';

export const STATIC_ICONS = {
    [THIN_BIN]: <BarChartIcon/>,
    [THICK_BIN]: <EqualizerIcon/>
}