from app.models import User

def authenticate(email, password):
    user = User.query.filter_by(email=email).first()
    print(user)
    if user and user.check_password(password):
        return user
    
def identity(payload):
    user_id = payload['identity']
    return User.query.get(user_id)