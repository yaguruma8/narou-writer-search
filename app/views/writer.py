import requests
import gzip
import json
from time import sleep

from flask import Blueprint, render_template, request, redirect, url_for, jsonify


bp = Blueprint('writer', __name__)


@bp.get('/')
def index():
    # writer_idがない場合
    return redirect(url_for('search.index'))


@bp.get('/<int:writer_id>')
def result(writer_id):
    # todo: エラー処理
    # なろうユーザAPIからユーザー名の読み方取得
    names = get_writer_names(writer_id)
    return render_template('writer.html', names=names, writer_id=writer_id)

@bp.get('/<int:writer_id>/get')
def result_json(writer_id):
    return jsonify(get_writer_works(writer_id))


def get_writer_works(writer_id):
    '''なろう小説APIから作品一覧を取得する'''
    params = {'out': 'json', 'gzip': 5, 'order': 'hyoka',
              'userid': writer_id, 'lim': 500}
    url = 'https://api.syosetu.com/novelapi/api/'
    content = requests.get(url=url, params=params).content
    data = gzip.decompress(content).decode("utf-8")
    return json.loads(data)


def get_writer_names(writer_id):
    '''なろうユーザ検索APIから名前と読み方を取得する'''
    params = {'out': 'json', 'gzip': 5, 'minnovel': 1,
              'userid': writer_id, 'of': 'n-y'}
    url = 'https://api.syosetu.com/userapi/api/'
    content = requests.get(url=url, params=params).content
    data = gzip.decompress(content).decode("utf-8")
    return json.loads(data)[1]
