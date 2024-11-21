import { isNotNil, prop, propEq } from "ramda";
import { getEncounterSize } from "./getEncounterSize";
import { uniqId } from "@/util/common";
import { IGetStoryDividersOptions } from "./getStoryDividers";
import { DividerType } from "@/types/dividers";
import { getStoryScenarios } from "./getScenarioDividers";

type IGetEncounterDividersParams = IGetStoryDividersOptions;

export const getEncounterDividers = (options: IGetEncounterDividersParams) => {
  const {
    story,
    includeExtraSets,
    includeScenarioEncounterSet,
    includeCampaignIcon,
    includeEncounters,
    encounterSets
  } = options;

  if (!includeEncounters && !includeScenarioEncounterSet) {
    return [];
  }

  const {
    icon,
    encounter_sets,
    extra_encounter_sets,
  } = story;

  const scenarios = getStoryScenarios(story);
  const scenarioNames = scenarios.map(prop('scenario_name'));

  const campaignIcon = icon;

  const extraEncounters = includeExtraSets ? extra_encounter_sets : [];

  const encounters = [
    ...encounter_sets,
    ...extraEncounters
  ];

  return encounters
    .map(code => {
      const isExtra = extra_encounter_sets.includes(code);
      const encounter = encounterSets.find(propEq(code, 'code'));
      
      if (!encounter) {
        return;
      }
      
      const {
        name,
        icon,
      } = encounter;

      const isScenario = Boolean(icon) && scenarioNames.includes(name)

      if (!includeScenarioEncounterSet && isScenario) {
        return;
      }

      if (!isScenario && !includeEncounters) {
        return;
      }
      
      const sizeData = getEncounterSize({
        ...options,
        isExtra,
        encounter,
      })

      return {
        id: uniqId() + code,
        ...sizeData,
        story,
        name,
        icon,
        campaignIcon,
        type: DividerType.ENCOUNTER,
        displayCampaignIcon: includeCampaignIcon
      }
    })
  .filter(isNotNil);
}