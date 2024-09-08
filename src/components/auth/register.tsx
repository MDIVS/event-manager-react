import { useRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
const REGEX_STARTS_WITH_LETTER = /^[A-Za-z]/;
const REGEX_CONTAINS_SPECIAL_CHARACTERS = /[^\w-]/; // check if a string contains special characters except for "-" and "_"
const REGEX_HAS_UPPER_AND_LOWER_CASE = /^(?=.*[a-z])(?=.*[A-Z])/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,24}/;
const REGEX_HAS_NUMBER_AND_SPECIAL_CHAR = /^(?=.*\d)(?=.*[^a-zA-Z\d])/;

function hasAccentedChar(inputString:string) {
    const accentedCharacters = "ÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÇçÑñ";
    for (const char of inputString) if (accentedCharacters.includes(char))
        return true
    return false;
}

export function Register() {
    const userRef = useRef<HTMLInputElement>(null)

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user))
    }, [user])

    useEffect(() => {
        setValidPwd(REGEX_PASSWORD.test(pwd))
        setValidMatch(pwd === matchPwd)
    }, [pwd, matchPwd])

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        alert('Submit clicked!');
        console.log('hey', event);
        axios({
            method: 'POST',
            url: '/user',
            data: {record: {username: user, password: pwd}}
        }).then((res) => console.log(res.data));
        event.preventDefault();
    }

    return (
        <section className="m-auto text-center w-60">
            <h1> Register </h1>
            <div className="border-b border-b-slate-700 m-2"></div>
            {/* <form onSubmit={handleSubmit}> */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username"> type your username </label>
                
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    onChange={(e) => setUser(e.target.value.replace(/\s/g, ""))}
                    value={user}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    className={twMerge(
                        "transition-all duration-500 border-yellow-600 w-full m-2 ms-0 me-0 p-1 bg-white bg-opacity-10 border-l-2 border-opacity-50 rounded-md outline-none focus:border-opacity-100",
                        validName ? "border-green-500": user ? "border-red-600" : ""
                    )}
                />
                
                <div className="text-xs text-left">
                    <p className={user ? user.length < 3 || user.length > 24 ? "text-orange-500" : "text-green-500" : ""}>
                        • 3 to 24 characters</p>
                    <p className={user ? !REGEX_STARTS_WITH_LETTER.test(user) ? "text-orange-500" : "text-green-500" : ""}>
                        • Must begin with a letter</p>
                    <p className={user ? hasAccentedChar(user) ? "text-orange-500" : "text-green-500" : ""}>
                        • Accented letters are not allowed</p>
                    <p className={user ? REGEX_CONTAINS_SPECIAL_CHARACTERS.test(user) ? "text-orange-500" : "text-green-500" : ""}>
                        • Only underscores and hyphens symbols allowed</p>
                </div>

                <br />

                <label htmlFor="password"> create your password </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value.replace(/\s/g, ""))}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    className={twMerge(
                        "transition-all duration-500 w-full m-2 ms-0 me-0 p-1 bg-white bg-opacity-10 border-l-2 border-opacity-50 rounded-md outline-none focus:border-opacity-100",
                        validPwd ? "border-green-500": pwd ? "border-red-600" : "border-yellow-600"
                    )}
                />
                <div className="text-xs text-left transition-all duration-500">
                    <p className={pwd ? pwd.length < 8 || pwd.length > 24 ? "text-orange-500" : "text-green-500" : ""}>
                        • 8 to 24 characters</p>
                    <p className={pwd ? !REGEX_HAS_UPPER_AND_LOWER_CASE.test(pwd) ? "text-orange-500" : "text-green-500" : ""}>
                        • Must include uppercase and lowercase letters</p>
                    <p className={pwd ? !REGEX_HAS_NUMBER_AND_SPECIAL_CHAR.test(pwd) ? "text-orange-500" : "text-green-500" : ""}>
                        • Must include a number and a special character</p>
                </div>

                <br />

                <label htmlFor="confirm_pwd"> confirm your password </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value.replace(/\s/g, ""))}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    className={twMerge(
                        "transition-all duration-500 w-full m-2 ms-0 me-0 p-1 bg-white bg-opacity-10 border-l-2 border-opacity-50 rounded-md outline-none focus:border-opacity-100",
                        validMatch ? "border-green-500": matchPwd ? "border-red-600" : "border-yellow-600"
                    )}
                />
                <div className="text-xs">
                    <p className={matchPwd ? matchPwd != pwd ? "text-orange-500" : "text-green-500" : ""}>
                        Passwords must match
                    </p>
                </div>

                <br />
                
                <button className="transition-all duration-300 outline-none border-2 border-yellow-400 border-opacity-50 text-yellow-400 rounded-md p-1 px-16 bg-white bg-opacity-5 hover:border-opacity-100 focus:border-opacity-100 disabled:border-white disabled:border-opacity-50 disabled:opacity-35"
                    disabled={!validName || !validPwd || !validMatch ? true : false}>
                        Sign Up
                </button>
            </form>

            <div className="m-4 border-t border-slate-700"></div>

            Already registered? <a href="https://www.github.com/MDIVS" className="text-blue-300">Sign In</a>
        </section>
    )
}