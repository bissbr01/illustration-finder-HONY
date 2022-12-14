import {
  TextInput,
  TextInputProps,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import { KeywordAndWeight } from '../types/types';
import keywordsReduced from '../public/keywords/keywords_w_weights_reduced.json';

const useStyles = createStyles((theme) => ({
  input: {
    width: '100%',
    padding: theme.spacing.md,
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      width: 500,
    },
  },
}));

interface SearchBar extends TextInputProps {
  keywords: KeywordAndWeight[];
  setKeywords: Dispatch<SetStateAction<KeywordAndWeight[]>>;
}

export default function SearchBar({
  keywords,
  setKeywords,
  ...props
}: SearchBar) {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const initKeywords = useRef<KeywordAndWeight[]>(
    keywordsReduced as KeywordAndWeight[]
  );

  const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const filteredKeywords = initKeywords.current.filter((keywordAndWeight) =>
      keywordAndWeight[1].startsWith(currentTarget.value)
    );
    filteredKeywords.sort((a, b) => a[0] - b[0]);
    setKeywords(filteredKeywords);
  };

  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="md"
      className={classes.input}
      placeholder="Filter keywords"
      rightSectionWidth={42}
      onChange={handleChange}
      {...props}
    />
  );
}
