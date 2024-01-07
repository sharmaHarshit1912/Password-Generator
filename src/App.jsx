import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  //tackle the length
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  //useRef use
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str = str + "0123456789";
    }
    if (character) {
      str += "!@#$%^&*";
    }

    for (let i = 1; i <= length; i++) {
      //for the index value
      let char = Math.floor(Math.random() * str.length);
      //value corresponding to the string value
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, character, setPassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password);
    alert("Value copied to clipboard");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, character, passwordGenerator]);

  return (
    <>
      <h1 className="text-white py-3 font-mono max-w-full bg-stone-800 text-center my-5 font-bold text-4xl mt-10 from-stone-800">
        Password Generator
      </h1>
      <div className="flex justify-center align-middle ">
        <div className="px-40 mt-32 shadow-md  text-black bg-slate-200 ">
          <p className="mt-5 text-3xl font-sans px-5">
            Create a random password
          </p>
          <div className="flex shadow overflow-hidden mb-4 mt-5 rounded-lg outline">
            <input
              type="text"
              value={password}
              className="outline-none w-full"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyToClipBoard}
              className="px-2 py-1 border-l-2 border-black fill-black bg-blue-500  hover:bg-green-500"
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="font-bold font-sans ">Length :{length}</label>
          </div>
          <div className="flex item-center gap-x-2  mt-5">
            <input
              type="checkbox"
              value={character}
              onClick={(e) => {
                setCharacter((prev) => !prev);
              }}
            />
            <label className="font-bold font-sans ">Character </label>
            <input
              type="checkbox"
              value={numberAllowed}
              id="numberInput"
              onClick={(e) => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className="font-bold font-sans ">Number </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
