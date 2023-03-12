export default () => {
  const $lunchApp = document.querySelector<HTMLDivElement>('#lunch-app');

  if (!$lunchApp) return;

  $lunchApp.insertAdjacentHTML(
    'afterbegin',
    ` <r-header></r-header>
        <main>
          <r-restaurant-type-section></r-restaurant-type-section>
          <r-search-restaurant-section></r-search-restaurant-section>
          <r-restaurant-list id="restaurant-list"></r-restaurant-list>
        </main>
      `,
  );
};
