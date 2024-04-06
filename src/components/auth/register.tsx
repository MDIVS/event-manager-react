import { useRef, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/
const REGEX_STARTS_WITH_LETTER = /^[A-Za-z]/
const REGEX_CONTAINS_SPECIAL_CHARACTERS = /[^\w-]/ // check if a string contains special characters except for "-" and "_"
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

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
        setValidPwd(PWD_REGEX.test(pwd))
        setValidMatch(pwd === matchPwd)
    }, [pwd, matchPwd])

    return (
        <section className="m-auto text-center w-60">
            <h1> Register </h1>
            <div className="border-b border-b-slate-700 m-2"></div>
            {/* <form onSubmit={handleSubmit}> */}
            <form onSubmit={() => {console.log("form submited")}}>
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
                        "w-full m-2 ms-0 me-0 p-1 bg-white bg-opacity-10 border-l-2 border-opacity-50 rounded-md outline-none focus:border-opacity-100",
                        validName ? "border-green-500": user ? "border-red-600" : "border-yellow-600"
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
                        "w-full m-2 ms-0 me-0 p-1 bg-white bg-opacity-10 border-l-2 border-opacity-50 rounded-md outline-none focus:border-opacity-100",
                        validPwd ? "border-green-500": pwd ? "border-red-600" : "border-yellow-600"
                    )}
                />
                <div className="text-xs text-left">
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
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
                        "w-full m-2 ms-0 me-0 p-1 bg-white bg-opacity-10 border-l-2 border-opacity-50 rounded-md outline-none focus:border-opacity-100",
                        validMatch ? "border-green-500": matchPwd ? "border-red-600" : "border-yellow-600"
                    )}
                />
                <p className="text-xs">
                    Passwords must match
                </p>

                <br />

                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
            </form>

            <br />

            <p>
                Already registered?<br />
                <span className="line">
                    {/*put router link here*/}
                    <a href="#">Sign In</a>
                </span>
            </p>
        </section>
    )
}