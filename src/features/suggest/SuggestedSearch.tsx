import React, {ChangeEvent, ChangeEventHandler, KeyboardEventHandler, useState} from 'react';
import SearchInput from './components/SearchInput';
import Suggestion from './components/Suggestion';
import useSuggest from './hooks/useSuggest';

const noop = () => void 0;

interface SuggestedSearchPropTypes {
  onSubmit: (keyword: string) => void
}

const SuggestedSearch: React.FunctionComponent<SuggestedSearchPropTypes> = (props) => {
  const [inputValue, changeInputValue] = useState<string>('');
  const [selectedSuggestItemIndex, updateIndex] = useState(-1);
  const [suggestionList, emptyList] = useSuggest(inputValue);
  const selectedItem = suggestionList[selectedSuggestItemIndex];

  const onArrowKeyDown = () => {
    updateIndex(Math.min(selectedSuggestItemIndex + 1, suggestionList.length - 1));
  };

  const onArrowKeyUp = () => {
    updateIndex(Math.max(selectedSuggestItemIndex - 1, -1));
  };

  const onSubmit = () => {
    props.onSubmit(selectedItem.path);
    changeInputValue('');
    updateIndex(-1);
    emptyList();
  };

  const keyCodeMap: {[keyCode: string]: () => void} = {
    13: onSubmit,
    40: onArrowKeyDown,
    38: onArrowKeyUp,
  };

  const updateInput: ChangeEventHandler<HTMLInputElement> = (e) => changeInputValue(e.target.value);
  const handleKeyNavigation: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const keyboardAction = keyCodeMap[e.keyCode] || noop;
    console.log(e.keyCode);
    keyboardAction();
  };

  return (
      <div>
        <SearchInput
            onChange={updateInput}
            onKeyDown={handleKeyNavigation}
            value={selectedItem ? selectedItem.path : inputValue}
        />
        {suggestionList.length > 0 ? <Suggestion data={suggestionList} activeIndex={selectedSuggestItemIndex} keyword={inputValue}/> : null}
      </div>
  );
};

export default SuggestedSearch;
