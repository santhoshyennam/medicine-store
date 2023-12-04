import datetime
import json
from operator import or_
from flask import Response, request
from . import main
from app import db
from app.models import Customer
from .utils import generate_error_response
from werkzeug.security import generate_password_hash
from .utils import tz

# Customer routes
@main.route("/customers", methods = ["GET"])
def get_all_customers():
    customers = Customer.query.all()
    all_customers = json.dumps([customer.to_dict() for customer in customers])
    return Response(all_customers, mimetype='application/json')

# get customer details
@main.route("/customer", methods = ["GET"])
def get_customer():
    if "customer_id" not in request.args:
        return generate_error_response("customer_id is not found in query parameters")
    else:
        customer_id =  request.args.get('customer_id')
        customer = Customer.query.get(customer_id)
        if not customer:
            return generate_error_response('customer is not found'), 400
        return Response(json.dumps(customer.to_dict()), mimetype='application/json') 

# create customer
@main.route("/create-customer", methods = ["POST"])
def create_customer():
    if "first_name" in request.json  and "last_name" in request.json and "phone_1" in request.json and "email_1" in request.json and "password" in request.json:
        data = request.get_json()
        customer = Customer.query.filter_by(email=request.json["email"]).first()
        if customer:
            return generate_error_response('Email is already taken'), 400
        new_customer = Customer(first_name=data['first_name'],last_name=data['last_name'], phone_1=data["phone_1"], phone_2=data["phone_2"], email_1=data["email_1"], email_2=data["email_2"], address=data["address"],password= generate_password_hash(data["password"]),city=data["city"], state=data["state"], zip_code=data["zip_code"], date_created=datetime.datetime.now(tz))
        db.session.add(new_customer)
        db.session.commit()
        return Response(json.dumps(new_customer.to_dict()), mimetype='application/json'),201
    else:
        return generate_error_response("some fields are missing in the request body")


# delete customer
@main.route("/delete-customer", methods = ["DELETE"])
def delete_customer():
    if "customer_id" not in request.args:
        return generate_error_response("customer_id is not found in query parameters")
    else:
        customer_id =  request.args.get('customer_id')
        customer = Customer.query.get(customer_id)
        if not customer:
            return generate_error_response('customer is not found'), 400
        db.session.delete(customer)
        db.session.commit()
        return Response(json.dumps({'success': 'customer deleted successfully',"customer_id":customer_id})), 200 

# edit customer
@main.route("/edit-customer", methods = ["PATCH"])
def edit_customer():
    if "customer_id" not in request.json:
        return generate_error_response("customer_id is not found in the request body")
    elif "email_1" in request.json:
        return generate_error_response("Email cannot be changed once registered! Remove email from request body.")
    else:
        customer_id = request.json.get("customer_id")
        # Retrieve the record to be updated
        customer = Customer.query.get(customer_id)
        if not customer:
            return generate_error_response('customer is not found'), 400
        
        # Update the record attributes
        customer.firt_name = request.json.get('firt_name',customer.firt_name)
        customer.phone_1 = request.json.get('phone_1',customer.phone_1)
        customer.last_name = request.json.get('last_name',customer.last_name)
        customer.phone_2 = request.json.get('phone_2',customer.phone_2)
        # customer.email = request.json.get('email',customer.email)
        customer.address = request.json.get('address',customer.address)
        customer.password = request.json.get('password',customer.password)
        customer.city = request.json.get('city',customer.city)
        customer.state = request.json.get('state',customer.state)
        customer.zip_code = request.json.get('zip_code',customer.zip_code)
        customer.email_2 = request.json.get('email_2',customer.email_2)
        customer.last_updated_date = datetime.datetime.now(tz)
        # Commit the transaction to save changes to the database
        db.session.commit()
        return Response(json.dumps({'success': 'customer updated successfully',"customer_id":customer_id})), 200 

# filter customer by first or last name
@main.route("/customers/filter", methods = ["GET"])
def filter_customers():
    if "filter_text" not in request.json:
        return generate_error_response("filter_text is not found")
    else:
         # Get filter_text for filtering
        filter_text = request.json.get('filter_text')
        
        # Build filter criteria based on query parameters
        filters = or_(Customer.first_name.ilike(f'%{filter_text}%'),Customer.last_name.ilike(f'%{filter_text}%'))
        # Query database with filters
        customers = Customer.query.filter(filters).all()
        if not customers:
            return generate_error_response('no customer is found'), 400
        # Serialize customers to JSON and return as response
        return Response(json.dumps([customer.to_dict() for customer in customers]), mimetype='application/json'), 200