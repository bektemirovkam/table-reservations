import CollapsibleLib, { CollapsibleProps } from "react-native-collapsible";

export const Collapsible = ({ children, ...rest }: CollapsibleProps) => {
  return <CollapsibleLib {...rest}>{children}</CollapsibleLib>;
};
