from app import db
from .base import Base

class PaymentMethod(Base):
    __tablename__ = 'payment_method'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        parent_dict = super().to_dict()
        child_dict = {
            'id': self.medicine_id,
            'type': self.type,
        }
        return {**parent_dict, **child_dict}


