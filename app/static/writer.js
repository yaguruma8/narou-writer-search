// console.log('hello!');

document.addEventListener('DOMContentLoaded', () => {
  // rootの取得
  const rootElement = document.querySelector('#root');
  // waitの表示
  const waitElement = document.createElement('div');
  waitElement.textContent = 'wait...';
  rootElement.appendChild(waitElement);
  // 作品一覧の取得(json)
  (async () => {
    const works = await fetch(`${location.pathname}/get`).then((res) =>
      res.json()
    );
    // 作品数の表示
    const counterElement = document.createElement('div');
    counterElement.textContent = `作品数: ${works[0].allcount}件`;
    rootElement.replaceChild(counterElement,waitElement);
  })();
});
