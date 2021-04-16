export default function Header() {
  return (
    <header className="flex-shrink-0">
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-500 ">
        <div className="max-w-4xl container mx-auto py-8 px-4 ">
          <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
            <h1 className="text-white font-bold text-xl">
              <a href="/">CoWin | Help Center</a>
            </h1>
            <div className="flex text-white">
              <a
                target="_blank"
                rel="noopener"
                href="https://www.cowin.gov.in/"
                className="px-2"
              >
                <span>Go to Cowin</span>
              </a>
              <a className="px-2">English</a>
            </div>
          </div>
          <div className="mt-4 text-2xl text-white">
            Advice and answers from the Cowin Team
          </div>
          <input
            type="text"
            className="mt-6 w-full h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg"
            placeholder="Search for articles..."
            name="search"
          ></input>
        </div>
      </div>
    </header>
  );
}
