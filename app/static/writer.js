// console.log('hello!');

document.addEventListener('DOMContentLoaded', () => {
  // rootの取得
  const rootElement = document.querySelector('#root');
  // 作品一覧の取得(json)
  (async () => {
    const works = await fetch(`${location.pathname}/get`).then((res) =>
      res.json()
    );
    // 作品数の表示
    drawWorksCount(works);
    // 作品の表示
    drawWorksList(works);
  })();
});

// 作品数の表示
function drawWorksCount(works) {
  const worksCountElement = document.getElementById('works-count');
  const count = works[0].allcount;
  const countElement = element`<div>作品数 ${count}件</div>`;
  if (count > 500) {
    countElement.textContent += `(500件まで表示します)`;
  }
  worksCountElement.appendChild(countElement);
}

// 各作品の表示
function drawWorksList(works) {
  const [count, ...lists] = works;
  console.log(lists);
  const worksList = document.getElementById('works-list');
  for (const list of lists) {
    const work = element`
    <div class="work" style="padding: 10px; border: 1px solid black;">
      <div><a href="https://ncode.syosetu.com/${list.ncode.toLowerCase()}">${
      list.title
    }</a></div>
      <div>${list.global_point.toLocaleString()}pt</div>
      <div>${list.length.toLocaleString()}文字</div>
      <div>${list.keyword}</div>
      <div>${list.story} </div>
    </div>
    `;
    worksList.appendChild(work);
  }
}

// 文字列のエスケープ
function escapeSpecialChars(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// html文字列からDOM Nodeを生成して返す
function element(strings, ...values) {
  const htmlString = strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === 'string') {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  return template.content.firstElementChild;
}
