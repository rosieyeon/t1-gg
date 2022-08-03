import React from "react";

import { useNavigate } from "react-router-dom";
import { t1Player } from "app/t1Player";
import {
  SummonersBox,
  SummonersImg,
  SummonersLayout,
  SummonersList,
  SummonersLogo,
  SummonersName,
} from "./Summoners.styled";
import toCapitalize from "util/toCapitalize";

const Summoners: React.FC = () => {
  const navigate = useNavigate();
  const t1PlayerList = t1Player;

  const onClickNav = (player: string) => {
    navigate(`/${player}`);
  };

  return (
    <SummonersLayout>
      <SummonersLogo src="images/logo/t1.jpeg" />
      <SummonersList>
        {t1PlayerList.map((t1Player, idx) => (
          <SummonersBox key={idx}>
            <SummonersImg
              src={`/images/players/${t1Player.player}.jpg`}
              onClick={() => onClickNav(`${t1Player.player}`)}
            />
            <SummonersName
              key={idx}
              onClick={() => onClickNav(`${t1Player.player}`)}
            >
              {toCapitalize(t1Player.player)}
            </SummonersName>
          </SummonersBox>
        ))}
      </SummonersList>
    </SummonersLayout>
  );
};

export default Summoners;
