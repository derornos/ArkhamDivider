import { AddPlayerDividersOptions } from '@/store/features/addDividers/addDividers';
import { IDivider } from '@/types/dividers';
import { CardType, IFaction } from '@/types/game';
import { uniqId } from '@/util/common';

export const getPlayerDividers = (options: AddPlayerDividersOptions) => {
  return [
    ...getBasicWeaknessDividers(options),
    ...getUpgradingDividers(options),
    ...getPlayerCardDividers(options),
  ]
}

export const getPlayerCardDividers = (options: AddPlayerDividersOptions) => {
  const {
    costs,
    factions
  } = options;

  const types = [
    ...options.types,
    ...getAllyType(options)
  ]

  return factions.map(faction => {
    return costs.map(cost => {
      return types.map((type): IDivider => {
        return {
          id: uniqId(),
          name: type.name,
          icon: type.icon || faction.icon,
          previewIcon: faction.icon,
          cardType: type.type,
          type: 'player',
          cost
        }
      });
    })
    .flat()
  })
  .flat()
}

export const getAllyType = ({
  includeAllies
}: {
  includeAllies: boolean
}) => {
  if (!includeAllies) {
    return []
  }

  return [
    {
      id: 'ally',
      icon: 'ally_inverted',
      type: CardType.ASSET,
      name: 'Ally'
    }
  ]
}

export const getUpgradingDividers = ({
  factions,
  useUpgrading
}: {
  factions: IFaction[]
  useUpgrading: boolean
}) => {
  if (!useUpgrading) {
    return [];
  }
  return factions.map((faction): IDivider => ({
    id: uniqId(),
    name: 'Upgrading',
    icon: faction.icon,
    type: 'player'
  }))
}

export const getBasicWeaknessDividers = ({
  includeBasicWeakness
}: AddPlayerDividersOptions) => {
  if (!includeBasicWeakness) {
    return []
  }

  return [
    {
      id: uniqId(),
      name: 'Basic Weakness',
      icon: 'weakness',
      type: 'player'
    }
  ]
}
