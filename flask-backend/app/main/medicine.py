import datetime
import json
from operator import and_, or_
from flask import Response, request
from . import main
from app import db
from app.models import Medicine
from .utils import generate_error_response
from .utils import tz

# medicine routes
@main.route("/medicines", methods = ["GET"])
def get_all_medicines():
    medicines = Medicine.query.all()
    all_medicines = json.dumps([medicine.to_dict() for medicine in medicines])
    return Response(all_medicines, mimetype='application/json')

# get medicine by id
@main.route("/medicine", methods = ["GET"])
def get_medicine():
    if "medicine_id" not in request.args:
        return generate_error_response("medicine_id is not found in query parameters")
    else:
        medicine_id =  request.args.get('medicine_id')
        medicine = Medicine.query.get(medicine_id)
        if not medicine:
            return generate_error_response('medicine is not found'), 400
        return Response(json.dumps(medicine.to_dict()), mimetype='application/json')    


# get medicines with more than 40% off
@main.route("/medicines/offers", methods = ["GET"])
def get_medicine_offers():
    # medicines = Medicine.query.all()
    # Build filter criteria based on query parameters
    filters = (Medicine.discount/Medicine.price)*100 >= 40 # products with 40% and above discounts
    # Query database with filters
    medicines = Medicine.query.filter(filters).all()
    all_medicines = json.dumps([medicine.to_dict() for medicine in medicines])
    return Response(all_medicines, mimetype='application/json')
    
# get medicines with price by maximum
@main.route("/medicine-by-price", methods = ["GET"])
def get_medicine_by_price():
    if "price" not in request.args:
        return generate_error_response("price is not found in query parameters")
    else:
        price =  request.args.get('price')
        medicines = Medicine.query.filter(Medicine.price <= float(price)).all()
        if not medicines:
            return generate_error_response('no medicine is found with given price'), 400
        return Response(json.dumps([medicine.to_dict() for medicine in medicines]), mimetype='application/json') 

# get medicines with discount by minimum
@main.route("/medicine-by-discount", methods = ["GET"])
def get_medicine_by_discount():
    if "discount" not in request.args:
        return generate_error_response("discount is not found in query parameters")
    else:
        min_discount =  request.args.get('discount')
        medicines = Medicine.query.filter(Medicine.discount >= float(min_discount)).all()
        if not medicines:
            return generate_error_response('no medicine is found with given discount'), 400
        return Response(json.dumps([medicine.to_dict() for medicine in medicines]), mimetype='application/json')           

# create medicine
@main.route("/create-medicine", methods = ["POST"])
def create_medicine():
    if "name" in request.json and "price" in request.json and "description" in request.json and "discount" in request.json and "medicine_category_id" in request.json and "medicine_inventory_id" in request.json and "manufacture_id" in request.json and "dose_id" in request.json and "prescription_status" in request.json and "manufacture_id" in request.json:
        data = request.get_json()
        new_medicine = Medicine(name=data['name'], description=data['description'], discount=data["discount"], price=data["price"],medicine_category_id=data["medicine_category_id"],medicine_inventory_id=data["medicine_inventory_id"],dose_id=data["dose_id"],prescription_status=data["prescription_status"], date_created=datetime.datetime.now(tz), manufacture_id = data["manufacture_id"])
        db.session.add(new_medicine)
        db.session.commit()
        return Response(json.dumps(new_medicine.to_dict()), mimetype='application/json'),201
    else:
        return generate_error_response("some fields are missing in the request body")


# delete medicine
@main.route("/delete-medicine", methods = ["DELETE"])
def delete_medicine():
    if "medicine_id" not in request.args:
        return generate_error_response("medicine_id is not found in query parameters")
    else:
        medicine_id =  request.args.get('medicine_id')
        medicine = Medicine.query.get(medicine_id)
        if not medicine:
            return generate_error_response('medicine is not found'), 400
        db.session.delete(medicine)
        db.session.commit()
        return Response(json.dumps({'success': 'medicine deleted successfully',"medicine_id":medicine_id})), 200 

