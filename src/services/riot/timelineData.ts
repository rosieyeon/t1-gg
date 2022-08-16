import { Tracing } from 'trace_events';

interface DetailDataDto {
  frameInterval: number;
  frames: FramesDto[];
  gameId: number;
  participants: ParticipantsDto[];
}

interface ParticipantsDto {
  participantId: number;
  puuid: string;
}

interface FramesDto {
  events: []; //TODO 여기에 뭐라고 써야하지? itemevent? levelevent?
  participantFrames: {
    1: ParticipantsFramesDto;
    2: ParticipantsFramesDto;
    3: ParticipantsFramesDto;
    4: ParticipantsFramesDto;
    5: ParticipantsFramesDto;
    6: ParticipantsFramesDto;
    7: ParticipantsFramesDto;
    8: ParticipantsFramesDto;
    9: ParticipantsFramesDto;
    10: ParticipantsFramesDto;
  };
  timestamp: number;
}

// TODO 일단 type 기준으로 나누는 것으로 생각하기
interface ItemEventsDto {
  itemId: number;
  participantId: number;
  timestamp: number;
  type: string;
}

interface LevelEventsDto {
  levelUpType: string;
  participantId: number;
  skillSlot: number;
  timestamp: number;
  type: string;
}

interface WardKillEventsDto {
  killerId: number;
  timestamp: number;
  type: string;
  wardType: string;
}

interface WardCreateEventsDto {
  creatorId: number;
  timestamp: number;
  type: string;
  wardType: string;
}

interface KillEventsDto {
  killType: string;
  killerId: number;
  position: { x: number; y: number };
  timestamp: number;
  type: string;
}

interface ParticipantsFramesDto {
  championStats: [];
  currentGold: number;
  damageStats: [];
  goldPerSecond: number;
  jungleMinionsKilled: number;
  level: number;
  minionsKilled: number;
  participantId: number;
  position: { x: number; y: number };
  timeEnemySpentControlled: number;
  totalGold: number;
  xp: number;
}

interface GoldFrames {
  time: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
}

export const goldFrameData = (data: FramesDto[]) => {
  return data.map((item: FramesDto, index) => {
    return {
      time: index,
      1: item.participantFrames[1].totalGold,
      2: item.participantFrames[2].totalGold,
      3: item.participantFrames[3].totalGold,
      4: item.participantFrames[4].totalGold,
      5: item.participantFrames[5].totalGold,
      6: item.participantFrames[6].totalGold,
      7: item.participantFrames[7].totalGold,
      8: item.participantFrames[8].totalGold,
      9: item.participantFrames[9].totalGold,
      10: item.participantFrames[10].totalGold,
    };
  });
};