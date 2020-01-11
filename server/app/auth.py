from app.models import User

def authenticate(username, password):
    user = User.get(email, None)
    if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
        return user
    
def identity(payload):
    user_id = payload['identity']
    return User.get(user_id, None)