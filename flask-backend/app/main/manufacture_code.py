import datetime
import json
from operator import or_
from flask import Response, request
from . import main
from app import db
from app.models import ManufactureCode
from .utils import generate_error_response, tz

# ManufactureCode routes

@main.route("/manufacture-codes", methods = ["GET"])
def get_all_manufacture_codes():
    manufacture_codes = ManufactureCode.query.all()
    all_manufacture_codes = json.dumps([manufacture_code.to_dict() for manufacture_code in manufacture_codes])
    return Response(all_manufacture_codes, mimetype='application/json')

@main.route("/manufacture-code", methods = ["GET"])
def get_manufacture_code():
    if "manufacture_code_id" not in request.args:
        return generate_error_response("manufacture_code_id is not found in query parameters")
    else:
        manufacture_code_id =  request.args.get('manufacture_code_id')
        manufacture_code = ManufactureCode.query.get(manufacture_code_id)
        if not manufacture_code:
            return generate_error_response('manufacture_code is not found'), 400
        return Response(json.dumps(manufacture_code.to_dict()), mimetype='application/json') 

@main.route("/create-manufacture-code", methods = ["POST"])
def create_manufacture_code():
    if "manufacture_1" in request.json:
        data = request.get_json()
        new_manufacture_code = ManufactureCode(manufacture_1=data["manufacture_1"],manufacture_2=data["manufacture_2"],manufacture_3=data["manufacture_3"],manufacture_4=data["manufacture_4"], date_created=datetime.datetime.now(tz))
        db.session.add(new_manufacture_code)
        db.session.commit()
        return Response(json.dumps(new_manufacture_code.to_dict()), mimetype='application/json'),201
    else:
        return generate_error_response("manufacture_1 is missing in request body")


@main.route("/delete-manufacture-code", methods = ["DELETE"])
def delete_manufacture_code():
    if "manufacture_code_id" not in request.args:
        return generate_error_response("manufacture_code_id is not found in query parameters")
    else:
        manufacture_code_id =  request.args.get('manufacture_code_id')
        manufacture_code = ManufactureCode.query.get(manufacture_code_id)
        if not manufacture_code:
            return generate_error_response('manufacture_code is not found'), 400
        db.session.delete(manufacture_code)
        db.session.commit()
        return Response(json.dumps({'success': 'manufacture_code deleted successfully',"manufacture_code_id":manufacture_code_id})), 200 

@main.route("/edit-manufacture-code", methods = ["PATCH"])
def edit_manufacture_code():
    if "manufacture_code_id" not in request.json:
        return generate_error_response("manufacture_code_id is not found in the request body")
    else:
        manufacture_code_id = request.json.get("manufacture_code_id")
        # Retrieve the record to be updated
        manufacture_code = ManufactureCode.query.get(manufacture_code_id)
        if not manufacture_code:
            return generate_error_response('manufacture_code is not found'), 400
        
        # Update the record attributes
        manufacture_code.manufacture_1 = request.json.get('manufacture_1',manufacture_code.manufacture_1)
        manufacture_code.manufacture_2 = request.json.get('manufacture_2',manufacture_code.manufacture_2)
        manufacture_code.manufacture_3 = request.json.get('manufacture_3',manufacture_code.manufacture_3)
        manufacture_code.manufacture_4 = request.json.get('manufacture_4',manufacture_code.manufacture_4)
        manufacture_code.last_updated_date = datetime.datetime.now(tz)
        # Commit the transaction to save changes to the database
        db.session.commit()
        return Response(json.dumps({'success': 'manufacture_code updated successfully',"manufacture_code_id":manufacture_code_id})), 200 

@main.route("/manufacture_codes/filter", methods = ["GET"])
def filter_manufacture_codes():
    if "filter_text" not in request.json:
        return generate_error_response("filter_text is not found")
    else:
         # Get filter_text for filtering
        filter_text = request.json.get('filter_text')
        
        # Build filter criteria based on query parameters
        filters = or_(ManufactureCode.manufacture_1.ilike(f'%{filter_text}%'),ManufactureCode.manufacture_4.ilike(f'%{filter_text}%'),ManufactureCode.manufacture_2.ilike(f'%{filter_text}%'),ManufactureCode.manufacture_3.ilike(f'%{filter_text}%'))
        # Query database with filters
        manufacture_codes = ManufactureCode.query.filter(filters).all()
        if not manufacture_codes:
            return generate_error_response('no manufacture_codes is found'), 400
        # Serialize manufacture_codes to JSON and return as response
        return Response(json.dumps([manufacture_code.to_dict() for manufacture_code in manufacture_codes]), mimetype='application/json'), 200