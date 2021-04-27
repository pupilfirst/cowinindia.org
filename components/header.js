import Link from "next/link";
import Dropdown from "react-dropdown";
import { useRouter } from "next/router";
import "react-dropdown/style.css";
import styles from "./header.module.css";
import { useState } from "react";

const arrowClosed = <span className={styles.arrowClosed} />;
const arrowOpen = <span className={styles.arrowOpen} />;

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Malayalam", value: "ml" },
];
const defaultOption = languageOptions[0];

function getResults(data, setData, searchString) {
  let apiEndPoint = "https://editor.cowinindia.org/search?search=";
  fetch(apiEndPoint + searchString)
    .then((res) => res.json())
    .then((res) => setData({ ...data, results: res["results"] }));
}

function handleChange(data, setData, string) {
  clearTimeout(data.timerId);
  let searchString = string.trim();

  if (searchString.length > 3) {
    var timerId = setTimeout(
      () => getResults(data, setData, searchString),
      500
    );
    setData({ ...data, timerId: timerId });
  } else {
    setData({ results: [], timerId: 0 });
  }
}

function displayResults(data) {
  if (data.results.length > 0) {
    return (
      <div className="absolute z-40 max-w-4xl overflow-y-scroll max-h-80 rounded bg-white px-4 py-6 shadow-md cursor-pointer">
        {data.results.map((result) => (
          <a key={result["id"]} href={result["url"]}>
            <div className="mt-2 rounded bg-white p-4 shadow-md cursor-pointer">
              <a className="text-indigo-700 text-sm">{result["title"]}</a>
              <div className="text-gray-700 mt-2 text-sm">
                {result["excerpt"]}
              </div>
            </div>
          </a>
        ))}
      </div>
    );
  }
}

export default function Header() {
  const router = useRouter();

  const [data, setData] = useState({ results: [], timerId: 0 });

  const onLanguageSelect = (option) => {
    console.log(option);
    router.push(`/${option.value}`);
  };

  return (
    <header className="flex-shrink-0">
      <div className="bg-indigo-900 ">
        <div className="max-w-4xl container mx-auto py-6 px-4 md:px-0 ">
          <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
            <h1 className="text-white font-bold text-xl pt-4 md:pt-0">
              <Link href="/">
                <a>CoWin<span className="font-light ml-2 pl-2 border-l-2">Help Center</span></a>
              </Link>
            </h1>
            <div className="flex space-x-5 text-white items-center">
              <a
                target="_blank"
                rel="noopener"
                href="https://www.cowin.gov.in/"
                className="px-3 py-2 border border-transparent rounded flex space-x-2 items-center bg-indigo-100 bg-opacity-10 hover:bg-opacity-20 hover:shadow-lg transition"
              >
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
                <span>Go to Cowin</span>
              </a>
              <div className="flex items-center">
                <Dropdown
                  controlClassName={styles.dropdownControl}
                  arrowClosed={arrowClosed}
                  arrowOpen={arrowOpen}
                  options={languageOptions}
                  onChange={onLanguageSelect}
                  value={defaultOption}
                  placeholder="Language"
                  placeholderClassName="text-white cursor-pointer rounded"
                />
              </div>
            </div>
          </div>
          <label className="inline-block pt-4 md:pt-6 text-indigo-100">
            Advice and answers from the Cowin Team
          </label>
          <input
            type="text"
            onChange={(e) => {
              let value = e.target.value;
              handleChange(data, setData, value);
            }}
            className="mt-2 w-full rounded focus:outline-none focus:ring text-lg py-3 px-4 shadow-lg"
            placeholder="Search for articles..."
            name="search"
          ></input>
          {displayResults(data)}
        </div>
      </div>
    </header>
  );
}
