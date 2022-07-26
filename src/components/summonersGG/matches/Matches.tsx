import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';

import MatchItem from './MatchItem';
import {
  LoadingSkeleton,
  MatchesContent,
  MatchesLayout,
} from './Matches.styled';
import { getMatchData } from 'features/riot/matchDetailSlice';

const Matches = () => {
  const { summonerData } = useAppSelector((state) => state.summonerInfo);
  const { matchDetail, loading, error } = useAppSelector(
    (state) => state.matchDetails
  );
  //TODO dispatch .catch로 핸드링
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (summonerData.puuid) {
      dispatch(getMatchData(summonerData.puuid));
    }
  }, [dispatch, summonerData.puuid]);

  return (
    <MatchesLayout>
      {loading === 'pending' ? (
        <LoadingSkeleton>LOADING</LoadingSkeleton>
      ) : error ? (
        <LoadingSkeleton>{error}</LoadingSkeleton>
      ) : (
        <>
          {matchDetail.map((match, index) => (
            <MatchesContent key={index}>
              <MatchItem match={match} />
            </MatchesContent>
          ))}
        </>
      )}
    </MatchesLayout>
  );
};

export default Matches;
