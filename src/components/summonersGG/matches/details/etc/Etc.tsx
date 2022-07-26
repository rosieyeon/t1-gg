import { getBuildDetail } from 'api/riotAPI';
import { MatchData, matchParticipants } from 'features/riot/matchDetailSlice';
import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { GoldFrames } from 'services/riot/timelineData';
import Champions from './Champions';
import CustomTooltip from './CustomTooltip';
import { EtcCategory, EtcCategoryBox, EtcLayout } from './Etc.styled';

interface EtcProps {
  data: MatchData;
  myData: matchParticipants;
}

const Etc = (etcData: EtcProps) => {
  const matchId = etcData.data.matchId;
  const myId = etcData.myData.participantId;
  //TODO state를 쓰던 뭘 쓰던 해서 호출 횟수를 관리해주기 이 데이터를 쓰는 다른 코드가 있으면 ㅁ후ㅏㄴ에러임
  const data = getBuildDetail(matchId);

  const [graphDataSelected, setGraphDataSelected] = useState([
    true,
    false,
    false,
  ]);
  const [champSelected, setChampSelected] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [allData, setAllData] = useState<GoldFrames[][][]>();
  const [selectedData, setSelectedData] = useState<GoldFrames[]>();

  useEffect(() => {
    data.then((item) => {
      setAllData(item);
    });

    champSelected.map((button, id) => {
      if (button) {
        setChampSelected([
          ...champSelected.slice(0, id),
          (champSelected[id] = false),
          ...champSelected.slice(id + 1),
        ]);
      }
      return null;
    });
    setChampSelected([
      ...champSelected.slice(0, myId - 1),
      !champSelected[myId - 1],
      ...champSelected.slice(myId),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allData) {
      setSelectedData(allData[0][0]);
    }
  }, [allData]);

  const getActiveTab = (idx: number) => {
    graphDataSelected.map((button, id) => {
      if (button) {
        setGraphDataSelected([
          ...graphDataSelected.slice(0, id),
          (graphDataSelected[id] = false),
          ...graphDataSelected.slice(id + 1),
        ]);
      }
      return null;
    });
    setGraphDataSelected([
      ...graphDataSelected.slice(0, idx),
      !graphDataSelected[myId - 1],
      ...graphDataSelected.slice(idx + 1),
    ]);
  };

  return (
    <EtcLayout>
      <EtcCategoryBox>
        {frameCategories.map(
          (category, idx) =>
            allData && (
              <EtcCategory
                key={idx}
                onClick={() => {
                  getActiveTab(idx);
                  setSelectedData(allData[0][idx]);
                }}
                selected={graphDataSelected[idx]}
              >
                {category.name}
              </EtcCategory>
            )
        )}
      </EtcCategoryBox>
      <Champions
        data={etcData.data}
        setSelected={setChampSelected}
        selected={champSelected}
      />
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={selectedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid horizontal={true} vertical={false} />
          <XAxis dataKey="time" unit="min" />
          <YAxis unit={graphDataSelected[2] ? '' : 'k'} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          {selectedData?.map(
            (data, idx) =>
              champSelected[idx] && (
                <Line
                  key={idx}
                  type="monotone"
                  dataKey={idx + 1}
                  dot={false}
                  stroke={lineColors[idx]}
                />
              )
          )}
        </LineChart>
      </ResponsiveContainer>
    </EtcLayout>
  );
};

export const lineColors = [
  '#00ae0a',
  '#00bba3',
  '#52d5f3',
  '#0093ff',
  '#7d59ea',
  '#ffbac3',
  '#e84057',
  '#ff8200',
  '#ffd424',
  '#76480f',
];

const frameCategories = [
  { name: 'Gold acquired by champion' },
  { name: 'EXP Over Time' },
  { name: 'CS per Champion' },
];

export default Etc;
