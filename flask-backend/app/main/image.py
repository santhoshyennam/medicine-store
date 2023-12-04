import datetime
import json
from flask import Response, request
from . import main
from app import db
from app.models import Image
from .utils import generate_error_response,tz

# Image routes

@main.route("/images", methods = ["GET"])
def get_all_images():
    images = Image.query.all()
    all_images = json.dumps([image.to_dict() for image in images])
    return Response(all_images, mimetype='application/json')

@main.route("/image", methods = ["GET"])
def get_image():
    if "image_id" not in request.args:
        return generate_error_response("image_id is not found in query parameters")
    else:
        image_id =  request.args.get('image_id')
        image = Image.query.get(image_id)
        if not image:
            return generate_error_response('image is not found'), 400
        return Response(json.dumps(image.to_dict()), mimetype='application/json') 

@main.route("/create-image", methods = ["POST"])
def create_image():
    if "name" in request.json and "url" in request.json and "medicine_id" in request.json:
        data = request.get_json()
        new_image = Image(name=data["name"],url=data["url"],medicine_id=data["medicine_id"], date_created=datetime.datetime.now(tz))
        db.session.add(new_image)
        db.session.commit()
        return Response(json.dumps(new_image.to_dict()), mimetype='application/json'),201
    else:
        return generate_error_response("some fields are missing in request body")


@main.route("/delete-image", methods = ["DELETE"])
def delete_image(): 
    if "image_id" not in request.args:
        return generate_error_response("image_id is not found in query parameters")
    else:
        image_id =  request.args.get('image_id')
        image = Image.query.get(image_id)
        if not image:
            return generate_error_response('image is not found'), 400
        db.session.delete(image)
        db.session.commit()
        return Response(json.dumps({'success': 'image deleted successfully',"image_id":image_id})), 200 

@main.route("/edit-image", methods = ["PATCH"])
def edit_image():
    if "image_id" not in request.json:
        return generate_error_response("image_id is not found in the request body")
    else:
        image_id = request.json.get("image_id")
        # Retrieve the record to be updated
        image = Image.query.get(image_id)
        if not image:
            return generate_error_response('image is not found'), 400
        
        # Update the record attributes
        image.name = request.json.get('name',image.name)
        image.url = request.json.get('url',image.url)
        image.medicine_id = request.json.get('medicine_id',image.medicine_id)
        image.last_updated_date = datetime.datetime.now(tz)
        # Commit the transaction to save changes to the database
        db.session.commit()
        return Response(json.dumps({'success': 'image updated successfully',"image_id":image_id})), 200 

@main.route("/images/filter", methods = ["GET"])
def filter_images():
    if "filter_text" not in request.json:
        return generate_error_response("filter_text is not found")
    else:
         # Get filter_text for filtering
        filter_text = request.json.get('filter_text')
        
        # Build filter criteria based on query parameters
        filters = Image.name.ilike(f'%{filter_text}%')
        # Query database with filters
        images = Image.query.filter(filters).all()
        if not images:
            return generate_error_response('no images is found'), 400
        # Serialize images to JSON and return as response
        return Response(json.dumps([image.to_dict() for image in images]), mimetype='application/json'), 200