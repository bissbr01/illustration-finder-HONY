import { Group } from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';
import { KeywordAndWeight } from '../types/types';
import Keywords from './Keywords';
import SearchBar from './SearchBar';
import keywordsReduced from '../public/keywords/keywords_w_weights_reduced.json';

interface KeywordSearchProps {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

export default function KeywordSearch({
  keyword,
  setKeyword,
}: KeywordSearchProps) {
  const [keywords, setKeywords] = useState<KeywordAndWeight[]>(
    keywordsReduced as KeywordAndWeight[]
  );

  return (
    <>
      <Group position="center">
        <SearchBar setKeywords={setKeywords} keywords={keywords} />
      </Group>
      <Keywords keyword={keyword} setKeyword={setKeyword} keywords={keywords} />
    </>
  );
}
