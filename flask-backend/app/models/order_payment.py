from app import db

class OrderPayment(db.Model):
    __tablename__ = 'order_payment'
    id = db.Column(db.Integer, primary_key=True)
    payment_method_id = db.Column(db.Integer, db.ForeignKey('payment_method.id'), nullable=False)
    payment_id = db.Column(db.String(50), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'payment_method_id': self.payment_method_id,
            'payment_id': self.payment_id,
        }

