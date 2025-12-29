import { Children, forwardRef } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

// ----------------------------------------------------------------------

interface CreateIconOptions {
  /**
   * The icon `svg` viewBox
   * @default "0 0 24 24"
   */
  viewBox?: string;
  /**
   * The `svg` path or group element
   * @type React.ReactElement | React.ReactElement[]
   */
  path?: React.ReactElement | React.ReactElement[];
  /**
   * If the `svg` has a single path, simply copy the path's `d` attribute
   */
  d?: string;
  /**
   * The display name useful in the dev tools
   */
  displayName?: string;
  /**
   * Default props automatically passed to the component; overwritable
   */
  defaultProps?: SvgIconProps;
  /**
   * The fill color (if needed, otherwise use currentColor)
   */
  fill?: string;
}

export function createIcon(options: CreateIconOptions) {
  const { viewBox = '0 0 24 24', d: pathDefinition, displayName, defaultProps = {} } = options;

  const path = Children.toArray(options.path);

  const IconComponent = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
    <SvgIcon ref={ref} viewBox={viewBox} {...defaultProps} {...props}>
      {path.length ? (
        path
      ) : pathDefinition ? (
        <path fill={options.fill || 'currentColor'} d={pathDefinition} />
      ) : null}
    </SvgIcon>
  ));

  IconComponent.displayName = displayName;

  return IconComponent;
}
