// tslint:disable:no-unnecessary-generics

import {
  AnchorHTMLAttributes,
  FunctionComponent,
  PropsWithChildren,
  ComponentType,
  ReactElement,
  ReactChild,
  ReactPortal,
} from "react";

import {
  Path,
  BaseLocationHook,
  HookReturnValue,
  HookNavigationOptions,
  LocationHook,
} from "../use-location";

import { DefaultParams, Params, Match, MatcherFn } from "../matcher";

// re-export types from these modules
export * from "../matcher";
export * from "../use-location";

// React <18 only: fixes incorrect `ReactNode` declaration that had `{}` in the union.
// This issue has been fixed in React 18 type declaration.
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210
type ReactNode = ReactChild | Iterable<ReactNode> | ReactPortal | boolean | null | undefined;

/*
 * Components: <Route />
 */

export interface RouteComponentProps<T extends DefaultParams = DefaultParams> {
  params: T;
}

export interface RouteProps<T extends DefaultParams = DefaultParams> {
  children?: ((params: Params<T>) => ReactNode) | ReactNode;
  path?: Path;
  component?: ComponentType<RouteComponentProps<T>>;
}

export function Route<T extends DefaultParams = DefaultParams>(
  props: RouteProps<T>
): ReactElement | null;

/*
 * Components: <Link /> & <Redirect />
 */

export type NavigationalProps<H extends BaseLocationHook = LocationHook> = (
  | { to: Path; href?: never }
  | { href: Path; to?: never }
) &
  HookNavigationOptions<H>;

export type LinkProps<H extends BaseLocationHook = LocationHook> = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  NavigationalProps<H>;

export type RedirectProps<H extends BaseLocationHook = LocationHook> = NavigationalProps<H> & {
  children?: never;
};

export function Redirect<H extends BaseLocationHook = LocationHook>(
  props: PropsWithChildren<RedirectProps<H>>,
  context?: any
): ReactElement<any, any> | null;

export function Link<H extends BaseLocationHook = LocationHook>(
  props: PropsWithChildren<LinkProps<H>>,
  context?: any
): ReactElement<any, any> | null;

/*
 * Components: <Switch />
 */

export interface SwitchProps {
  location?: string;
  children: ReactNode;
}
export const Switch: FunctionComponent<SwitchProps>;

/*
 * Components: <Router />
 */

export interface RouterProps {
  hook: BaseLocationHook;
  base: Path;
  matcher: MatcherFn;
}
export const Router: FunctionComponent<
  Partial<RouterProps> & {
    children: ReactNode;
  }
>;

/*
 * Hooks
 */

export function useRouter(): RouterProps;

export function useRoute<T extends DefaultParams = DefaultParams>(pattern: Path): Match<T>;

export function useLocation<H extends BaseLocationHook = LocationHook>(): HookReturnValue<H>;

// tslint:enable:no-unnecessary-generics
