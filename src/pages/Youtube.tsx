import React, { useEffect, useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/store';
import YoutubeItem from 'components/youtube/YoutubeItem';
import { getYoutubeList } from 'features/youtube/youtubeListSlice';
import {
  YoutubeCategoryBox,
  YoutubeCategoryButton,
  YoutubeError,
  YoutubeLayout,
  YoutubeLoading,
  YoutubeLoadingImg,
  YoutubeLoadingSkeleton,
  YoutubeLoadingTxt,
  YoutubeLogo,
  YoutubeSearch,
  YoutubeSearchBar,
  YoutubeSearchButton,
  YoutubeYoutubeItem,
} from './Youtube.styled';
import { YoutubeQuery } from 'api/youtubeAPI';

const t1tubeGroups = [
  {
    name: 'ALL',
    keyword: '',
    channelID: 'UCJprx3bX49vNl6Bcw01Cwfg',
    order: 'date',
  },
  {
    name: 'Locker Room',
    keyword: 'Locker Room',
    channelID: 'UCJprx3bX49vNl6Bcw01Cwfg',
    order: 'relevance',
  },
  {
    name: 'Hidden Track',
    keyword: 'Hidden Track',
    channelID: 'UCJprx3bX49vNl6Bcw01Cwfg',
    order: 'date',
  },
  {
    name: 'Stream Highlight',
    keyword: 'Stream Highlight',
    channelID: 'UCJprx3bX49vNl6Bcw01Cwfg',
    order: 'date',
  },
  {
    name: 'LCK Highlight',
    keyword: 'LCK T1',
    channelID: 'UCx2hbU7rRax_MjiFaseI4TQ',
    order: 'date',
  },
];
const Youtube: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [openPlayList, setOpenPlayList] = useState(false);
  const [isSelect, setIsSelect] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const { youtubeList, loading, error } = useAppSelector(
    (state) => state.youtubeList
  );
  const { playList } = useAppSelector((state) => state.playList);

  const dispatch = useAppDispatch();

  // 여기에 then으로 에러 분기 처리
  useEffect(() => {
    dispatch(
      getYoutubeList({
        keyword: query,
        channelID: 'UCJprx3bX49vNl6Bcw01Cwfg',
        name: '',
        order: 'date',
      })
    );
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
    setIsSelect([false, false, false, false, false, false]);
  }, [keyword]);

  const onKeyPress = (event: { key: string }) => {
    setIsSelect([false, false, false, false, false, false]);
    if (event.key === 'Enter') {
      onClickApply();
    }
  };

  const onClickShow = useCallback(
    (t1tube: YoutubeQuery) => {
      setOpenPlayList(false);
      dispatch(getYoutubeList(t1tube));
    },
    [dispatch]
  );

  const getActiveButton = (idx: number) => {
    // TODO points 그냥 다 false로 넣어버리는 것도 좋을듯
    // eslint-disable-next-line array-callback-return
    isSelect.map((button, id) => {
      console.log(isSelect, 0);
      if (button) {
        setIsSelect([
          ...isSelect.slice(0, id),
          (isSelect[id] = false),
          // false, //TODO isSelect를 바로 바꾸지 말것
          ...isSelect.slice(id + 1),
        ]);
      }
    });
    setIsSelect([false, false, false, false, false, false]);
    console.log(isSelect);
    setIsSelect([
      ...isSelect.slice(0, idx),
      !isSelect[idx], //TODO true 어떤값이 들어갈지 명확하게 해주기
      ...isSelect.slice(idx + 1),
    ]);
  };

  return (
    <YoutubeLayout>
      <YoutubeLogo src="images/logo/t1.jpeg" />
      <YoutubeSearch>
        <YoutubeSearchBar
          placeholder="검색"
          onChange={onChangeSearch}
          onKeyPress={onKeyPress}
        />
        <YoutubeSearchButton onClick={onClickApply}>SEARCH</YoutubeSearchButton>
      </YoutubeSearch>
      <YoutubeCategoryBox>
        {t1tubeGroups.map((t1tube, idx) => (
          <YoutubeCategoryButton
            key={idx}
            selected={isSelect[idx]}
            onClick={() => {
              onClickShow({
                keyword: t1tube.keyword,
                channelID: t1tube.channelID,
                name: t1tube.name,
                order: t1tube.order,
              });
              getActiveButton(idx);
            }}
          >
            {t1tube.name}
          </YoutubeCategoryButton>
        ))}
        <YoutubeCategoryButton
          selected={isSelect[5]}
          onClick={() => {
            setOpenPlayList(!openPlayList);
            getActiveButton(5);
          }}
        >
          My Playlist
        </YoutubeCategoryButton>
      </YoutubeCategoryBox>
      {loading === 'pending' ? (
        <YoutubeLoading>
          {youtubeList.map((youtube, index) => (
            <YoutubeLoadingSkeleton key={index}>
              <YoutubeLoadingImg />
              <YoutubeLoadingTxt />
            </YoutubeLoadingSkeleton>
          ))}
        </YoutubeLoading>
      ) : error ? (
        <YoutubeError>데이터를 불러올 수 없습니다</YoutubeError>
      ) : !openPlayList ? (
        <YoutubeYoutubeItem>
          {youtubeList.map((youtube, index) => (
            <YoutubeItem youtube={youtube} key={index} />
          ))}
        </YoutubeYoutubeItem>
      ) : playList.length !== 0 ? (
        <YoutubeYoutubeItem>
          {playList.map((youtube, index) => (
            <YoutubeItem youtube={youtube} key={index} />
          ))}
        </YoutubeYoutubeItem>
      ) : (
        <YoutubeError>재생목록이 존재하지 않습니다</YoutubeError>
      )}
    </YoutubeLayout>
  );
};

export default Youtube;
