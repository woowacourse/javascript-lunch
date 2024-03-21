import FavoriteIcon, { ChangeStateProps } from './FavoriteIcon';

function cloneFavoriteIcon(origin: FavoriteIcon, active: boolean, changeState: ChangeStateProps) {
  const clone = new FavoriteIcon({ active, isChild: true, changeState });

  clone.getStarIconSource = origin.getStarIconSource;
  clone.listenChangeState = origin.listenChangeState;
  return clone;
}

export default cloneFavoriteIcon;
