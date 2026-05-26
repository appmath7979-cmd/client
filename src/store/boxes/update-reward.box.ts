import type { RegionType } from "#/types/reward.type"
import { createBox } from "@lavaz/store"

interface StationState {
  region: RegionType
  station: string
  value: string
}

type UpdateRewardState = StationState[]

const initialState: UpdateRewardState = []

export const updateRewardBox = createBox(initialState, set => ({
  setStationValue: (data: StationState) => set(prev => {
    if (prev.find(item => item.station === data.station)) {
      const filter = prev.filter(st => st.station !== data.station)
      return [...filter, data]
    } return [...prev, data]
  })
})).create()