import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/store";

import getSummonerInfo from "api/getSummonerInfo";
import { t1Player } from "app/t1Player";
import { getSummonerName } from "features/summonerNameSlice";
import {
  SummonerGGData,
  SummonerGGLayout,
  SummonerGGStatistics,
} from "./SummonerGG.styled";
import Profile from "components/summonersGG/profile/Profile";
import Tier from "components/summonersGG/tier/Tier";
import Matches from "components/summonersGG/matches/Matches";
import MostChamp from "components/summonersGG/mostChamp/MostChamp";

const SummonerGG = () => {
  const { summonerData, loading, error } = useAppSelector(
    (state) => state.summonerInfo
  );

  // console.log(summonerData, loading, error);

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    t1Player.map(
      (lolplayer) =>
        pathname.substr(1) === lolplayer.player &&
        dispatch(getSummonerInfo(lolplayer.name))
    );
  }, []);

  useEffect(() => {
    dispatch(
      getSummonerName({
        player: `${pathname.substr(1)}`,
        name: `${summonerData.name}`,
      })
    );
  }, [summonerData.name]);

  return (
    <>
      {loading === "pending" ? (
        "LOADING"
      ) : error ? (
        "ERROR"
      ) : (
        <SummonerGGLayout>
          <Profile />
          <SummonerGGData>
            <SummonerGGStatistics>
              <Tier />
              <MostChamp />
            </SummonerGGStatistics>
            <Matches />
          </SummonerGGData>
        </SummonerGGLayout>
      )}
    </>
  );
};

export default SummonerGG;
