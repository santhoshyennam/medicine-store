
import datetime
from functools import wraps
from flask import g, request
import jwt
from .utils import generate_error_response
# Authentication routes

# define the middleware to check for JWT token
def check_token(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        try:
            data = jwt.decode(token, 'medicine-store', algorithms=["HS256"])
            if 'exp' in data and datetime.datetime.utcnow().timestamp() > data['exp']:
                return generate_error_response('Token has expired'), 401
            g.user = data['id']
        except:
            g.user = None
        return func(*args, **kwargs)
    return wrapped