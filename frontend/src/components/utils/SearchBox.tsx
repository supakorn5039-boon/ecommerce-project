import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

interface SearchBoxProps extends HTMLAttributes<HTMLElement> {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  rightIcon?: ReactNode;
  size?: string;
  placeholder?: string;
  debounceDelay?: number;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchBox({
  handleSearch,
  searchQuery,
  rightIcon,
  className,
  placeholder,
  size = 'max-w-xs',
  debounceDelay = 500,
  onKeyUp,
  ...rest
}: Readonly<SearchBoxProps>) {
  const [inputValue, setInputValue] = useState<string>(searchQuery);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[<>(){}[\]]/g, '');
    setInputValue(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      const syntheticEvent = {
        target: { value },
        currentTarget: { value },
      } as React.ChangeEvent<HTMLInputElement>;
      handleSearch(syntheticEvent);
    }, debounceDelay);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className={`flex items-center relative flex-1 ${size} ${className}`} {...rest}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <CiSearch />
      </div>
      <input
        type="text"
        className={`block w-full pl-10 ${
          rightIcon ? 'pr-12' : 'pr-3'
        } py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-40 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-main focus:border-orange-main sm:text-sm`}
        placeholder={placeholder ?? `Search ...`}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onKeyUp={onKeyUp}
      />
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div className="h-full border-l border-gray-300 mx-2" />
          <div className="pr-3">{rightIcon}</div>
        </div>
      )}
    </div>
  );
}
