import datetime
import json
from operator import or_
from flask import Response, request
from . import main
from app import db
from app.models import MedicineCategory,Medicine
from .utils import generate_error_response,tz

# MedicineCategory routes

@main.route("/categories", methods = ["GET"])
def get_all_categories():
    categories = MedicineCategory.query.all()
    all_categories = json.dumps([category.to_dict() for category in categories])
    return Response(all_categories, mimetype='application/json')

@main.route("/category", methods = ["GET"])
def get_category():
    if "category_id" not in request.args:
        return generate_error_response("category_id is not found in query parameters")
    else:
        category_id =  request.args.get('category_id')
        category = MedicineCategory.query.get(category_id)
        if not category:
            return generate_error_response('category is not found'), 400
        return Response(json.dumps(category.to_dict()), mimetype='application/json') 
    
# get all products by category id
@main.route("/get-products-by-category", methods = ["GET"])
def get_products_by_category():
    if "category_id" not in request.args:
        return generate_error_response("category_id is not found in query parameters")
    else:
        category_id =  request.args.get('category_id')
        products = Medicine.query.filter_by(medicine_category_id=category_id).all()
        if not products:
            return generate_error_response('no product is found'), 400
        return Response(json.dumps([product.to_dict() for product in products]), mimetype='application/json'), 200     

@main.route("/create-category", methods = ["POST"])
def create_category():
    if "name" in request.json and "image_url" in request.json and "description" in request.json:
        data = request.get_json()
        new_category = MedicineCategory(name=data['name'], description=data['description'], image_url=data["image_url"], date_created=datetime.datetime.now(tz))
        db.session.add(new_category)
        db.session.commit()
        return Response(json.dumps(new_category.to_dict()), mimetype='application/json'),201
    else:
        return generate_error_response("some fields are missing in the request body")


@main.route("/delete-category", methods = ["DELETE"])
def delete_category():
    if "category_id" not in request.args:
        return generate_error_response("category_id is not found in query parameters")
    else:
        category_id =  request.args.get('category_id')
        category = MedicineCategory.query.get(category_id)
        if not category:
            return generate_error_response('category is not found'), 400
        db.session.delete(category)
        db.session.commit()
        return Response(json.dumps({'success': 'category deleted successfully',"category_id":category_id})), 200 

@main.route("/edit-category", methods = ["PATCH"])
def edit_category():
    if "category_id" not in request.json:
        return generate_error_response("category_id is not found in the request body")
    else:
        category_id = request.json.get("category_id")
        # Retrieve the record to be updated
        category = MedicineCategory.query.get(category_id)
        if not category:
            return generate_error_response('category is not found'), 400
        
        # Update the record attributes
        category.name = request.json.get('name',category.name)
        category.description = request.json.get('description',category.description)
        category.image_url = request.json.get('image_url',category.image_url)
        category.last_updated_date = datetime.datetime.now(tz)
        # Commit the transaction to save changes to the database
        db.session.commit()
        return Response(json.dumps({'success': 'category updated successfully',"category_id":category_id})), 200 

# filter by category name or description
@main.route("/categories/filter", methods = ["GET"])
def filter_categories():
    if "filter_text" not in request.json:
        return generate_error_response("filter_text is not found")
    else:
         # Get filter_text for filtering
        filter_text = request.json.get('filter_text')
        
        # Build filter criteria based on query parameters
        filters = or_(MedicineCategory.name.ilike(f'%{filter_text}%'),MedicineCategory.description.ilike(f'%{filter_text}%'))
        # Query database with filters
        categories = MedicineCategory.query.filter(filters).all()
        if not categories:
            return generate_error_response('no categories is found'), 400
        # Serialize categories to JSON and return as response
        return Response(json.dumps([category.to_dict() for category in categories]), mimetype='application/json'), 200