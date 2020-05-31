import * as React from 'react';

export const NavRef = React.createRef();

// allow use of React Navigator without props 
export function navigate(name, params) {
  NavRef.current?.navigate(name, params);
}
