import React, {ChangeEventHandler, KeyboardEventHandler} from 'react';
import {Input, InputLabel} from '@material-ui/core';

interface SearchInputPropTypes {
  onChange: ChangeEventHandler;
  onKeyDown: KeyboardEventHandler;
  value: string;
}

const SearchInput: React.FunctionComponent<SearchInputPropTypes> = (props) => {
  return (
      <span>
        <InputLabel shrink/>
        <Input placeholder="가장 최근에 나온 디바이스 ex. 아이폰11" onChange={props.onChange} onKeyDown={props.onKeyDown} value={props.value}/>
      </span>
  );
};


export default SearchInput;
