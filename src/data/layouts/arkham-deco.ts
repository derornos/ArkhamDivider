import { BASE_PATH, BOOSTY_LINK } from "@/constants/app";
import { ILayout, ILayoutCategory, LayoutOrientation, LayoutType } from "@/types/layouts";
import { PageOrientation } from "@/types/print";

export enum ArkhamDecoDividerType {
  TAB = 'tab'
} 

export enum ArkhamDecoDividerSize {
  SMALL = 'small'
} 

export const common = {
  categoryId: "arkham-deco",
  title: "Arkham Deco",
  types: [LayoutType.SCENARIO, LayoutType.PLAYER, LayoutType.INVESTIGATOR],
  pageOrientation: PageOrientation.PORTRAIT,
  maxCreditsGroupSize: 6,
  campaignOptions: {
    includeCampaignIcon: true
  },
  playerOptions: {
    displayNumericXP: false
  }
}

export const horizontal = {
  rowSize: 2,
  groupSize: 8,
  width: 94,
  height: 68.5,
  bleeds: {
    width: 100,
    height: 74.5,
    top: 3,
    left: 3,
  }
}

export const vertical = {
  rowSize: 3,
  groupSize: 6,
  width: 62,
  height: 96,
  bleeds: {
    width: 68,
    height: 102,
    top: 3,
    left: 3
  },
  customParams: {
    type: 'tab'
  },
}

export const horizontalDeckbox = {
  rowSize: 2,
  groupSize: 8,
  width: 94,
  height: 70,
  bleeds: {
    width: 100,
    height: 76,
    top: 3,
    left: 3
  },
  customParams: {
    type: 'deckbox'
  }
}

export const horizontalSmall = {
  rowSize: 2,
  groupSize: 8,
  width: 94,
  height: 67,
  bleeds: {
    width: 100,
    height: 73,
    top: 3,
    left: 3
  },
  customParams: {
    type: 'tab',
    size: 'small'
  }
}

export const horizontalTab = {
  ...horizontal,
  width: 93.5,
  height: 68.5,
  bleeds: {
    width: 99,
    height: 74.5,
    top: 3,
    left: 3
  },
  customParams: {
    type: 'tab'
  }
}

export const arkhamDecoLayouts: ILayout[] = [
  {
    ...common,
    ...horizontal,
    id: "arkham-deco",
    title: "Standart",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
  },
  {
    ...common,
    ...horizontalDeckbox,
    id: "arkham-deco-large",
    title: "Deck Box",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
  },
  {
    ...common,
    ...horizontalSmall,
    id: "arkham-deco-small",
    title: "UCF Standart",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
  },
  {
    ...common,
    ...horizontalTab,
    title: "UCF50",
    id: "arkham-deco-tab",
    orientation: LayoutOrientation.HORIZONTAL,
    color: true,
  },
  {
    ...common,
    ...horizontal,
    id: "arkham-deco-bw",
    title: "Standart",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...horizontalDeckbox,
    id: "arkham-deco-large-bw",
    title: "Deck Box",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...horizontalTab,
    title: "UCF50",
    id: "arkham-deco-tab-bw",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...horizontalSmall,
    id: "arkham-deco-small-bw",
    title: "UCF Standart",
    orientation: LayoutOrientation.HORIZONTAL,
    color: false,
  },
  {
    ...common,
    ...vertical,
    title: "UC Quartz",
    id: "arkham-deco-vertical",
    orientation: LayoutOrientation.VERTICAL,
    color: true,
  },
  {
    ...common,
    ...vertical,
    id: "arkham-deco-vertical-bw",
    title: "UC Quartz",
    orientation: LayoutOrientation.VERTICAL,
    color: false,
  },
]

export const arkhamDecoCategory: ILayoutCategory = {
  id: 'arkham-deco',
  name: 'Arkham Deco',
  info: 'Compact Dividers',
  author: {
    name: 'Vladimir Yazykov',
    image: BASE_PATH + '/images/neizerth.jpg',
    url: 'https://github.com/neizerth',
    donationUrl: BOOSTY_LINK,
    contacts: [
      {
        id: 'boosty',
        icon: 'link',
        url: BOOSTY_LINK
      },
      {
        id: 'github',
        icon: 'github',
        url: 'https://github.com/neizerth'
      },
      {
        id: 'mail',
        icon: 'mail',
        url: 'mailto:neizerth@gmail.com'
      },
      {
        id: 'telegram',
        icon: 'telegram',
        url: 'https://t.me/neizerth'
      },
    ]
  }
}