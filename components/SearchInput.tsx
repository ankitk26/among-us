import { SearchIcon, XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const clearQuery = () => {
    setQuery("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query) {
      router.push(`/search/${query}`);
    }
  };

  return (
    <div className="bg-[#F3F3F3] px-4 border-2 border-transparent  focus-within:border-gray-400 py-2 rounded w-1/3 flex items-center gap-3">
      <SearchIcon className="w-4 h-4 text-gray-500" />
      <form onSubmit={handleSubmit} className="flex-grow">
        <input
          type="text"
          value={query}
          placeholder="Search for topics"
          className="w-full text-sm text-gray-700 bg-transparent focus:outline-none"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {query && (
        <button onClick={clearQuery}>
          <XIcon className="w-4 h-4 text-gray-500 hover:text-gray-700" />
        </button>
      )}
    </div>
  );
}
