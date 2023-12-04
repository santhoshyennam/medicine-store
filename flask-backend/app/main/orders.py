import datetime
import json
from flask import Response, jsonify, render_template, request
from . import main
from app import db
from app.models import Order,OrderItem,OrderPayment
from .utils import OrderStatus, generate_error_response
import pytz


# order routes
tz = pytz.timezone('UTC')

@main.route("/orders", methods = ["GET"])
def get_all_orders():
    orders = Order.query.all()
    all_orders = json.dumps([order.to_dict() for order in orders])
    return Response(all_orders, mimetype='application/json')


# get orders of a customer
@main.route("/orders-for-customer", methods = ["GET"])
def get_all_orders_for_customer():
    if "customer_id" in request.args:
        orders = Order.query.filter(Order.customer_id == request.args.get('customer_id')).all()
        if not orders:
            return generate_error_response("No orders are found")
        all_orders = json.dumps([order.to_dict() for order in orders])
        return Response(all_orders, mimetype='application/json')
    else:
        return generate_error_response("customer_id is not present in query parameters")


# get order by id
@main.route("/order", methods = ["GET"])
def get_order():
    if "order_id" not in request.args:
        return generate_error_response("order_id is not found in query parameters")
    else:
        order_id =  request.args.get('order_id')
        order = Order.query.get(order_id)
        if not order:
            return generate_error_response('order is not found'), 400
        return Response(json.dumps(order.to_dict()), mimetype='application/json')             

# create order
@main.route("/create-order", methods = ["POST"])
def create_order():
    print("request",request.json)
    try:
        if "customer_id" in request.json and "amount" in request.json and "delivery_address" in request.json and "payment_type" in request.json and "order_items" in request.json:
            data = request.get_json()
            new_order = None
            new_payment = None
            if data['payment_type'] == 'CASH':
                new_payment = OrderPayment(payment_method_id=1)
                db.session.add(new_payment)
                db.session.commit()
                new_order = Order(customer_id=data['customer_id'], amount=data['amount'], delivery_address=data["delivery_address"], date_created=datetime.datetime.now(tz),status=OrderStatus.PENDING, order_payment_id=new_payment.to_dict().get("id"))
                db.session.add(new_order)
                db.session.commit()
            else:
                new_payment = OrderPayment(payment_method_id=2, payment_id=data["payment_id"])
                db.session.add(new_payment)
                db.session.commit()
                new_order = Order(customer_id=data['customer_id'], amount=data['amount'], delivery_address=data["delivery_address"], date_created=datetime.datetime.now(tz),status=OrderStatus.PENDING, order_payment_id=new_payment.to_dict().get("id"))
                db.session.add(new_order)
                db.session.commit()
            
            order_items = []
            for item in data["order_items"]:
                order_item = OrderItem(order_id=new_order.to_dict().get("id"), medicine_id=item['medicine_id'],amount=item['amount'],quantity=item['quantity'])
                order_items.append(order_item)
            db.session.add(new_payment)
            db.session.add_all(order_items)
            db.session.commit()

            return Response(json.dumps(new_order.to_dict()), mimetype='application/json'), 201
        else:
            return generate_error_response("Some fields are missing in the request body")

    except Exception as e:
        error_message = str(e)
        return jsonify(error=error_message), 400

    
# delete order
@main.route("/delete-order", methods = ["DELETE"])
def delete_order():
    if "order_id" not in request.args:
        return generate_error_response("order_id is not found in query parameters")
    else:
        id =  request.args.get('order_id')
        order = Order.query.get(id)
        if not order:
            return generate_error_response('order is not found'), 400
        # Delete associated order items
        OrderItem.query.filter_by(order_id=id).delete()
        db.session.delete(order)
        db.session.commit()
        return Response(json.dumps({'success': 'order deleted successfully',"order_id":id})), 200 

# edit order
@main.route("/edit-order", methods = ["PATCH"])
def edit_order():
    if "order_id" not in request.json:
        return generate_error_response("order_id is not found in the request body")
    else:
        order_id = request.json.get("order_id")
        # Retrieve the record to be updated
        order = Order.query.get(order_id)
        if not order:
            return generate_error_response('order is not found'), 400

        # Update the record attributes
        # order.date_created = request.json.get('date_created',order.date_created)
        order.date_completed = request.json.get('date_completed',order.date_completed)
        order.status = request.json.get('status',order.status)
        order.payment_type = request.json.get('payment_type',order.payment_type)
        order.amount = request.json.get('amount',order.amount)
        order.delivery_address = request.json.get('delivery_address',order.delivery_address)
        order.customer_id =  request.json.get('customer_id',order.customer_id)
        order.last_updated_date = datetime.datetime.now(tz)
        # Commit the transaction to save changes to the database
        db.session.commit()
        return Response(json.dumps({'success': 'order updated successfully',"order_id":order_id})), 200 