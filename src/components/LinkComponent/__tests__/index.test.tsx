import React from 'react';
import { screen } from '@testing-library/react';
import styled from 'styled-components';

import { renderBaseProviders } from '../../../test-helpers/testUtils';
import { LinkComponent } from '..';

const StyledLink = styled.a`
  color: red;
`;

describe('<LinkComponent>', () => {
  it('renders an internal and default link', () => {
    renderBaseProviders(
      <LinkComponent href="/page" StyledLink={StyledLink}>
        I am a link
      </LinkComponent>
    );

    expect(screen.getByTestId('internal-link')).toBeInTheDocument();
    expect(screen.getByTestId('internal-link')).toHaveStyleRule('color', 'red');
  });

  it('renders an external and provided link styles', () => {
    renderBaseProviders(
      <LinkComponent href="https://www.google.com" StyledLink={StyledLink}>
        I am a link
      </LinkComponent>
    );

    expect(screen.getByTestId('external-link')).toBeInTheDocument();
    expect(screen.getByTestId('external-link')).toHaveStyleRule('color', 'red');
  });
});
