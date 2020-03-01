import {useEffect, useState} from 'react';
import Trie, {TrieSearchResult} from '../../../helper/Trie';
import product from '../../../data/product';

const suggestRepository = new Trie(Object.keys(product.name));

const getSuggest = (keyword: string) => {
  const result = suggestRepository.search(keyword);

  return Promise.resolve(result);
};

const useSuggest = (keyword: string): [TrieSearchResult[], () => void] => {
  const [suggestList, updateSuggestList] = useState<TrieSearchResult[]>([]);

  const emptyList = () => {
    updateSuggestList([]);
  };

  useEffect(() => {
    if (keyword === '' || keyword === null) {
      updateSuggestList([]);
      return;
    }

    getSuggest(keyword).then((list) => {
      updateSuggestList(list);
    });
  }, [keyword]);

  return [suggestList, emptyList];
};

export default useSuggest;
