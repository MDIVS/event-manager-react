import { useEffect, useState, ComponentProps, useCallback } from "react";
import { twMerge } from "tailwind-merge";

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
const MATCH_ALL_WHITESPACE_CHARACTERS = /\s/g;
const REGEX_STARTS_WITH_LETTER = /^[A-Za-z]/;
const REGEX_CONTAINS_SPECIAL_CHARACTERS = /[^\w-]/; // check if a string contains special characters except for "-" and "_"

function hasAccentedChar(inputString:string) {
    const accentedCharacters = "ÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÇçÑñ";
    for (const char of inputString) if (accentedCharacters.includes(char))
        return true
    return false;
}

export class InputUsernameData {
    value:string;
    isValid:boolean;
    error:string;

    constructor(value:string, isValid:boolean, error:string) {
        this.value = value;
        this.isValid = isValid;
        this.error = error;
    }
}

interface InputUsernameProps extends ComponentProps<'input'> {
    onDataChanged: (data:InputUsernameData) => void;
}

export default function InputUsername({onDataChanged, ...props}:InputUsernameProps) {
    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)

    useEffect(() => {
        setValidName(USER_REGEX.test(user))
    }, [user])

    useEffect(() => {
        if (validName) onDataChanged(new InputUsernameData(user, validName, ''));
        else {
            if (user.length < 3 || user.length > 24) onDataChanged(new InputUsernameData(user, validName, '3 to 24 characters'));
            else if (!REGEX_STARTS_WITH_LETTER.test(user)) onDataChanged(new InputUsernameData(user, validName, 'Must begin with a letter'));
            else if (hasAccentedChar(user)) onDataChanged(new InputUsernameData(user, validName, 'Accented letters are not allowed'));
            else if (REGEX_CONTAINS_SPECIAL_CHARACTERS.test(user)) onDataChanged(new InputUsernameData(user, validName, 'Only underscores and hyphens symbols allowed'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, validName])

    useCallback

    return (
        <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={e => setUser(e.target.value.replace(MATCH_ALL_WHITESPACE_CHARACTERS, ""))}
            value={user}
            aria-invalid={validName ? "false" : "true"}
            className={twMerge(
                "transition-all duration-500 border-yellow-600 w-full m-2 ms-0 me-0 p-1 bg-white bg-opacity-10 border-l-2 border-opacity-50 rounded-md outline-none focus:border-opacity-100",
                validName ? "border-green-500": user ? "border-red-600" : ""
            )}
            {...props}
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Enter User Name Here')}
            onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
        />
    )
}