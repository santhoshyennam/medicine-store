from app import db
from .base import Base

class ManufactureCode(Base):
    __tablename__ = 'manufacture_code'
    manufacture_1 = db.Column(db.String(100))
    manufacture_2 = db.Column(db.String(100),nullable = True)
    manufacture_3 = db.Column(db.String(100),nullable = True)
    manufacture_4 = db.Column(db.String(100),nullable = True)

    def to_dict(self):
        parent_dict = super().to_dict()
        child_dict = {
            'manufacture_1': self.manufacture_1,
            'manufacture_2': self.manufacture_2,
            'manufacture_3': self.manufacture_3,
            'manufacture_4': self.manufacture_4,
        }
        return {**parent_dict, **child_dict}

    def get_required_data(self):
        dict = {
            'manufacture_1': self.manufacture_1,
            'manufacture_2': self.manufacture_2,
            'manufacture_3': self.manufacture_3,
            'manufacture_4': self.manufacture_4,
        }
        return dict

