import datetime
from app import db
from app.models import OrderPayment
class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False,default=datetime.datetime.utcnow)
    date_completed = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(20), nullable=False)
    order_payment_id = db.Column(db.Integer, db.ForeignKey('order_payment.id'), nullable=False)
    amount = db.Column(db.String(20), nullable=False)
    delivery_address = db.Column(db.String(1000), nullable=False)
    order_items = db.relationship('OrderItem', backref='order', lazy=True)
    last_updated_date = db.Column(db.DateTime,nullable=False,default=datetime.datetime.utcnow)
    payment_details = db.relationship('OrderPayment', backref='payment_details', uselist=False)

    def __repr__(self):
        return f'<Order {self.id}, {self.date_created}>'
    

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'date_created': str(self.date_created),
            'date_completed': str(self.date_completed.isoformat()) if self.date_completed else None,
            'status': self.status,
            'order_payment_id': self.order_payment_id,
            'amount': self.amount,
            'delivery_address': self.delivery_address,
            'order_items': [item.to_dict() for item in self.order_items],
            'last_updated_date': str(self.last_updated_date),
            'payment_details': self.payment_details.to_dict()
        }
