import React from 'react';
import {TrieSearchResult} from '../../../helper/Trie';
import {List, ListItem} from '@material-ui/core';
import HighlightText from './HighlightText';

interface SuggestionPropTypes {
  data: TrieSearchResult[];
  activeIndex: number;
  keyword: string;
}

const Suggestion: React.FunctionComponent<SuggestionPropTypes> = (props) => {

  return (
      <div>
        <List>
          {props.data.map((data, index) => {
            return (
                <ListItem key={data.path} button selected={props.activeIndex === index}>
                  <HighlightText key={data.path} text={data.path} keywords={[props.keyword]}/>
                </ListItem>
            )
          })}
        </List>
      </div>
  );
};

export default Suggestion;
