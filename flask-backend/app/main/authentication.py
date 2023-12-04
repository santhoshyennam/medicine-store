import datetime
import json
from flask import Response, request
import jwt
from . import main
from app import db
from app.models import Customer
from .utils import generate_error_response
from werkzeug.security import generate_password_hash, check_password_hash


# login for customer
@main.route("/login", methods = ["GET","POST"])
def login():
    print("login",request.json)
    if "email" in request.json and "password" in request.json:
        customer = Customer.query.filter_by(email_1=request.json["email"]).first()
        if not customer or not check_password_hash(customer.password, request.json["password"]):
            return generate_error_response("Invalid Credentials"), 401
        token = jwt.encode({
            'id': customer.id,
            'exp': datetime.datetime.utcnow().timestamp() + 4000
        }, 'medicine-store')
        return Response(json.dumps({'access_token': token, 'customer': customer.to_dict()}), mimetype='application/json'), 201
    else:
        return generate_error_response("some fields are missing in the request")

# signup for customer
@main.route("/signup", methods=["POST"])
def signup():
    print("req",request.json)
    if "first_name" in request.json  and "last_name" in request.json and "phone_1" in request.json and "email_1" in request.json and "password" in request.json:
        data = request.get_json()
        customer = Customer.query.filter_by(email_1=request.json["email_1"]).first()
        if customer:
            return generate_error_response('Email is already taken'), 400
        new_customer = Customer(first_name=data['first_name'],last_name=data['last_name'], phone_1=data["phone_1"], phone_2=data["phone_2"], email_1=data["email_1"], email_2=data["email_2"], address=data["address"],password= generate_password_hash(data["password"]),city=data["city"], state=data["state"], zip_code=data["zip_code"])
        db.session.add(new_customer)
        db.session.commit()
        return Response(json.dumps(new_customer.to_dict()), mimetype='application/json'),201
    else:
        return generate_error_response("some fields are missing in the request")

# logout
@main.route("/logout", methods = ["GET"])
def logout():
    response = json.dumps({'message': 'Logged out successfully'})
    response.set_cookie('access_token', '', expires=0, secure=True, httponly=True)
    return response, 200