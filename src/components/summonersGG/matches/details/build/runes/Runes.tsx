import { matchParticipants } from 'features/riot/matchDetailSlice';
import React, { useEffect, useState } from 'react';
import Domination from './perks/Domination';
import Inspiration from './perks/Inspiration';
import Percision from './perks/Percision';
import Resolve from './perks/Resolve';
import Socery from './perks/Socery';
import StatsPerks from './perks/StatsPerks';
import {
  RunesDivider,
  RunesLayout,
  RunesPerksBox,
  RunesText,
} from './Runes.styled';

interface RunesDataProps {
  myData: matchParticipants;
}

const Runes = (data: RunesDataProps) => {
  const myData = data.myData;

  const [primary, setPrimary] = useState('');
  const [sub, setSub] = useState('');
  const primaryStyle = myData?.primaryPerks.style;
  const subStyle = myData?.subPerks.style;

  useEffect(() => {
    if (primaryStyle === 8000) {
      setPrimary('Percision');
    }
    if (primaryStyle === 8100) {
      setPrimary('Domination');
    }
    if (primaryStyle === 8200) {
      setPrimary('Socery');
    }
    if (primaryStyle === 8300) {
      setPrimary('Inspiration');
    }
    if (primaryStyle === 8400) {
      setPrimary('Resolve');
    }

    if (subStyle === 8000) {
      setSub('Percision');
    }
    if (subStyle === 8100) {
      setSub('Domination');
    }
    if (subStyle === 8200) {
      setSub('Socery');
    }
    if (subStyle === 8300) {
      setSub('Inspiration');
    }
    if (subStyle === 8400) {
      setSub('Resolve');
    }
  }, [primaryStyle, subStyle]);

  return (
    <RunesLayout>
      <RunesPerksBox>
        {primary === 'Percision' && (
          <Percision
            primaryPerks={myData.primaryPerks}
            subPerks={myData.subPerks}
            isPrimary={true}
          />
        )}
        {primary === 'Domination' && (
          <Domination
            primaryPerks={myData.primaryPerks}
            subPerks={myData.subPerks}
            isPrimary={true}
          />
        )}
        {primary === 'Socery' && (
          <Socery
            primaryPerks={myData.primaryPerks}
            subPerks={myData.subPerks}
            isPrimary={true}
          />
        )}
        {primary === 'Inspiration' && (
          <Inspiration
            primaryPerks={myData.primaryPerks}
            subPerks={myData.subPerks}
            isPrimary={true}
          />
        )}
        {primary === 'Resolve' && (
          <Resolve
            primaryPerks={myData.primaryPerks}
            subPerks={myData.subPerks}
            isPrimary={true}
          />
        )}
        <RunesText>{primary}</RunesText>
      </RunesPerksBox>
      <RunesDivider />
      <RunesPerksBox>
        {sub === 'Percision' && (
          <Percision
            primaryPerks={myData.primaryPerks}
            subPerks={myData.subPerks}
            isPrimary={false}
          />
        )}
        {sub === 'Domination' && (
          <Domination
            primaryPerks={myData.primaryPerks}
            subPerks={myData.subPerks}
            isPrimary={false}
          />
        )}
        {sub === 'Socery' && (
          <Socery
            primaryPerks={myData.primaryPerks}
            subPerks={myData.subPerks}
            isPrimary={false}
          />
        )}
        {sub === 'Inspiration' && (
          <Inspiration
            primaryPerks={myData.primaryPerks}
            subPerks={myData.subPerks}
            isPrimary={false}
          />
        )}
        {sub === 'Resolve' && (
          <Resolve
            primaryPerks={myData.primaryPerks}
            subPerks={myData.subPerks}
            isPrimary={false}
          />
        )}
        <RunesText>{sub}</RunesText>
      </RunesPerksBox>
      <RunesDivider />
      <RunesPerksBox>
        <StatsPerks statPerks={myData.statPerks} />
        <RunesText>Rune Stats</RunesText>
      </RunesPerksBox>
    </RunesLayout>
  );
};
export default Runes;
