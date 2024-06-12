import * as SolidIcons from '@heroicons/react/24/solid';
import * as OutlineIcons from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';

export default function Icon({ icon, className, size, outline = false, onClick, tooltip = '' }) {
    const { ...icons } = outline ? OutlineIcons : SolidIcons;
    const Icon = icons[icon];

    const classes = [
        `${className ? className : 'text-black'}`,
        `h-${size ? size : 6}`,
        `w-${size ? size : 6}`,
        'outline-none',
        'cursor-pointer',
    ];

    return (
        <>
            <Icon
                className={classes.join(' ')}
                onClick={onClick}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={tooltip}
                data-tooltip-place="bottom"
            />

            {tooltip && <Tooltip id="my-tooltip" style={{ padding: '2px 10px', fontSize: '10px', borderRadius: '6px' }} />}
        </>
    );
}
