import React from 'react';

interface HighlightTextPropTypes {
  text: string;
  keywords: string[]
}

const toArray = (word: string, keywords: string[]) => {
  const regexp = new RegExp(`(${keywords.join('|')})`, 'gi');
  return word.split(regexp);
};

const HighlightText: React.FunctionComponent<HighlightTextPropTypes> = (props) => {
  if (props.keywords.length === 0) {
    return <span>{props.text}</span>;
  }

  const textArr = toArray(props.text, props.keywords);

  return (
      <span>
        {
          textArr.map((word, index) => {
            const keyword = props.keywords.find((keyword) => keyword === word);
            return keyword ? <b key={index}>{word}</b> : word;
          })
        }
      </span>
  )
};

export default HighlightText;
