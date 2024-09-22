import Select from 'react-select';
import classNames from 'classnames';

import S from './LayoutFilter.module.scss';

import icon from './images/change-orientation.svg';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout, selectOrientation, setLayout, setOrientation } from '@/store/features/layout/layout';
import { LayoutOrientation } from "@/types/layouts";
import { getLayoutById } from '@/util/layouts';
import { Color } from '@/components';
import { selectColor, setColor } from '@/store/features/layout/layout';
import { layouts } from '@/data/layouts';
import { propsEquals } from '@/util/criteria';

export const LayoutFilter = () => {
  const dispatch = useAppDispatch();
  const LayoutFilter = useAppSelector(selectOrientation);
  const layout = useAppSelector(selectLayout);
  const useColor = useAppSelector(selectColor);

  const isVertical = LayoutFilter === LayoutOrientation.VERTICAL;

  const iconClassName = classNames(
    S.icon,
    isVertical && S.icon_vertical
  );

  const toggleType = () => {
    const nextType = LayoutFilter === LayoutOrientation.HORIZONTAL ? 
      LayoutOrientation.VERTICAL : 
      LayoutOrientation.HORIZONTAL;
    
    const criteria = {
      color: useColor,
      orientation: nextType
    }

    const [firstLayout] = layouts.filter(propsEquals(criteria));
    dispatch(setOrientation(nextType));
    dispatch(setLayout(firstLayout));
  };

  const criteria = {
    color: useColor,
    orientation: layout?.orientation 
  }

  const options = layouts.filter(propsEquals(criteria))
    .map(({ title, id }) => ({
      label: title,
      value: id
    }));

  const value = layout ? options.find(({ value }) => value === layout.id) : null;

  const changeLayoutFilter = (id: string) => {
    const layout = getLayoutById(id);

    if (!layout) {
      return;
    }

    dispatch(setLayout(layout));
  }

  const toggleColor = () => {
    const nextColor = !useColor;

    const criteria = {
      color: nextColor,
      orientation: layout?.orientation
    }

    const [firstLayout] = layouts.filter(propsEquals(criteria));
    dispatch(setColor(nextColor));
    dispatch(setLayout(firstLayout));
  };

  return (
    <div className={S.container}>
      <Color className={S.color} color={useColor ? 'rgb(225 173 36)' : 'black'} onClick={toggleColor}/>
      <img className={iconClassName} src={icon} alt="Change Type" onClick={toggleType}/>
      {options.length > 1 && (
        <Select 
          className={S.select} 
          placeholder="Select type..." 
          value={value} 
          options={options}
          onChange={item => item && changeLayoutFilter(item.value)}
        />
      )}
    </div>
  );
}