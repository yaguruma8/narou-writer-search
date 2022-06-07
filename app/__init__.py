
from flask import Flask, render_template


def create_app():
    app = Flask(__name__)

    from .views import search
    app.register_blueprint(search.bp)
    app.add_url_rule('/', endpoint='index')

    @app.template_filter('comma')
    def comma_filter(str):
        return '{:,}'.format(str)

    return app


app = create_app()
