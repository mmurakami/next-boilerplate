import React from 'react';
import { StyledComponent, DefaultTheme } from 'styled-components';
import Link from 'next/link';

// TODO: Import NextLink type from Component Library and use instead.

interface ILinkComponent {
  children: React.ReactNode;
  href: string;
  StyledLink: StyledComponent<
    'a',
    DefaultTheme,
    Record<string, unknown>,
    never
  >;
  [x: string]: unknown; // To account for rest arguments for either external or internal links
}

// This Component is mainly meant to be used in conjunction with the Component Library.
// Since Create-React-App has no knowledge of next we need to pass it the Link from Next.
export const LinkComponent = ({
  children,
  href,
  StyledLink,
  ...rest
}: ILinkComponent): JSX.Element => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} passHref {...rest}>
        <StyledLink data-testid="internal-link">{children}</StyledLink>
      </Link>
    );
  }

  return (
    <StyledLink href={href} {...rest} data-testid="external-link">
      {children}
    </StyledLink>
  );
};
