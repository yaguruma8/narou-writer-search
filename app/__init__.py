from flask import Flask


def create_app():
    app = Flask(__name__)

    # blueprint
    from .views import search
    app.register_blueprint(search.bp)
    app.add_url_rule('/', endpoint='index')

    from .views import writer
    app.register_blueprint(writer.bp, url_prefix='/writer')

    # jinja custom filter
    @app.template_filter('comma')
    def comma_filter(str):
        return '{:,}'.format(str)

    return app


app = create_app()
