from app import db
from .base import Base

class Manufacture(Base):
    __tablename__ = 'manufacture'
    name = db.Column(db.String(100))
    manufacture_code_id = db.Column(db.Integer, db.ForeignKey('manufacture_code.id'), nullable=False)
    manufactureCodeDetails = db.relationship("ManufactureCode", lazy=True, primaryjoin="Manufacture.manufacture_code_id == ManufactureCode.id")

    def to_dict(self):
        parent_dict = super().to_dict()
        child_dict = {
            'name': self.name,
            'manufacture_code_id': self.manufacture_code_id,
            'manufactureCodeDetails': self.manufactureCodeDetails.get_required_data()
        }
        return {**parent_dict, **child_dict}
    
    def get_required_data(self):
        dict = {
            'name': self.name,
            'manufacture_code_id': self.manufacture_code_id,
            'manufactureCodeDetails': self.manufactureCodeDetails.get_required_data()
        }
        return dict


