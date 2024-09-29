import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const MATCH_ALL_WHITESPACE_CHARACTERS = /\s/g;

interface InputData {
    value: string;
    isValid: boolean;
    error: string;
}

interface InputProps extends ComponentProps<'input'> {
    onDataChanged: (data:InputData) => void;
    password:string;
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
            else this.props.onDataChanged({ value, isValid, error: 'Passwords dont match' });
        }
    }

    handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value.replace(MATCH_ALL_WHITESPACE_CHARACTERS, "");
        this.setState({
            value: newValue,
            isValid: newValue && newValue === this.props.password
        });
    }

    render() {
        return (
            <input
                type="password"
                id="confirm_password"
                placeholder="Retype Password"
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