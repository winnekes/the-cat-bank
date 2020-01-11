from app import appx
from flask_jwt import JWT, jwt_required

@appx.route('/')
@appx.route('/index')
@jwt_required()
def index():
    return "Hello, World!"
