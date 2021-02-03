import { formatPageTitle } from '.';

describe('formatPageTitle', () => {
  it('adds the site name to the page title', () => {
    const result = formatPageTitle('Contact Us');
    expect(result).toEqual('Contact Us | Moderna');
  });
});
