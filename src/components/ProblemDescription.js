import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { oneDark } from '@codemirror/theme-one-dark';
import './css/ProblemDescription.css';
import { useTheme } from './ThemeContext';  // Import useTheme hook

const ProblemDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();  // Get the current theme from context
  const problems = {
    1: {
      title: 'Two Sum',
      description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to the target.',
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        }
      ]
    },
    2: {
      title: 'Longest Substring Without Repeating Characters',
      description: 'Find the length of the longest substring without repeating characters.',
      examples: [
        {
          input: 's = "abcabcbb"',
          output: '3',
          explanation: 'The answer is "abc", with the length of 3.'
        }
      ]
    },
    3: {
      title: 'Merge Two Sorted Lists',
      description: 'Merge two sorted linked lists and return it as a new sorted list.',
      examples: [
        {
          input: 'l1 = [1,2,4], l2 = [1,3,4]',
          output: '[1,1,2,3,4,4]',
          explanation: 'Merging the two lists gives us the sorted list.'
        }
      ]
    },
    4: {
      title: 'Valid Parentheses',
      description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\', and \']\', determine if the input string is valid.',
      examples: [
        {
          input: 's = "()"',
          output: 'true',
          explanation: 'The string "()" is valid.'
        }
      ]
    },
    5: {
      title: 'Maximum Subarray',
      description: 'Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
      examples: [
        {
          input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
          output: '6',
          explanation: 'The subarray [4,-1,2,1] has the largest sum.'
        }
      ]
    },
    6: {
      title: 'Search in Rotated Sorted Array',
      description: 'Suppose an array is rotated at some pivot unknown to you beforehand. Search for a target value.',
      examples: [
        {
          input: 'nums = [4,5,6,7,0,1,2], target = 0',
          output: '4',
          explanation: '0 is found at index 4.'
        }
      ]
    },
    7: {
      title: 'Group Anagrams',
      description: 'Given an array of strings, group anagrams together.',
      examples: [
        {
          input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
          output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
          explanation: 'Anagrams are grouped together.'
        }
      ]
    },
    8: {
      title: 'Top K Frequent Elements',
      description: 'Given an integer array nums and an integer k, return the k most frequent elements.',
      examples: [
        {
          input: 'nums = [1,1,1,2,2,3], k = 2',
          output: '[1,2]',
          explanation: '1 appears three times, and 2 appears twice.'
        }
      ]
    },
    9: {
      title: 'Longest Palindromic Substring',
      description: 'Given a string s, return the longest palindromic substring in s.',
      examples: [
        {
          input: 's = "babad"',
          output: '"bab"',
          explanation: 'The answer is "bab".'
        }
      ]
    },
    10: {
      title: 'Coin Change',
      description: 'You are given coins of different denominations and a total amount of money amount. Find the fewest number of coins that make up that amount.',
      examples: [
        {
          input: 'coins = [1,2,5], amount = 11',
          output: '3',
          explanation: 'The fewest number of coins is 3 (11 = 5 + 5 + 1).'
        }
      ]
    }
  };

 
  const problem = problems[id];

  const languageExtensions = {
    javascript: javascript(),
    cpp: cpp(),
    python: python(),
    java: java(),
  };

  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const editorRef = useRef();
  const { setContainer } = useCodeMirror({
    container: editorRef.current,
    value: code,
    extensions: [languageExtensions[selectedLanguage]],
    theme: oneDark,
    onChange: (value) => setCode(value),
  });

  useEffect(() => {
    if (editorRef.current) {
      setContainer(editorRef.current);
    }
  }, [editorRef.current, setContainer]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handlePrevious = () => {
    const prevId = parseInt(id) - 1;
    if (prevId >= 1) {
      navigate(`/problems/${prevId}`);
    }
  };

  const handleNext = () => {
    const nextId = parseInt(id) + 1;
    if (nextId <= Object.keys(problems).length) {
      navigate(`/problems/${nextId}`);
    }
  };

  return (
    <div className={`problem-container ${theme}`}>
      <div className="problem-description">
        <h2>{problem.title}</h2>
        <p>{problem.description}</p>

        <div className="problem-examples">
          <h4>Examples:</h4>
          {problem.examples.map((example, index) => (
            <div key={index}>
              <p><strong>Input:</strong> {example.input}</p>
              <p><strong>Output:</strong> {example.output}</p>
              <p><strong>Explanation:</strong> {example.explanation}</p>
            </div>
          ))}
        </div>

        <div className="problem-navigation">
          <button className="prev-btn" onClick={handlePrevious} disabled={id === '1'}>Previous</button>
          <button className="next-btn" onClick={handleNext} disabled={id === `${Object.keys(problems).length}`}>Next</button>
        </div>
      </div>

      <div className="problem-solution">
        <div className="problem-controls">
          <select
            className="language-select"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>

          <button className="run-btn">Run</button>
          <button className="submit-btn">Submit</button>
        </div>

        <div className="code-editor">
          <div ref={editorRef} className="code-editor-container" />
        </div>

        <div className="output-section">
          <h4>Output</h4>
          <div className="output-console">
            <p>Your output will appear here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;