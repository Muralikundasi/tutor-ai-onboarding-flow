
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { getAllSubjects } from '../../data/subjectDatabase';

interface SubjectAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SubjectAutocomplete: React.FC<SubjectAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Search for a subject..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allSubjects = getAllSubjects();

  useEffect(() => {
    if (searchTerm) {
      const filtered = allSubjects.filter(subject =>
        subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubjects(filtered);
    } else {
      setFilteredSubjects(allSubjects);
    }
    setHighlightedIndex(-1);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
    
    if (!newValue) {
      onChange('');
    }
  };

  const handleSubjectSelect = (subject: string) => {
    onChange(subject);
    setSearchTerm('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        return;
      }
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredSubjects.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredSubjects.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredSubjects.length) {
          handleSubjectSelect(filteredSubjects[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const clearSelection = () => {
    onChange('');
    setSearchTerm('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {value ? (
        <div className="flex items-center justify-between p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <span className="font-medium text-blue-800">{value}</span>
          <button
            onClick={clearSelection}
            className="text-blue-600 hover:text-blue-800 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-10 pr-10 py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            placeholder={placeholder}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
      )}

      {isOpen && !value && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject, index) => (
              <button
                key={subject}
                onClick={() => handleSubjectSelect(subject)}
                className={`w-full text-left px-4 py-3 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none ${
                  index === highlightedIndex ? 'bg-blue-50' : ''
                }`}
              >
                <span className="font-medium">{subject}</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500">No subjects found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubjectAutocomplete;
