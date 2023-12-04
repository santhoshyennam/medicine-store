from app import db
from .base import Base

class Dose(Base):
    __tablename__ = 'dose'
    id = db.Column(db.Integer, primary_key=True)
    dose_stg = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        parent_dict = super().to_dict()
        child_dict = {
            'id': self.id,
            'dose_stg': self.dose_stg,
        }
        return { **parent_dict, **child_dict}
    
    def get_required_data(self):
        dict = {
            'id': self.id,
            'dose_stg': self.dose_stg,
        }
        return dict

