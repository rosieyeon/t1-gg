import React from 'react';
import { useEffect, useCallback, useState } from 'react';

import YoutubeItem from 'components/youtube/YoutubeItem';
// import getYoutubeList from 'api/getYoutubeList';
import { useAppDispatch, useAppSelector } from 'app/store';
import {
  HomeError,
  HomeLayout,
  HomeLoading,
  HomeLoadingImg,
  HomeLoadingSkeleton,
  HomeLoadingTxt,
  HomeLogo,
  HomeSearch,
  HomeSearchBar,
  HomeSearchButton,
  HomeYoutubeItem,
} from './Home.styled';
import { getYoutubeList } from 'features/youtube/youtubeListSlice';

const Home: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const { youtubeList, loading, error } = useAppSelector(
    (state) => state.youtubeList
  );

  const dispatch = useAppDispatch();

  // 여기에 then으로 에러 분기 처리
  useEffect(() => {
    dispatch(getYoutubeList(query));
  }, [dispatch, query]);

  //TODO useCallback 이용이유 확실하게 써야하는 이유, 쓸 때에는 dependency 걸어야하는지 기준점
  const onChangeSearch = useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setKeyword(event.target.value);
    },
    []
  );

  const onClickApply = useCallback(() => {
    setQuery(keyword);
  }, [keyword]);

  const onKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      onClickApply();
    }
  };

  return (
    <HomeLayout>
      <HomeLogo src="images/logo/t1.jpeg" />
      <HomeSearch>
        <HomeSearchBar
          placeholder="검색"
          onChange={onChangeSearch}
          onKeyPress={onKeyPress}
        />
        <HomeSearchButton onClick={onClickApply}>SEARCH</HomeSearchButton>
      </HomeSearch>
      {loading === 'pending' ? (
        <HomeLoading>
          {youtubeList.map((youtube, index) => (
            <HomeLoadingSkeleton key={index}>
              <HomeLoadingImg />
              <HomeLoadingTxt />
            </HomeLoadingSkeleton>
          ))}
        </HomeLoading>
      ) : error ? (
        <HomeError>데이터를 불러올 수 없습니다</HomeError>
      ) : (
        <HomeYoutubeItem>
          {youtubeList.map((youtube, index) => (
            <YoutubeItem youtube={youtube} key={index} />
          ))}
        </HomeYoutubeItem>
      )}
    </HomeLayout>
  );
};

export default Home;
