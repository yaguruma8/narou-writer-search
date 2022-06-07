import requests
import gzip
import ast

from flask import Flask, render_template


def create_app():
    app = Flask(__name__)

    # @app.route('/')
    # def index():
    #     url = "https://api.syosetu.com/novelapi/api/?userid=641439&out=json&gzip=5&order=hyoka"
    #     res = requests.get(url=url).content
    #     data = gzip.decompress(res).decode("utf-8")
    #     lists = ast.literal_eval(data)
    #     count = lists.pop(0)
    #     return render_template('index.html', lists=lists, count=count)

    from .views import search
    app.register_blueprint(search.bp)
    app.add_url_rule('/', endpoint='index')

    return app


app = create_app()
