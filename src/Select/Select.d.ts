import * as React from 'react';
import { StyledComponent, Omit } from '..';
import { InputProps } from '../Input';

export type SelectProps = {
  autoWidth?: boolean;
  input?: React.ReactNode;
  native?: boolean;
  multiple?: boolean;
  MenuProps?: Object;
  renderValue?: Function;
  value?: Array<string | number> | string | number;
} & Partial<Omit<InputProps, 'value'>>;

declare const Select: StyledComponent<SelectProps>;

export default Select;
