import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="bg-indigo-600  border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-indigo-600 ">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <a className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Formly React
            </span>
          </a>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                aria-current={router.pathname == "/" ? "page" : undefined}
              >
                <a
                  className={`block py-2 pr-4 pl-3 text-white rounded md:bg-transparent ${
                    router.pathname == "/"
                      ? "md:text-indigo-600"
                      : "dark:text-gray-400"
                  } md:p-0 dark:text-white`}
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/usage">
                <a
                  className={`block py-2 pr-4 pl-3 text-white rounded md:bg-transparent ${
                    router.pathname == "/usage"
                      ? "md:text-indigo-600"
                      : "dark:text-gray-400"
                  } md:p-0 dark:text-white`}
                >
                  Usage
                </a>
              </Link>
            </li>
            <li>
              <Link href="/alter">
                <a
                  className={`block py-2 pr-4 pl-3 text-white rounded md:bg-transparent ${
                    router.pathname == "/alter"
                      ? "md:text-indigo-600"
                      : "dark:text-gray-400"
                  } md:p-0 dark:text-white`}
                >
                  Alter
                </a>
              </Link>
            </li>
            <li>
              <Link href="/validation">
                <a
                  className={`block py-2 pr-4 pl-3 text-white rounded md:bg-transparent ${
                    router.pathname == "/validation"
                      ? "md:text-indigo-600"
                      : "dark:text-gray-400"
                  } md:p-0 dark:text-white`}
                >
                  Validation
                </a>
              </Link>
            </li>
            <li>
              <Link href="/preprocess">
                <a
                  className={`block py-2 pr-4 pl-3 text-white rounded md:bg-transparent ${
                    router.pathname == "/preprocess"
                      ? "md:text-indigo-600"
                      : "dark:text-gray-400"
                  } md:p-0 dark:text-white`}
                >
                  Preprocess
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
