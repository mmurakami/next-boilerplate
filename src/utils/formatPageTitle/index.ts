// TODO: Change when we add localization
export const siteTitle = 'Sitename';
const divider = '|';

export const formatPageTitle = (pageTitle?: string): string => {
  return pageTitle ? `${pageTitle} ${divider} ${siteTitle}` : siteTitle;
};