# edit medicine
@main.route("/edit-medicine", methods = ["PATCH"])
def edit_medicine():
    if "medicine_id" not in request.json:
        return generate_error_response("medicine_id is not found in the request body")
    else:
        medicine_id = request.json.get("medicine_id")
        # Retrieve the record to be updated
        medicine = Medicine.query.get(medicine_id)
        if not medicine:
            return generate_error_response('medicine is not found'), 400
        
        # Update the record attributes
        medicine.name = request.json.get('name',medicine.name)
        medicine.description = request.json.get('description',medicine.description)
        medicine.price = request.json.get('price',medicine.price)
        medicine.discount = request.json.get('discount',medicine.discount)
        medicine.medicine_category_id = request.json.get('medicine_category_id',medicine.medicine_category_id)
        medicine.medicine_inventory_id = request.json.get('medicine_inventory_id',medicine.medicine_inventory_id)
        medicine.manufacture_id = request.json.get('manufacture_id',medicine.manufacture_id)
        medicine.dose_id = request.json.get('dose_id',medicine.dose_id)
        medicine.prescription_status = request.json.get('prescription_status',medicine.prescription_status)
        medicine.last_updated_date = datetime.datetime.now(tz)
        # Commit the transaction to save changes to the database
        db.session.commit()
        return Response(json.dumps({'success': 'medicine updated successfully',"medicine_id":medicine_id})), 200 

# filter the medicines by name or description
@main.route("/medicines/filter", methods = ["GET"])
def filter_medicines():
    if "filter_text" not in request.args:
        return generate_error_response("filter_text is not found")
    else:
         # Get filter_text for filtering
        filter_text = request.args.get('filter_text')
        
        # Build filter criteria based on query parameters
        filters = or_(Medicine.name.ilike(f'%{filter_text}%'),Medicine.description.ilike(f'%{filter_text}%'))
        # Query database with filters
        medicines = Medicine.query.filter(filters).all()
        if not medicines:
            return generate_error_response('no medicines is found'), 400
        # Serialize medicines to JSON and return as response
        return Response(json.dumps([medicine.to_dict() for medicine in medicines]), mimetype='application/json'), 200
    

# filter the medicines by name or description and price    
@main.route("/medicines/filter-by-price", methods = ["GET"])
def filter_medicines_by_price():
    if "filter_text" not in request.json:
        return generate_error_response("filter_text is not found")
    if "price" not in request.json:
        return generate_error_response("price is not found")
    else:
         # Get filter_text for filtering
        filter_text = request.json.get('filter_text')
        price = request.json.get('price')
        
        # Build filter criteria based on query parameters
        filters = and_(or_(Medicine.name.ilike(f'%{filter_text}%'),Medicine.description.ilike(f'%{filter_text}%')),Medicine.price <= float(price))
        # Query database with filters
        medicines = Medicine.query.filter(filters).all()
        if not medicines:
            return generate_error_response('no medicines is found'), 400
        # Serialize medicines to JSON and return as response
        return Response(json.dumps([medicine.to_dict() for medicine in medicines]), mimetype='application/json'), 200
    
# filter the medicines by name or description and discount    
@main.route("/medicines/filter-by-discount", methods = ["GET"])
def filter_medicines_by_discount():
    if "filter_text" not in request.json:
        return generate_error_response("filter_text is not found")
    if "discount" not in request.json:
        return generate_error_response("discount is not found")
    else:
         # Get filter_text for filtering
        filter_text = request.json.get('filter_text')
        discount = request.json.get('discount')
        
        # Build filter criteria based on query parameters
        filters = and_(or_(Medicine.name.ilike(f'%{filter_text}%'),Medicine.description.ilike(f'%{filter_text}%')),Medicine.discount >= float(discount))
        # Query database with filters
        medicines = Medicine.query.filter(filters).all()
        if not medicines:
            return generate_error_response('no medicines is found'), 400
        # Serialize medicines to JSON and return as response
        return Response(json.dumps([medicine.to_dict() for medicine in medicines]), mimetype='application/json'), 200