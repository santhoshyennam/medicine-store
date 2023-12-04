import datetime
import json
from flask import Response, request
from . import main
from app import db
from app.models import MedicineInventory
from .utils import generate_error_response, tz

# MedicineInventory routes

@main.route("/medicine-inventory", methods = ["GET"])
def get_all_medicine_inventory():
    medicine_inventory = MedicineInventory.query.all()
    all_medicine_inventory = json.dumps([single_medicine.to_dict() for single_medicine in medicine_inventory])
    return Response(all_medicine_inventory, mimetype='application/json')

@main.route("/get-medicine-inventory", methods = ["GET"])
def get_single_medicine():
    if "medicine_inventory_id" not in request.args:
        return generate_error_response("medicine_inventory_id is not found in query parameters")
    else:
        medicine_inventory_id =  request.args.get('medicine_inventory_id')
        single_medicine = MedicineInventory.query.get(medicine_inventory_id)
        if not single_medicine:
            return generate_error_response('no medicine is found is not found'), 400
        return Response(json.dumps(single_medicine.to_dict()), mimetype='application/json') 

@main.route("/create-medicine-inventory", methods = ["POST"])
def create_single_medicine():
    if "medicine_short_name" in request.json  and "current_quantity" in request.json:
        data = request.get_json()
        new_single_medicine = MedicineInventory(medicine_short_name=data["medicine_short_name"],current_quantity=data["current_quantity"], date_created=datetime.datetime.now(tz))
        db.session.add(new_single_medicine)
        db.session.commit()
        return Response(json.dumps(new_single_medicine.to_dict()), mimetype='application/json'),201
    else:
        return generate_error_response("some fields are missing in request body")


@main.route("/delete-medicine-inventory", methods = ["DELETE"])
def delete_single_medicine():
    if "medicine_inventory_id" not in request.args:
        return generate_error_response("medicine_inventory_id is not found in query parameters")
    else:
        medicine_inventory_id =  request.args.get('medicine_inventory_id')
        medicine_inventory = MedicineInventory.query.get(medicine_inventory_id)
        if not medicine_inventory:
            return generate_error_response('medicine_inventory is not found'), 400
        db.session.delete(medicine_inventory)
        db.session.commit()
        return Response(json.dumps({'success': 'medicine_inventory deleted successfully',"medicine_inventory_id":medicine_inventory_id})), 200 

@main.route("/edit-medicine-inventory", methods = ["PATCH"])
def edit_single_medicine():
    if "medicine_inventory_id" not in request.json:
        return generate_error_response("medicine_inventory_id is not found in the request body")
    else:
        medicine_inventory_id = request.json.get("medicine_inventory_id")
        # Retrieve the record to be updated
        single_medicine = MedicineInventory.query.get(medicine_inventory_id)
        if not single_medicine:
            return generate_error_response('medicine_inventory is not found'), 400
        
        # Update the record attributes
        single_medicine.medicine_short_name = request.json.get('medicine_short_name',single_medicine.medicine_short_name)
        single_medicine.current_quantity = request.json.get('current_quantity',single_medicine.current_quantity)
        single_medicine.last_updated_date = datetime.datetime.now(tz)
        # Commit the transaction to save changes to the database
        db.session.commit()
        return Response(json.dumps({'success': 'medicine_inventory updated successfully',"medicine_inventory_id":medicine_inventory_id})), 200 

@main.route("/medicine-inventory/filter", methods = ["GET"])
def filter_medicine_inventory():
    if "filter_text" not in request.json:
        return generate_error_response("filter_text is not found")
    else:
         # Get filter_text for filtering
        filter_text = request.json.get('filter_text')
        
        # Build filter criteria based on query parameters
        filters = MedicineInventory.medicine_short_name.ilike(f'%{filter_text}%')
        # Query database with filters
        medicine_inventory = MedicineInventory.query.filter(filters).all()
        if not medicine_inventory:
            return generate_error_response('no medicine_inventory is found'), 400
        # Serialize medicine_inventory to JSON and return as response
        return Response(json.dumps([single_medicine.to_dict() for single_medicine in medicine_inventory]), mimetype='application/json'), 200