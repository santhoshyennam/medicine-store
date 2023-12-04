from app import db
from .base import Base

class Customer(Base):
    __tablename__ = 'customers'
    first_name = db.Column(db.String(64),nullable=False)
    last_name = db.Column(db.String(64),nullable=False)
    phone_1 = db.Column(db.String(15),nullable=False)
    phone_2 = db.Column(db.String(15),nullable=True)
    email_1 = db.Column(db.String(50),nullable=False)
    email_2 = db.Column(db.String(50),nullable=True)
    city = db.Column(db.String(50),nullable=True)
    state = db.Column(db.String(50),nullable=True)
    zip_code = db.Column(db.String(10),nullable=True)
    address = db.Column(db.String(1000),nullable=True)
    password = db.Column(db.String(500),nullable=False)
    
    def to_dict(self): 
        parent_dict = super().to_dict()
        child_dict = {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone_1': self.phone_1,
            'phone_2': self.phone_2,
            'zip_code': self.zip_code,
            'city': self.city,
            'state': self.state,
            'email_1': self.email_1,
            'email_2': self.email_2,
            'address' : self.address,
        }
        return {**parent_dict, **child_dict}


