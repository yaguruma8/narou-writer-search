import requests
import gzip
import json
from urllib.parse import quote


from flask import Blueprint, render_template, request, redirect, url_for

bp = Blueprint('search', __name__)


@bp.get('/')
def index():
    return render_template('index.html')


@bp.get('/search')
def search():
    # todo:エラー処理
    # クエリパラメータを取得
    q = request.args.get('q')
    # なろうユーザ検索APIにリクエスト
    params = {'out': 'json', 'gzip': 5, 'minnovel': 1, 'word': quote(q)}
    url = 'https://api.syosetu.com/userapi/api/'
    content = requests.get(url=url, params=params).content
    data = gzip.decompress(content).decode("utf-8")
    lists = json.loads(data)
    count = lists.pop(0)

    return render_template('search.html', q=q, count=count['allcount'], lists=lists)


@bp.get('/writer/<int:writer_id>')
def writer(writer_id):
    # todo: エラー処理
    # なろう小説APIにリクエスト
    params = {'out': 'json', 'gzip': 5, 'order': 'hyoka', 'userid': writer_id}
    url = 'https://api.syosetu.com/novelapi/api/'
    content = requests.get(url=url, params=params).content
    data = gzip.decompress(content).decode("utf-8")
    lists = json.loads(data)
    count = lists.pop(0)

    return render_template('writer.html', writer_id=writer_id, lists=lists, count=count)
