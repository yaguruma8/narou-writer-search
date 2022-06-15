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
    drawGenre(works);
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

// ジャンルの表示
function drawGenre(works) {
  const genreName = {
    101: '異世界[恋愛]',
    102: '現実世界[恋愛]',
    201: 'ハイファンタジー[ファンタジー]',
    202: 'ローファンタジー[ファンタジー]',
    301: '純文学[文芸]',
    302: 'ヒューマンドラマ[文芸]',
    303: '歴史[文芸]',
    304: '推理[文芸]',
    305: 'ホラー[文芸]',
    306: 'アクション[文芸]',
    307: 'コメディー[文芸]',
    401: 'VRゲーム[SF]',
    402: '宇宙[SF]',
    403: '空想科学[SF]',
    404: 'パニック[SF]',
    9901: '童話[その他]',
    9902: '詩[その他]',
    9903: 'エッセイ[その他]',
    9904: 'リプレイ[その他]',
    9999: 'その他[その他]',
    9801: 'ノンジャンル[ノンジャンル]',
  };
  const [count, ...lists] = works;

  const genreCountMap = new Map();
  for (const list of lists) {
    if (!genreCountMap.has(list.genre)) {
      genreCountMap.set(list.genre, 1);
    } else {
      const count = genreCountMap.get(list.genre) + 1;
      genreCountMap.set(list.genre, count);
    }
  }
  const genreListElement = element`<ul></ul>`;
  for (const [key, value] of genreCountMap) {
    const genreItemElement = element`<li>${genreName[key]}(${value})</li>`;
    genreListElement.appendChild(genreItemElement);
  }
  const genreList = document.getElementById('works-genre');
  genreList.appendChild(genreListElement);
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
      <div>${list.novel_type===1?'連載':'短編'}
      <div>${list.novel_type===1&&list.end === 0?'完結済':''}
      <div>ブックマーク : ${list.fav_novel_cnt.toLocaleString()}</div>
      <div>最終更新日 : ${list.general_lastup}</div>
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
