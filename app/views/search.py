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
    writer = request.args.get('writer')
    # なろうユーザ検索APIにリクエスト
    params = {'out': 'json', 'gzip': 5, 'minnovel': 1, 'word': quote(writer)}
    url = 'https://api.syosetu.com/userapi/api/'
    content = requests.get(url=url, params=params).content
    data = gzip.decompress(content).decode("utf-8")
    lists = json.loads(data)
    count = lists.pop(0)
    
    return render_template('search.html', writer=writer, count=count['allcount'], lists=lists)


@bp.get('/writer/<int:writer_id>')
def writer(writer_id):
    return render_template('writer.html', writer_id=writer_id)
