import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const MATCH_ALL_WHITESPACE_CHARACTERS = /\s/g;
const REGEX_HAS_UPPER_AND_LOWER_CASE = /^(?=.*[a-z])(?=.*[A-Z])/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,24}/;
const REGEX_HAS_NUMBER_AND_SPECIAL_CHAR = /^(?=.*\d)(?=.*[^a-zA-Z\d])/;

interface InputData {
    value: string;
    isValid: boolean;
    error: string;
}

interface InputProps extends ComponentProps<'input'> {
    onDataChanged: (data:InputData) => void;
}

export default class InputPassword extends React.Component<InputProps> {
    constructor(props: InputProps) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static InputData = class implements InputData {
        value:string;
        isValid:boolean;
        error:string;
    
        constructor(value:string, isValid:boolean, error:string) {
            this.value = value;
            this.isValid = isValid;
            this.error = error;
        }
    }

    state = {
        value: '',
        isValid: false
    };

    componentDidUpdate(_prevProps: InputProps, prevState: { value: string; isValid: boolean }) {
        const { value, isValid } = this.state;

        if (prevState.value !== value || prevState.isValid !== isValid) { // is value changed?
            if (value === '' || isValid) this.props.onDataChanged({ value, isValid, error: '' });
            else {
                if (value.length < 8 || value.length > 24) this.props.onDataChanged({ value, isValid, error: '8 to 24 characters' });
                else if (!REGEX_HAS_UPPER_AND_LOWER_CASE.test(value)) this.props.onDataChanged({ value, isValid, error: 'Must include uppercase and lowercase letters' });
                else if (!REGEX_HAS_NUMBER_AND_SPECIAL_CHAR.test(value)) this.props.onDataChanged({ value, isValid, error: 'Must include a number and a special character' });
            }
        }
    }

    handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value.replace(MATCH_ALL_WHITESPACE_CHARACTERS, "");
        this.setState({
            value: newValue,
            isValid: REGEX_PASSWORD.test(newValue)
        });
    }

    render() {
        return (
            <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={this.handleInputChange}
                value={this.state.value}
                aria-invalid={this.state.isValid ? "false" : "true"}
                className={twMerge(
                    "transition-all duration-500 w-full m-2 ms-0 me-0 p-1 bg-white bg-opacity-10 border-l-2 border-opacity-50 rounded-md outline-none focus:border-opacity-100",
                    this.state.isValid ? "border-green-500": this.state.value ? "border-red-600" : "border-yellow-600"
                )}
                {...this.props}
            />
        )
    }
}