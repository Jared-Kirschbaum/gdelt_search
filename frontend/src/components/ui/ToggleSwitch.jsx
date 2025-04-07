import {Sun, Moon} from 'lucide-react';

function ToggleSwitch({checked, onChange}) {
    return (
        <button
            aria-label="Toggle dark mode"
            className="theme-toggle-button"
            onClick={onChange}
        >{checked ? <Moon /> : <Sun />}</button>
    );
}

export default ToggleSwitch;