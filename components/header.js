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
      1500
    );
    setData({ ...data, timerId: timerId });
  } else {
    setData({ results: [], timerId: 0 });
  }
}

function displayResults(data) {
  if (data.results.length > 0) {
    return (
      <div className="absolute z-40 bg-white max-w-4xl overflow-y-scroll max-h-80">
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
        <div className="max-w-4xl container mx-auto py-8 px-4 ">
          <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
            <h1 className="text-white font-bold text-xl">
              <Link href="/">
                <a>CoWin | Help Center</a>
              </Link>
            </h1>
            <div className="flex text-white items-center">
              <a
                target="_blank"
                rel="noopener"
                href="https://www.cowin.gov.in/"
                className="px-2 mr-3"
              >
                <span>Go to Cowin</span>
              </a>
              <div className="flex items-center">
                <span className="mr-2"> &#x1F310;</span>
                <Dropdown
                  controlClassName={styles.dropdownControl}
                  arrowClosed={arrowClosed}
                  arrowOpen={arrowOpen}
                  options={languageOptions}
                  onChange={onLanguageSelect}
                  value={defaultOption}
                  placeholder="Language"
                  placeholderClassName="text-white"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 text-lg text-white">
            Advice and answers from the Cowin Team
          </div>
          <input
            type="text"
            onChange={(e) => {
              let value = e.target.value;
              handleChange(data, setData, value);
            }}
            className="mt-6 w-full h-12 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg"
            placeholder="Search for articles..."
            name="search"
          ></input>
          {displayResults(data)}
        </div>
      </div>
    </header>
  );
}
