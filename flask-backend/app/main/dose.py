import datetime
import json
from flask import Response, request
from . import main
from app import db
from app.models import Dose
from .utils import generate_error_response
from .utils import tz

# Dose routes
@main.route("/doses", methods = ["GET"])
def get_all_doses():
    doses = Dose.query.all()
    all_doses = json.dumps([dose.to_dict() for dose in doses])
    return Response(all_doses, mimetype='application/json')

# get dose by id
@main.route("/dose", methods = ["GET"])
def get_dose():  
    if "dose_id" not in request.args:
        return generate_error_response("dose_id is not found in query parameters")
    else:
        dose_id =  request.args.get('dose_id')
        dose = Dose.query.get(dose_id)
        if not dose:
            return generate_error_response('dose is not found'), 400
        return Response(json.dumps(dose.to_dict()), mimetype='application/json') 

# create dose
@main.route("/create-dose", methods = ["POST"])
def create_dose():  
    if "dose_stg" in request.json:
        data = request.get_json()
        new_dose = Dose(dose_stg=data["dose_stg"], date_created=datetime.datetime.now(tz))
        db.session.add(new_dose)
        db.session.commit()
        return Response(json.dumps(new_dose.to_dict()), mimetype='application/json'),201
    else:
        return generate_error_response("dose_stg is missing in request body")


# delete dose
@main.route("/delete-dose", methods = ["DELETE"])
def delete_dose(): 
    if "dose_id" not in request.args:
        return generate_error_response("dose_id is not found in query parameters")
    else:
        dose_id =  request.args.get('dose_id')
        dose = Dose.query.get(dose_id)
        if not dose:
            return generate_error_response('dose is not found'), 400
        db.session.delete(dose)
        db.session.commit()
        return Response(json.dumps({'success': 'dose deleted successfully',"dose_id":dose_id})), 200 

# edit dose
@main.route("/edit-dose", methods = ["PATCH"])
def edit_dose():
    if "dose_id" not in request.json:
        return generate_error_response("dose_id is not found in the request body")
    else:
        dose_id = request.json.get("dose_id")
        # Retrieve the record to be updated
        dose = Dose.query.get(dose_id)
        if not dose:
            return generate_error_response('dose is not found'), 400
        
        # Update the record attributes
        dose.dose_stg = request.json.get('dose_stg',dose.dose_stg)
        dose.last_updated_date = datetime.datetime.now(tz)
        # Commit the transaction to save changes to the database
        db.session.commit()
        return Response(json.dumps({'success': 'dose updated successfully',"dose_id":dose_id})), 200 

# filter dose with dose_stg
@main.route("/doses/filter", methods = ["GET"])
def filter_doses():   
    if "filter_text" not in request.json:
        return generate_error_response("filter_text is not found")
    else:
         # Get filter_text for filtering
        filter_text = request.json.get('filter_text')
        
        # Build filter criteria based on query parameters
        filters = Dose.dose_stg.ilike(f'%{filter_text}%')
        # Query database with filters
        doses = Dose.query.filter(filters).all()
        if not doses:
            return generate_error_response('no doses is found'), 400
        # Serialize doses to JSON and return as response
        return Response(json.dumps([dose.to_dict() for dose in doses]), mimetype='application/json'), 200