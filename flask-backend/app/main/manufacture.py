import datetime
import json
from flask import Response, request
from . import main
from app import db
from app.models import Manufacture
from .utils import generate_error_response, tz

# Manufacture routes

@main.route("/manufactures", methods = ["GET"])
def get_all_manufactures(): 
    manufactures = Manufacture.query.all()
    all_manufactures = json.dumps([manufacture.to_dict() for manufacture in manufactures])
    return Response(all_manufactures, mimetype='application/json')

@main.route("/manufacture", methods = ["GET"])
def get_manufacture(): 
    if "manufacture_id" not in request.args:
        return generate_error_response("manufacture_id is not found in query parameters")
    else:
        manufacture_id =  request.args.get('manufacture_id')
        manufacture = Manufacture.query.get(manufacture_id)
        if not manufacture:
            return generate_error_response('manufacture is not found'), 400
        return Response(json.dumps(manufacture.to_dict()), mimetype='application/json') 

@main.route("/create-manufacture", methods = ["POST"])
def create_manufacture():
    if "manufacture_code_id" in request.json and "name" in request.json:
        data = request.get_json()
        new_manufacture = Manufacture(name=data["name"],manufacture_code_id=data["manufacture_code_id"], date_created=datetime.datetime.now(tz))
        db.session.add(new_manufacture)
        db.session.commit()
        return Response(json.dumps(new_manufacture.to_dict()), mimetype='application/json'),201
    else:
        return generate_error_response("some fields are missing in request body")


@main.route("/delete-manufacture", methods = ["DELETE"])
def delete_manufacture():
    if "manufacture_id" not in request.args:
        return generate_error_response("manufacture_id is not found in query parameters")
    else:
        manufacture_id =  request.args.get('manufacture_id')
        manufacture = Manufacture.query.get(manufacture_id)
        if not manufacture:
            return generate_error_response('manufacture is not found'), 400
        db.session.delete(manufacture)
        db.session.commit()
        return Response(json.dumps({'success': 'manufacture deleted successfully',"manufacture_id":manufacture_id})), 200 

@main.route("/edit-manufacture", methods = ["PATCH"])
def edit_manufacture():
    if "manufacture_id" not in request.json:
        return generate_error_response("manufacture_id is not found in the request body")
    else:
        manufacture_id = request.json.get("manufacture_id")
        # Retrieve the record to be updated
        manufacture = Manufacture.query.get(manufacture_id)
        if not manufacture:
            return generate_error_response('manufacture is not found'), 400
        
        # Update the record attributes
        manufacture.name = request.json.get('name',manufacture.name)
        manufacture.manufacture_code_id = request.json.get('manufacture_code_id',manufacture.manufacture_code_id)
        manufacture.last_updated_date = datetime.datetime.now(tz)
        # Commit the transaction to save changes to the database
        db.session.commit()
        return Response(json.dumps({'success': 'manufacture updated successfully',"manufacture_id":manufacture_id})), 200 

@main.route("/manufactures/filter", methods = ["GET"])
def filter_manufactures():
    if "filter_text" not in request.json:
        return generate_error_response("filter_text is not found")
    else:
         # Get filter_text for filtering
        filter_text = request.json.get('filter_text')
        
        # Build filter criteria based on query parameters
        filters = Manufacture.name.ilike(f'%{filter_text}%')
        # Query database with filters
        manufactures = Manufacture.query.filter(filters).all()
        if not manufactures:
            return generate_error_response('no manufactures is found'), 400
        # Serialize manufactures to JSON and return as response
        return Response(json.dumps([manufacture.to_dict() for manufacture in manufactures]), mimetype='application/json'), 200