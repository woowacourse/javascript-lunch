interface Props {
  firstTitle: string;
  secondTitle: string;
  onClick?: (value: boolean) => void;
}

const Navbar = ({ firstTitle, secondTitle, onClick }: Props) => {
  const container = document.createElement('div');
  const allRestaurantNav = document.createElement('div');
  const favoriteRestaurantNav = document.createElement('div');

  container.classList.add('restaurant-navbar-container');
  allRestaurantNav.textContent = firstTitle;
  allRestaurantNav.id = 'all-restaurant';
  allRestaurantNav.classList.add('restaurant-nav', 'text-body', 'selected');
  favoriteRestaurantNav.textContent = secondTitle;
  favoriteRestaurantNav.id = 'favorite-restaurant';
  favoriteRestaurantNav.classList.add('restaurant-nav', 'text-body');

  container.appendChild(allRestaurantNav);
  container.appendChild(favoriteRestaurantNav);

  if (onClick) {
    container.addEventListener('click', event => {
      allRestaurantNav.classList.remove('selected');
      favoriteRestaurantNav.classList.remove('selected');

      if (event.target === allRestaurantNav) onClick(true);
      else onClick(false);
      (event.target as HTMLDivElement).classList.add('selected');
    });
  }

  return container;
};

export default Navbar;
